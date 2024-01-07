// const fs = require('fs');
// const bcrypt = require('bcrypt');

// // Sample user data
// const users = [
//     {
//         username: "admin",
//         password: "admin" // Plain text password
//     }
// ];

// // function encrypt(users){
//     let existingUsers = [];
//     try {
//         existingUsers = JSON.parse(fs.readFileSync('users.json'));
//     } catch (error) {
//         console.error('Error reading existing users:', error);
//     }

//     // Hash the passwords and update the users array
//     const saltRounds = 2;
//     users.forEach((user) => {
//         users.password = bcrypt.hashSync(user.password, saltRounds);
//     });

//     // Save the updated users array to a JSON file
//     fs.writeFileSync('users.json', JSON.stringify(existingUsers, null, 2));
//     console.log('Users appended successfully.');
// // }

// // module.exports = { encrypt };

const fs = require('fs');
const bcrypt = require('bcrypt');

// Sample user data
const users = [
    {
        username: "guide",
        password: "guide" // Plain text password
    }
];
function encrypt(users){
    let existingUsers = [];

    try {
        existingUsers = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading existing users:', error);
    }

    // Hash the passwords and update the users array
    const saltRounds = 2;
    users.forEach((user) => {
        user.password = bcrypt.hashSync(user.password, saltRounds);
    });

    // Append the new users to the existingUsers array
    existingUsers.push(...users);

    // Save the updated users array to a JSON file
    fs.writeFileSync('users.json', JSON.stringify(existingUsers, null, 2));
    console.log('Users appended successfully.');

}

encrypt(users);

module.exports = { encrypt };