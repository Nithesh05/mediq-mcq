import { db } from './db';

export const ACHIEVEMENTS = [
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

export async function initializeAchievements() {
    // This might be called on startup, so we use a loop with await
    // Or Promise.all for speed, but sequential is safer for DB locks
    for (const ach of ACHIEVEMENTS) {
        await db.run(`
            INSERT OR IGNORE INTO achievements (id, title, description, icon, condition_type, condition_value)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [ach.id, ach.title, ach.description, ach.icon, ach.condition_type, ach.condition_value]);
    }
}

export async function checkAchievements(userId: number, type: string, value: number) {
    const unlocked: any[] = [];

    // Get potential achievements for this type
    const potential: any[] = await db.query('SELECT * FROM achievements WHERE condition_type = ? AND condition_value <= ?', [type, value]);

    for (const ach of potential) {
        // Check if already unlocked
        const existing = await db.get('SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?', [userId, ach.id]);

        if (!existing) {
            // Unlock it
            await db.run('INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)', [userId, ach.id]);
            unlocked.push(ach);
        }
    }

    return unlocked;
}
