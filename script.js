// Placeholder function for starting a new game
function startNewGame() {
    // Reset the game state variable
    gameOver = false;

    // Hide title screen
    document.querySelector('.title-screen').style.display = 'none';

    // Show game screen
    document.querySelector('.game-screen').style.display = 'block';

    // Initialize player
    initializePlayer();

    // Show Stats button
    document.querySelector('.stats-btn').style.display = 'block';

    // Show and randomly position slimes only if the game is not over
    if (!gameOver) {
        document.querySelectorAll('.slime').forEach(slime => {
            showAndPositionSlime(slime);
        });
    }

    // Start checking for collisions
    setInterval(checkCollisions, 100);
}

// Function for initializing player
function initializePlayer() {
    const player = document.querySelector('.player');

    // Initial player position (center of the screen)
    let playerX = window.innerWidth / 2 - player.offsetWidth / 2;
    let playerY = window.innerHeight / 2 - player.offsetHeight / 2;

    // Set initial player position
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';

    // Set initial player stats
    setPlayerStats(100, 10);
}

// Variable to track the game state (whether it's over or not)
let gameOver = false;

// Handle player movement using arrow keys
document.addEventListener('keydown', function (event) {
    movePlayer(event.key);
});

function movePlayer(key) {
    const player = document.querySelector('.player');
    const speed = 10; // Adjust the speed as needed

    switch (key) {
        case 'ArrowUp':
            player.style.top = Math.max(0, player.offsetTop - speed) + 'px';
            break;
        case 'ArrowDown':
            player.style.top = Math.min(window.innerHeight - player.offsetHeight, player.offsetTop + speed) + 'px';
            break;
        case 'ArrowLeft':
            player.style.left = Math.max(0, player.offsetLeft - speed) + 'px';
            break;
        case 'ArrowRight':
            player.style.left = Math.min(window.innerWidth - player.offsetWidth, player.offsetLeft + speed) + 'px';
            break;
    }
}

// Placeholder function for setting player stats
function setPlayerStats(health, attack) {
    // Update health and attack in the HTML
    document.getElementById('health').innerText = health;
    document.getElementById('attack').innerText = attack;
}

// Placeholder function for opening the Stats screen
function openStats() {
    document.querySelector('.stats-screen').style.display = 'block';
}

// Placeholder function for closing the Stats screen
function closeStats() {
    document.querySelector('.stats-screen').style.display = 'none';
}

// Check if two elements are colliding
function isColliding(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Check for collisions with slimes
function checkCollisions() {
    const player = document.querySelector('.player');
    const slimes = document.querySelectorAll('.slime');

    slimes.forEach(slime => {
        if (isColliding(player, slime)) {
            console.log("Collision detected! Starting combat...");
            startCombat(slime);
        }
    });
}

// Simulate combat between player and slime
function simulateCombat(playerHealth, playerAttack, slimeHealth, slimeAttack) {
    console.log("Combat simulation initiated...");

    while (playerHealth > 0 && slimeHealth > 0) {
        console.log("Player health: " + playerHealth + " | Slime health: " + slimeHealth);

        // Player attacks slime
        slimeHealth -= playerAttack;
        console.log("Player attacks slime! Slime health: " + slimeHealth);

        // Check if the slime is defeated
        if (slimeHealth <= 0) {
            console.log("Slime defeated!");
            return true; // Player wins
        }

        // Slime attacks player
        playerHealth -= slimeAttack;
        console.log("Slime attacks player! Player health: " + playerHealth);

        // Check if the player is defeated
        if (playerHealth <= 0) {
            console.log("Player defeated!");
            return false; // Player loses
        }
    }

    console.log("End of combat simulation...");

    return false;
}


// Start combat with a slime
function startCombat(slime) {
    // Set the game state to over to prevent infinite messages
    gameOver = true;

    const playerHealth = parseInt(document.getElementById('health').innerText);
    const playerAttack = parseInt(document.getElementById('attack').innerText);
    
    const slimeHealth = parseInt(slime.getAttribute('data-health'));
    const slimeAttack = parseInt(slime.getAttribute('data-attack'));

    // Simulate automatic combat
    const playerWins = simulateCombat(playerHealth, playerAttack, slimeHealth, slimeAttack);

    // Display combat result
    if (playerWins) {
        alert("You won the battle!");
        // Update player stats after winning
        updatePlayerStats(slimeHealth, slimeAttack);
    } else {
        alert("Game Over! You lost the battle.");
        // Return to the title screen
        returnToTitleScreen();
    }

    // Reset the game state
    gameOver = false;

    // Remove the defeated slime from the game screen
    slime.style.display = 'none';
}

// Update player stats after winning a battle
function updatePlayerStats(enemyHealth, enemyAttack) {
    const currentHealth = parseInt(document.getElementById('health').innerText);
    const currentAttack = parseInt(document.getElementById('attack').innerText);

    // Add 25% of enemy's health and attack to player's total
    const healthGain = Math.round(0.25 * enemyHealth);
    const attackGain = Math.round(0.25 * enemyAttack);

    const newHealth = currentHealth + healthGain;
    const newAttack = currentAttack + attackGain;

    // Update player stats in the HTML
    document.getElementById('health').innerText = newHealth;
    document.getElementById('attack').innerText = newAttack;
}

/// Return to the title screen after losing a battle
function returnToTitleScreen() {
    // Show title screen
    document.querySelector('.title-screen').style.display = 'block';

    // Hide game screen and stats screen
    document.querySelector('.game-screen').style.display = 'none';
    document.querySelector('.stats-screen').style.display = 'none';

    // Reset player stats to default values
    document.getElementById('health').innerText = '100';
    document.getElementById('attack').innerText = '10';

    // Reset the game state
    gameOver = false;

    // Show title screen buttons
    document.querySelector('.new-game-btn').style.display = 'block';
    document.querySelector('.stats-btn').style.display = 'none';
}

// Function to show and randomly position "NPC" slimes
function showAndPositionSlime(slime) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const slimeWidth = slime.offsetWidth;
    const slimeHeight = slime.offsetHeight;

    // Set random position within the visible area of the game screen
    const posX = Math.max(0, Math.min(screenWidth - slimeWidth, Math.floor(Math.random() * (screenWidth - slimeWidth))));
    const posY = Math.max(0, Math.min(screenHeight - slimeHeight, Math.floor(Math.random() * (screenHeight - slimeHeight))));

    // Update the slime's position
    slime.style.left = posX + 'px';
    slime.style.top = posY + 'px';

    // Show the slime
    slime.style.display = 'block';
}