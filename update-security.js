const { db } = require('./src/lib/db');

const username = 'Nithesh';
const question = 'Who is your best friend?'; // "What is the name of your first pet?"
const answer = 'Kishore'; // Default answer

try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
        console.log(`User '${username}' not found.`);
    } else {
        console.log(`Updating security question for user '${username}'...`);
        db.prepare('UPDATE users SET security_question = ?, security_answer = ? WHERE id = ?')
            .run(question, answer, user.id);
        console.log('Update successful!');
        console.log(`Security Question: ${question}`);
        console.log(`Security Answer: ${answer}`);
    }
} catch (error) {
    console.error('Error updating user:', error);
}
