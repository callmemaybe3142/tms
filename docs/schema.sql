-- 1. Create User Roles Enum
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'writer');

-- 2. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'writer' NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Announcements Table
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}', -- Array of photo URLs
  view_count INTEGER DEFAULT 0,
  author_id UUID REFERENCES profiles(id) -- ဘယ်သူတင်လဲဆိုတာ သိအောင်လို့ပါ
);

-- 4. Create Articles Table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL, -- User က တောင်းဆိုထားတဲ့ field
  author_id UUID REFERENCES profiles(id), -- 
  cover_photo_url TEXT,
  view_count INTEGER DEFAULT 0
);


-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Announcements Policies
CREATE POLICY "Announcements are viewable by everyone" ON announcements FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert announcements" ON announcements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update announcements" ON announcements FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles));
CREATE POLICY "Authenticated users can delete announcements" ON announcements FOR DELETE USING (auth.uid() IN (SELECT id FROM profiles));

-- Articles Policies
CREATE POLICY "Articles are viewable by everyone" ON articles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert articles" ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update articles" ON articles FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles));
CREATE POLICY "Authenticated users can delete articles" ON articles FOR DELETE USING (auth.uid() IN (SELECT id FROM profiles));


-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', NEW.email), -- Metadata မှာ username မပါရင် email ကို ယူမယ်
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'writer'::user_role) -- Role မပါရင် writer လို့ သတ်မှတ်မယ်
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--------------------
-- FOR STORAGE
-------------------
-- Storage Bucket အသစ်ဆောက်ခြင်း
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tealand-media', 'tealand-media', true);

-- 1. လူတိုင်း ပုံတွေကို ကြည့်ရှုနိုင်ခွင့် (Public Read)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'tealand-media');

-- 2. Authenticated user များသာ ပုံတင်နိုင်ခွင့် (Upload)
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'tealand-media' AND auth.role() = 'authenticated'
);

-- 3. Authenticated user များသာ ပုံပြင်ဆင်/ဖျက်ဆီးနိုင်ခွင့် (Update/Delete)
CREATE POLICY "Authenticated users can update/delete" ON storage.objects FOR ALL USING (
  bucket_id = 'tealand-media' AND auth.role() = 'authenticated'
);