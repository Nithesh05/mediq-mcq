const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(process.cwd(), 'mediq.db');
const db = new Database(dbPath);

const ACHIEVEMENTS = [
    {
        id: 'first_quiz',
        title: 'First Steps',
        description: 'Completed your first quiz',
        icon: '🏁',
        condition_type: 'quizzes_taken',
        condition_value: 1
    },
    {
        id: 'streak_3',
        title: 'Heating Up',
        description: 'Reached a 3-day streak',
        icon: '🔥',
        condition_type: 'streak',
        condition_value: 3
    },
    {
        id: 'streak_7',
        title: 'Streak Master',
        description: 'Reached a 7-day streak',
        icon: '🏆',
        condition_type: 'streak',
        condition_value: 7
    },
    {
        id: 'quiz_master_10',
        title: 'Quiz Master',
        description: 'Completed 10 quizzes',
        icon: '📚',
        condition_type: 'quizzes_taken',
        condition_value: 10
    },
    {
        id: 'perfect_score',
        title: 'Perfectionist',
        description: 'Scored 100% on a quiz',
        icon: '🎯',
        condition_type: 'perfect_score',
        condition_value: 1
    },
    {
        id: 'level_5',
        title: 'Rising Star',
        description: 'Reached Level 5',
        icon: '⭐',
        condition_type: 'level',
        condition_value: 5
    }
];

const insert = db.prepare(`
    INSERT OR IGNORE INTO achievements (id, title, description, icon, condition_type, condition_value)
    VALUES (?, ?, ?, ?, ?, ?)
`);

ACHIEVEMENTS.forEach(ach => {
    insert.run(ach.id, ach.title, ach.description, ach.icon, ach.condition_type, ach.condition_value);
});

console.log('Achievements initialized');
