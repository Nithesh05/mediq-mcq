const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

try {
    const achievements = db.pragma('table_info(achievements)');
    const userAchievements = db.pragma('table_info(user_achievements)');
    const activityLog = db.pragma('table_info(activity_log)');

    console.log('Achievements Table:', achievements.length > 0 ? 'Exists' : 'Missing');
    console.log('User Achievements Table:', userAchievements.length > 0 ? 'Exists' : 'Missing');

    const detailsCol = activityLog.find(c => c.name === 'details');
    const scoreCol = activityLog.find(c => c.name === 'score');

    console.log('Activity Log Details Column:', detailsCol ? 'Exists' : 'Missing');
    console.log('Activity Log Score Column:', scoreCol ? 'Exists' : 'Missing');

    const achievementCount = db.prepare('SELECT COUNT(*) as count FROM achievements').get();
    console.log('Achievements Count:', achievementCount.count);

} catch (error) {
    console.error('Error checking schema:', error);
}
