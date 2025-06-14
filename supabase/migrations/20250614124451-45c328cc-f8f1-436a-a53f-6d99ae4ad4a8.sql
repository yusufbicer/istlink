-- Add translation support to blog posts
ALTER TABLE public.blog_posts 
ADD COLUMN title_en TEXT,
ADD COLUMN title_tr TEXT,
ADD COLUMN title_fr TEXT,
ADD COLUMN excerpt_en TEXT,
ADD COLUMN excerpt_tr TEXT,
ADD COLUMN excerpt_fr TEXT,
ADD COLUMN content_en TEXT,
ADD COLUMN content_tr TEXT,
ADD COLUMN content_fr TEXT;