var inquirer = require('inquirer');
var colors = require('colors')

var userHealth = 70;
var zombieHealth = 15;

function checkRound() {

    console.log('');
    console.log('')
    if (userHealth <= 0) {
        console.log('#####################'.white);
        console.log('');
        console.log('');
        console.log('YOU ARE DEAD. GAME OVER.'.red);
        console.log('');
        console.log('');
        console.log('#####################'.white);
    } else if (zombieHealth <= 0) {
        console.log('#####################'.white);
        console.log('');
        console.log('');
        console.log('ZOMBIE DEFEATED! YOU WIN!!'.rainbow);
        console.log('');
        console.log('');
        console.log('#####################'.white);

        // Exit game
        process.exit();
    };

    // Invoke next round through playRound function
    playRound();
};

function playRound() {
    console.log('WARRIOR HP: '.blue + userHealth);
    console.log('ZOMBIE HP:'.red + zombieHealth)
    inquirer.prompt([
        {
            type: 'list',
            name: 'userGuess',
            message: 'You must stay alive, Warrior! Guess a number between [1 - 5]',
            choices: ['1', '2', '3', '4', '5']
        }
    ]).then(function (guess) {
        if (userHealth > 0 || zombieHealth > 0) {
            // Assigns random number for damage
            var damage = Math.floor(Math.random() * 5) + 1;

            // Assigns random number to zombie
            var zombieNumber = Math.floor(Math.random() * 5) + 1;

            console.log('');
            console.log('');
            console.log('Zombie Rolled '.red + zombieNumber);
            console.log('');
            console.log('');

            if (zombieNumber === parseInt(guess.userGuess)) {

                // On a hit, deal damage to zombie
                zombieHealth -= damage;

                console.log('');
                console.log('');
                console.log('YOU HIT THE ZOMBIE WITH '.blue + damage + " POINTS OF DAMAGE!".blue);
                console.log('#####################'.white);
                console.log('');
                console.log('');
                console.log('Warrior HP: '.blue + userHealth);
                console.log('');
                console.log('');
                console.log('ZOMBIE HP: '.red + zombieHealth);
                console.log('');
                console.log('');
                console.log('#####################'.white);

                checkRound();

            } else if (zombieNumber != parseInt(guess.userGuess)) {

                // On a miss, deal damage to user
                userHealth -= damage;

                console.log('');
                console.log('');
                console.log('YOU MISSED! THE ZOMBIE COUNTERS WITH A BLOW DEALING '.red
                    + damage + " POINTS OF DAMAGE!".red);
                console.log('#####################'.white);
                console.log('');
                console.log('');
                console.log('Warrior HP: '.blue + userHealth);
                console.log('');
                console.log('');
                console.log('ZOMBIE HP: '.red + zombieHealth);
                console.log('');
                console.log('');
                console.log('#####################'.white);

                checkRound();
            }
        }
    });
}

// Start game
playRound();