# The Absolute Beginner's Guide to Publishing Your Website

This guide assumes you have never deployed a website before. We will use **GitHub** (to store your code) and **Vercel** (to put it on the internet). Both are free.

---

## Phase 1: Put Your Code on GitHub
Think of GitHub as a cloud storage for your code (like Google Drive, but for programmers).

1.  **Create an Account**: Go to [github.com](https://github.com) and sign up.
2.  **Create a Repository**:
    *   Click the **+** icon in the top-right corner -> **New repository**.
    *   Repository name: `mediq-mcq` (or whatever you like).
    *   Make it **Public**.
    *   Click **Create repository**.
3.  **Upload Your Code**:
    *   Open your VS Code terminal (where you run the app).
    *   Copy and paste these commands one by one (press Enter after each):
    ```bash
    git init
    git add .
    git commit -m "My first deploy"
    git branch -M main
    ```
    *   *Now, look at the GitHub page you just created. It will show a command starting with `git remote add origin...`. Copy that entire line.*
    *   Paste it into your terminal and press Enter.
    *   Finally, run:
    ```bash
    git push -u origin main
    ```
    *   *If it asks for a password, you might need to sign in to GitHub in the browser window that pops up.*

---

## Phase 2: Put Your Website on Vercel
Vercel takes your code from GitHub and turns it into a real website.

1.  **Create an Account**: Go to [vercel.com](https://vercel.com) and sign up using **"Continue with GitHub"**.
2.  **Import Project**:
    *   You should see an "Import Project" screen.
    *   Find your `mediq-mcq` repo and click **Import**.
3.  **Configure**:
    *   **Framework Preset**: It should say "Next.js". Leave it.
    *   **Environment Variables**: Click the little arrow to expand this section.
    *   Add this one (if you have a Gemini Key):
        *   Name: `GEMINI_API_KEY`
        *   Value: `(Paste your actual API key here)`
    *   **Click DEPLOY**.
4.  **Wait**: It will take a minute. It might say "Build Failed" or "Deployment Error" because we haven't set up the database yet. **This is normal!**

---

## Phase 3: The Database (Crucial Step)
Your app needs a place to store users and scores.

1.  **Go to Storage**:
    *   In your Vercel project dashboard, click the **Storage** tab at the top.
2.  **Create Database**:
    *   Click **Create Database**.
    *   Select **Postgres**.
    *   Click **Continue** -> **Accept** terms -> **Create**.
    *   Give it a name (e.g., `mediq-db`) and pick a region (e.g., Washington or somewhere close to you).
    *   Click **Create**.
3.  **Connect**:
    *   Once created, it might ask to "Connect to Project". Make sure your `mediq-mcq` project is selected and click **Connect**.
    *   *This automatically adds the secret database passwords to your project.*
4.  **Create Tables (The Magic Spell)**:
    *   On the Database page, click the **Query** tab (sometimes called "Data" -> "Query Console").
    *   You will see a box to type SQL code.
    *   **Copy the HUGE block of code below** and paste it into that box:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  security_question TEXT,
  security_answer TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email TEXT,
  level INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS streaks (
  user_id INTEGER PRIMARY KEY REFERENCES users(id),
  current_streak INTEGER DEFAULT 0,
  last_activity_date TEXT,
  longest_streak INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  friend_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS activity_log (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  activity_type TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  details TEXT,
  score INTEGER
);

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  topic TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  host_id INTEGER NOT NULL REFERENCES users(id),
  invite_code TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS group_members (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL REFERENCES groups(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  condition_type TEXT NOT NULL,
  condition_value INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  achievement_id TEXT NOT NULL REFERENCES achievements(id),
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO achievements (id, title, description, icon, condition_type, condition_value) VALUES
('first_quiz', 'First Steps', 'Completed your first quiz', '🏁', 'quizzes_taken', 1),
('streak_3', 'Heating Up', 'Reached a 3-day streak', '🔥', 'streak', 3),
('streak_7', 'Streak Master', 'Reached a 7-day streak', '🏆', 'streak', 7),
('quiz_master_10', 'Quiz Master', 'Completed 10 quizzes', '📚', 'quizzes_taken', 10),
('perfect_score', 'Perfectionist', 'Scored 100% on a quiz', '🎯', 'perfect_score', 1),
('level_5', 'Rising Star', 'Reached Level 5', '⭐', 'level', 5)
ON CONFLICT (id) DO NOTHING;
```

    *   Click **Run Query**. It should say "Success".

---

## Phase 4: Final Launch
1.  Go back to the **Deployments** tab in Vercel.
2.  Find your failed deployment (or the latest one).
3.  Click the **three dots** -> **Redeploy**.
4.  This time, it should work!
5.  When it turns green, click the **Visit** button.

**Congratulations! You are live!** 🚀
