const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const statues = [];
const playerPosition = { x: gameArea.offsetWidth / 2, y: gameArea.offsetHeight / 2 };
let playerAngle = 0;
const statueCount = 5;
const statueSpeed = 1; // Pixels per game tick
const flashlightWidth = Math.PI / 4; // 45 degrees

// Initialize or reset the game state
function initGame() {
    // Clear existing statues if any
    statues.forEach(statue => statue.remove());
    statues.length = 0;

    // Create and place statues
    for (let i = 0; i < statueCount; i++) {
        const angle = Math.random() * 2 * Math.PI; // Random angle
        const distance = Math.max(gameArea.offsetWidth, gameArea.offsetHeight);
        const x = playerPosition.x + distance * Math.cos(angle) - 10; // Adjust for statue size
        const y = playerPosition.y + distance * Math.sin(angle) - 10; // Adjust for statue size
        const statue = document.createElement('div');
        statue.className = 'statue';
        statue.style.left = `${x}px`;
        statue.style.top = `${y}px`;
        gameArea.appendChild(statue);
        statues.push(statue);
    }
}

// Main game loop
function gameTick() {
    statues.forEach(statue => {
        const rect = statue.getBoundingClientRect();
        const statueX = rect.left + rect.width / 2 - playerPosition.x;
        const statueY = rect.top + rect.height / 2 - playerPosition.y;
        const angleToStatue = Math.atan2(statueY, statueX);
        const distanceToStatue = Math.sqrt(statueX ** 2 + statueY ** 2);
        
        // Move statue closer if it's outside the flashlight beam
        if (Math.abs(angleToStatue - playerAngle) > flashlightWidth / 2 || distanceToStatue > 200) { 
            const newX = parseFloat(statue.style.left) - statueSpeed * Math.cos(angleToStatue);
            const newY = parseFloat(statue.style.top) - statueSpeed * Math.sin(angleToStatue);
            statue.style.left = `${newX}px`;
            statue.style.top = `${newY}px`;
        }

        // End game if a statue touches the player
        if (distanceToStatue < 20) { 
            gameOver();
        }
    });

    requestAnimationFrame(gameTick);
}

// Handle game over scenario
function gameOver() {
    alert('Game Over! The statues have caught you.');
    initGame(); // Reset the game for another round
}

// Rotate the player character based on mouse movement
document.addEventListener('mousemove', (e) => {
    const rect = gameArea.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - playerPosition.x;
    const mouseY = e.clientY - rect.top - playerPosition.y;
    playerAngle = Math.atan2(mouseY, mouseX);
    player.style.transform = `translate(-50%, -50%) rotate(${playerAngle}rad)`;
});

// Start the game once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    gameTick();
});
