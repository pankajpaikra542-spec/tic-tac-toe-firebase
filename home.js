import { auth, db, ref, set, onValue, onAuthStateChanged } from './firebase-config.js';

// Generate a random 6-character room code
function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Create a new room
async function createRoom(user) {
    const roomCode = generateRoomCode();
    const roomRef = ref(db, `rooms/${roomCode}`);
    
    const roomData = {
        host: user.uid,
        guest: null,
        board: ["", "", "", "", "", "", "", "", ""],
        turn: "X",
        status: "waiting",
        winner: null,
        createdAt: Date.now(),
        lastMoveAt: null,
        hostMark: "X",
        guestMark: "O"
    };
    
    try {
        await set(roomRef, roomData);
        
        // Set up presence for the host
        const presenceRef = ref(db, `presence/${user.uid}`);
        await set(presenceRef, {
            room: roomCode,
            connected: true,
            lastSeen: Date.now()
        });
        
        // Set up onDisconnect for presence
        const hostPresenceRef = ref(db, `rooms/${roomCode}/players/${user.uid}/connected`);
        await set(hostPresenceRef, true);
        onDisconnect(hostPresenceRef).set(false);
        
        // Redirect to game page
        window.location.href = `game.html?room=${roomCode}`;
    } catch (error) {
        showMessage("Failed to create room: " + error.message, "error");
    }
}

// Join an existing room
async function joinRoom(user, roomCode) {
    const roomRef = ref(db, `rooms/${roomCode}`);
    
    try {
        onValue(roomRef, (snapshot) => {
            const room = snapshot.val();
            
            if (!room) {
                showMessage("Room not found", "error");
                return;
            }
            
            if (room.status === "waiting" && room.guest === null) {
                // Join the room as guest
                set(ref(db, `rooms/${roomCode}/guest`), user.uid)
                    .then(() => {
                        set(ref(db, `rooms/${roomCode}/status`), "playing")
                            .then(() => {
                                // Set up presence for the guest
                                const presenceRef = ref(db, `presence/${user.uid}`);
                                set(presenceRef, {
                                    room: roomCode,
                                    connected: true,
                                    lastSeen: Date.now()
                                });
                                
                                // Set up onDisconnect for guest presence
                                const guestPresenceRef = ref(db, `rooms/${roomCode}/players/${user.uid}/connected`);
                                set(guestPresenceRef, true);
                                onDisconnect(guestPresenceRef).set(false);
                                
                                // Redirect to game page
                                window.location.href = `game.html?room=${roomCode}`;
                            });
                    })
                    .catch((error) => {
                        showMessage("Failed to join room: " + error.message, "error");
                    });
            } else if (room.guest !== null) {
                showMessage("Room is full", "error");
            } else {
                showMessage("Cannot join room", "error");
            }
        }, { onlyOnce: true });
    } catch (error) {
        showMessage("Failed to join room: " + error.message, "error");
    }
}

// Show message to user
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'message';
    }, 3000);
}

// Initialize the home page
function initHome() {
    const createRoomBtn = document.getElementById('createRoomBtn');
    const joinRoomBtn = document.getElementById('joinRoomBtn');
    const roomCodeInput = document.getElementById('roomCodeInput');
    
    // Wait for authentication
    onAuthStateChanged(auth, (user) => {
        if (user) {
            createRoomBtn.addEventListener('click', () => createRoom(user));
            joinRoomBtn.addEventListener('click', () => {
                const roomCode = roomCodeInput.value.trim().toUpperCase();
                if (roomCode.length === 6) {
                    joinRoom(user, roomCode);
                } else {
                    showMessage("Please enter a valid room code", "error");
                }
            });
            
            roomCodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    joinRoomBtn.click();
                }
            });
        } else {
            showMessage("Authentication failed. Please refresh the page.", "error");
        }
    });
}

// Start initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initHome);