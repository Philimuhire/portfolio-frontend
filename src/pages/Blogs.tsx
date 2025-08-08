import { useState } from "react";
import { Button } from "@/components/Button";
import BlogCard from "@/components/BlogCard";
import { useToast } from "@/hooks/use-toast";
import type { Blog } from "@/types/blog";
import { mockBlogs } from "@/data/mockBlogs";

export default function Blogs() {
  const [blogs] = useState<Blog[]>(mockBlogs); 
  const { toast } = useToast();

  const handleReactionToggle = (blogId: string) => {
    toast({
      title: "Reaction Added",
      description: `You liked blog ${blogId} (mocked)`,
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Blog</h1>
          <p className="text-xl text-slate-600">Thoughts, tutorials, and insights on web development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              reactionCount={Math.floor(Math.random() * 50) + 10}
              commentCount={Math.floor(Math.random() * 20) + 5}
              onReactionToggle={() => handleReactionToggle(blog.id)}
              isReacted={false}
            />
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No blog posts available at the moment.</p>
          </div>
        )}

        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
