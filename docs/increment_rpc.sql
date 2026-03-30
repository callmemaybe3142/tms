-- Run this in your Supabase SQL Editor to allow public view increments without compromising security policies!

CREATE OR REPLACE FUNCTION public.increment_announcement_view(announcement_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.announcements
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = announcement_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
