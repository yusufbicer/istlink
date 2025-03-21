
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PenIcon, TrashIcon, PlusIcon, EyeIcon, Loader2, ImageIcon } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  featured_image: string | null;
  slug: string;
  published: boolean;
  created_at: string;
  author_id: string;
  category?: string;
  excerpt?: string;
};

const categories = ['Shipping', 'Consolidation', 'Success Story', 'Industry News', 'Tips', 'Updates'];

const BlogPostManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: '',
    category: '',
    slug: '',
    published: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      featured_image: '',
      author: '',
      category: 'Shipping',
      slug: '',
      published: false
    });
    setCurrentPost(null);
    setIsEditing(false);
  };

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setBlogPosts(data || []);
      } catch (error: any) {
        console.error('Error fetching blog posts:', error.message);
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handlePublishedChange = (value: string) => {
    setFormData(prev => ({ ...prev, published: value === 'true' }));
  };

  const handleSlugGeneration = () => {
    if (!formData.title) return;
    
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
      
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image: post.featured_image || '',
      author: user?.name || '',
      category: post.category || 'Shipping',
      slug: post.slug,
      published: post.published
    });
    setIsEditing(true);
  };

  const handleCreateOrUpdatePost = async (close: () => void) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      if (isEditing && currentPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: formData.title,
            content: formData.content,
            featured_image: formData.featured_image,
            slug: formData.slug,
            published: formData.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentPost.id);
          
        if (error) throw error;
        
        // Update local state
        setBlogPosts(prev => 
          prev.map(post => 
            post.id === currentPost.id 
              ? { 
                  ...post, 
                  title: formData.title,
                  content: formData.content,
                  featured_image: formData.featured_image,
                  slug: formData.slug,
                  published: formData.published
                } 
              : post
          )
        );
        
        toast({
          title: "Post updated",
          description: `"${formData.title}" has been updated successfully.`
        });
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: formData.title,
            content: formData.content,
            featured_image: formData.featured_image,
            slug: formData.slug,
            published: formData.published,
            author_id: user.id
          })
          .select();
          
        if (error) throw error;
        
        // Update local state with the new post
        setBlogPosts(prev => [data[0], ...prev]);
        
        toast({
          title: "Post created",
          description: `"${formData.title}" has been created successfully.`
        });
      }
      
      resetForm();
      close();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred saving the blog post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      
      toast({
        title: "Post deleted",
        description: "The blog post has been removed."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred deleting the blog post",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    setIsUploading(true);
    
    try {
      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from('blog')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog')
        .getPublicUrl(fileName);
        
      // Update form data with image URL
      setFormData(prev => ({ ...prev, featured_image: publicUrl }));
      
      toast({
        title: "Image uploaded",
        description: "The image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">Manage your blog posts for the public website.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <PlusIcon className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <div className="flex gap-2">
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter post title"
                    className="flex-grow"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleSlugGeneration}
                    className="shrink-0"
                  >
                    Generate Slug
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="post-url-slug"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="published">Status</Label>
                  <Select 
                    value={formData.published ? 'true' : 'false'} 
                    onValueChange={handlePublishedChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Published</SelectItem>
                      <SelectItem value="false">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="featured_image">Featured Image</Label>
                <div className="flex flex-col gap-2">
                  {formData.featured_image && (
                    <div className="relative w-full h-40 border rounded-md overflow-hidden">
                      <img 
                        src={formData.featured_image} 
                        alt="Featured" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Label 
                      htmlFor="image-upload" 
                      className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 flex-grow"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Upload Image
                        </>
                      )}
                    </Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    <Input 
                      name="featured_image"
                      value={formData.featured_image}
                      onChange={handleInputChange}
                      placeholder="Or enter image URL"
                      className="flex-grow"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description (displayed in previews)"
                  className="resize-none"
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Full blog post content"
                  className="resize-y"
                  rows={8}
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={(e) => handleCreateOrUpdatePost(() => {})}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditing ? 'Update Post' : 'Create Post'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : blogPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts found</p>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>Create Your First Post</Button>
            </DialogTrigger>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {post.featured_image ? (
                  <img 
                    src={post.featured_image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-gray-300" />
                )}
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span className={post.published ? "text-green-600" : "text-amber-600"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.content.substring(0, 100)}...</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end p-4 pt-0 gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    Preview
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                  <PenIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostManagement;
