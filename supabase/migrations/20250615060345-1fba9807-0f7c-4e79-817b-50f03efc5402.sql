-- Add content_type column to blog_posts table to distinguish between blog posts and industry news
ALTER TABLE public.blog_posts 
ADD COLUMN content_type text NOT NULL DEFAULT 'blog_post' CHECK (content_type IN ('blog_post', 'industry_news'));

-- Create index for better performance when filtering by content type
CREATE INDEX idx_blog_posts_content_type ON public.blog_posts(content_type);

-- Create index for better performance when filtering by published status and content type
CREATE INDEX idx_blog_posts_published_content_type ON public.blog_posts(published, content_type, created_at DESC);