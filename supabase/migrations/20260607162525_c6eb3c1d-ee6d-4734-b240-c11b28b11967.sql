
DROP POLICY IF EXISTS "Anyone can insert progress" ON public.level_progress;
DROP POLICY IF EXISTS "Anyone can update progress" ON public.level_progress;

CREATE POLICY "Insert progress with valid stars"
  ON public.level_progress
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    player_id IS NOT NULL
    AND level_id IS NOT NULL
    AND stars >= 0 AND stars <= 3
  );

CREATE POLICY "Update progress with valid stars"
  ON public.level_progress
  FOR UPDATE
  TO anon, authenticated
  USING (player_id IS NOT NULL)
  WITH CHECK (
    player_id IS NOT NULL
    AND level_id IS NOT NULL
    AND stars >= 0 AND stars <= 3
  );
