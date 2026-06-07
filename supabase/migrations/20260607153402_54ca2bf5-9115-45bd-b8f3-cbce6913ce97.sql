
-- LEVELS catalog
CREATE TABLE public.levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  realm_id TEXT NOT NULL,
  number INT NOT NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  blurb TEXT NOT NULL DEFAULT '',
  icon TEXT,
  kind TEXT NOT NULL CHECK (kind IN ('lesson','puzzle','boss','minigame')),
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_boss BOOLEAN NOT NULL DEFAULT false,
  xp_reward INT NOT NULL DEFAULT 20,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (realm_id, number),
  UNIQUE (realm_id, slug)
);

GRANT SELECT ON public.levels TO anon, authenticated;
GRANT ALL ON public.levels TO service_role;

ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Levels are publicly readable"
  ON public.levels FOR SELECT
  USING (true);

-- LEVEL PROGRESS (per browser-side player_id)
CREATE TABLE public.level_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL,
  level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  stars SMALLINT NOT NULL DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (player_id, level_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.level_progress TO anon, authenticated;
GRANT ALL ON public.level_progress TO service_role;

ALTER TABLE public.level_progress ENABLE ROW LEVEL SECURITY;

-- Anyone can read/write progress (player_id is the unguessable handle).
-- Kid-app placeholder until proper auth is added.
CREATE POLICY "Anyone can read progress"
  ON public.level_progress FOR SELECT USING (true);

CREATE POLICY "Anyone can insert progress"
  ON public.level_progress FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update progress"
  ON public.level_progress FOR UPDATE USING (true) WITH CHECK (true);

CREATE INDEX idx_level_progress_player ON public.level_progress(player_id);
CREATE INDEX idx_levels_realm ON public.levels(realm_id, number);

-- Seed 12 Pawn Village levels
INSERT INTO public.levels (realm_id, number, slug, name, blurb, icon, kind, content, is_boss, xp_reward) VALUES
  ('pawn-village', 1,  'welcome',          'Welcome to the Village', 'Meet Mariposa',       '🦋', 'lesson', '{"text":"Welcome, brave hero! I''m Mariposa. Together we''ll free the Pawn Village. Tap Got It to begin!","board":"start"}'::jsonb, false, 20),
  ('pawn-village', 2,  'meet-the-king',    'Meet the King',          'One-square moves',    '♔', 'lesson', '{"text":"This is the King. He moves just one square in any direction. Mighty but slow!","board":"8/8/8/3K4/8/8/8/8 w - - 0 1"}'::jsonb, false, 20),
  ('pawn-village', 3,  'knights-hop',      'The Knight''s Hop',       'L-shaped leaps',      '♞', 'lesson', '{"text":"Knights jump in an L: two squares one way, one square sideways. They can even hop over friends!","board":"8/8/8/3N4/8/8/8/8 w - - 0 1"}'::jsonb, false, 20),
  ('pawn-village', 4,  'pawn-push',        'Pawn Push',              'Forward one square',  '♙', 'puzzle', '{"text":"Push the pawn one square forward.","fen":"8/8/8/8/8/8/4P3/8 w - - 0 1","solution":["e2e3","e2e4"]}'::jsonb, false, 20),
  ('pawn-village', 5,  'two-square-start', 'Two-Square Start',       'First-move boost',    '⏩', 'puzzle', '{"text":"On a pawn''s first move, it may leap two squares. Make it!","fen":"8/8/8/8/8/8/3P4/8 w - - 0 1","solution":["d2d4"]}'::jsonb, false, 20),
  ('pawn-village', 6,  'diagonal-snack',   'Diagonal Snack',         'Pawn captures',       '🍎', 'puzzle', '{"text":"Pawns capture diagonally forward. Take the snack!","fen":"8/8/8/3p1p2/4P3/8/8/8 w - - 0 1","solution":["e4d5","e4f5"]}'::jsonb, false, 20),
  ('pawn-village', 7,  'farmer-piggies',   'Farmer & Piggies',       'Race to rank 8',      '🐷', 'minigame', '{"text":"Race a pawn to the 8th rank!","fen":"4k3/8/8/8/8/8/PPPPPPPP/8 w - - 0 1"}'::jsonb, false, 25),
  ('pawn-village', 8,  'meet-the-rook',    'Meet the Rook',          'Straight lines',      '♜', 'lesson', '{"text":"Rooks rumble in straight lines — across or up and down, as far as they like!","board":"8/8/8/3R4/8/8/8/8 w - - 0 1"}'::jsonb, false, 20),
  ('pawn-village', 9,  'bishops-diagonals','Bishop''s Diagonals',     'Color-locked paths',  '♝', 'lesson', '{"text":"Bishops glide along diagonals. Each Bishop sticks to its own color square forever!","board":"8/8/8/3B4/8/8/8/8 w - - 0 1"}'::jsonb, false, 20),
  ('pawn-village', 10, 'hail-the-queen',   'Hail the Queen',         'All directions',      '♛', 'lesson', '{"text":"The Queen is mighty — she moves like a Rook AND a Bishop combined!","board":"8/8/8/3Q4/8/8/8/8 w - - 0 1"}'::jsonb, false, 20),
  ('pawn-village', 11, 'pawn-wars',        'Pawn Wars',              '8v8 mini-battle',     '⚔️', 'minigame', '{"text":"Eight pawns versus eight pawns. First to make a Queen wins!","fen":"8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 0 1"}'::jsonb, false, 30),
  ('pawn-village', 12, 'board-guardian',   'The Board Guardian',     'Boss of the Village', '🗿', 'boss', '{"text":"The stone Guardian awakens. Answer six questions to win the Pearl Shard!"}'::jsonb, true, 50);
