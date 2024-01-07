// export function decrypt(username, password){

const fs = require('fs');
const bcrypt = require('bcrypt');
const roleU = null;

// Load user data from the JSON file
function decrypt(username, password){
    const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

    // Verify a user's login
    // const username = "user1"; // User-provided username
    // const password = "password1"; // User-provided password

    const user = users.find((u) => u.username === username);
    const roleU = null;
    if (user) {
        console.log("role ", user.role);
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                // Passwords match, authenticate the user
                console.log("matchs");
                roleU = user.role;
                

            } else {
                // Passwords don't match, deny access
                console.log("doesn't match")
            }
        });
    } else {
        // User not found
        console.log("User not found")
    }
    return(roleU)
}

module.exports = {decrypt, roleU};
