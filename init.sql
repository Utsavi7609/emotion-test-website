DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  assigned_emotion VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
-- Stores predefined clip orders for each emotion
CREATE TABLE IF NOT EXISTS playlist_templates (
    id SERIAL PRIMARY KEY,
    assigned_emotion VARCHAR(50) NOT NULL,
    clip_order JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS clip_responses;

CREATE TABLE clip_responses (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    clip_title TEXT NOT NULL REFERENCES movie_clips(title) ON DELETE CASCADE,
    induced_valence FLOAT,
    induced_arousal FLOAT,
    is_baseline BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fatigue_logs (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  fatigue1 FLOAT,  -- baseline
  fatigue2 FLOAT,  -- mid-session
  fatigue3 FLOAT,  -- post-session
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Movie clips
CREATE TABLE IF NOT EXISTS movie_clips (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  file_url TEXT NOT NULL,
  duration_seconds INT NOT NULL
);
ALTER TABLE movie_clips
ADD COLUMN prev_id INT;


ALTER TABLE movie_clips
DROP COLUMN title;

INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('AboutTime - AboutTime_131.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/AboutTime/AboutTime_131.mp4', 10, 33);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheTheoryOfEverything - TheTheoryOfEverything_014.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheTheoryOfEverything/TheTheoryOfEverything_014.mp4', 42, 39);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheFaultInOurStars - TheFaultInOurStars_022.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheFaultInOurStars/TheFaultInOurStars_022.mp4', 22, 53);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheFaultInOurStars - TheFaultInOurStars_023.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheFaultInOurStars/TheFaultInOurStars_023.mp4', 18, 54);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheFaultInOurStars - TheFaultInOurStars_036.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheFaultInOurStars/TheFaultInOurStars_036.mp4', 7, 56);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheFaultInOurStars - TheFaultInOurStars_041.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheFaultInOurStars/TheFaultInOurStars_041.mp4', 27, 58);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheSpectacularNow - TheSpectacularNow_050.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheSpectacularNow/TheSpectacularNow_050.mp4', 87, 72);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('LadyBird - LadyBird_005.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/LadyBird/LadyBird_005.mp4', 16, 81);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('LadyBird - LadyBird_091.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/LadyBird/LadyBird_091.mp4', 43, 100);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Wonder - Wonder_006.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Wonder/Wonder_006.mp4', 12, 109);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Wonder - Wonder_050.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Wonder/Wonder_050.mp4', 26, 115);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Wonder - Wonder_051.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Wonder/Wonder_051.mp4', 20, 116);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Wonder - Wonder_091.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Wonder/Wonder_091.mp4', 11, 122);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Wonder - Wonder_120.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Wonder/Wonder_120.mp4', 19, 129);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Wonder - Wonder_134.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Wonder/Wonder_134.mp4', 28, 134);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheBlindSide - TheBlindSide_020.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheBlindSide/TheBlindSide_020.mp4', 37, 142);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Gifted - Gifted_025.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Gifted/Gifted_025.mp4', 41, 160);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Gifted - Gifted_027.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Gifted/Gifted_027.mp4', 26, 162);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Gifted - Gifted_058.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Gifted/Gifted_058.mp4', 19, 168);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('Gifted - Gifted_066.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/Gifted/Gifted_066.mp4', 21, 170);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheJudge - TheJudge_093.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheJudge/TheJudge_093.mp4', 29, 194);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheJudge - TheJudge_106.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheJudge/TheJudge_106.mp4', 11, 198);
INSERT INTO movie_clips (title, file_url, duration_seconds, prev_id) VALUES ('TheJudge - TheJudge_110.mp4', 'https://oleedalmhadjyeabjpbm.supabase.co/storage/v1/object/public/movie-clips/TheJudge/TheJudge_110.mp4', 38, 202);

INSERT INTO playlist_templates (assigned_emotion, clip_order) VALUES
('Happy',    '[129,170,109,58,116,72,56,134,122,160,53,54,198,194,162,202,81,33,168,100,39,115,142]'),
('Sad',      '[115,142,39,160,53,54,56,122,134,170,58,129,33,100,168,198,194,162,202,81,109,72,116]'),
('Angry',    '[115,142,39,160,54,53,56,122,134,58,109,170,81,162,202,198,100,194,33,129,168,116,72]'),
('Fearful',  '[142,115,109,54,53,160,56,122,134,129,170,58,198,202,194,81,162,100,33,168,39,72,116]'),
('Calm',     '[109,58,129,72,116,170,54,56,122,134,160,53,198,202,81,162,194,33,168,100,39,115,142]'),
('Excited',  '[170,129,109,58,116,72,56,134,122,53,160,54,162,198,194,81,202,33,100,168,115,142,39]'),
('Neutral',  '[58,109,72,116,129,170,53,54,56,122,134,160,100,198,194,81,162,202,33,168,39,115,142]');
