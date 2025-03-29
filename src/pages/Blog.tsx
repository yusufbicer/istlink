
import React from 'react';
import { mockBlogPosts } from '@/lib/mock-data';

const Blog = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBlogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm">
            <img 
              src={post.imageUrl || "/placeholder.svg"} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-500 text-sm mt-1">
                {post.date} • {post.author}
              </p>
              <p className="mt-2">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
