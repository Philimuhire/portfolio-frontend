import { Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/Card"
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Link } from "wouter";
import type { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
  reactionCount?: number;
  commentCount?: number;
  onReactionToggle?: () => void;
  isReacted?: boolean;
}

export default function BlogCard({ 
  blog, 
  reactionCount = 0, 
  commentCount = 0, 
  onReactionToggle,
  isReacted = false 
}: BlogCardProps) {
  return (
    <Card className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <img 
        src={blog.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"} 
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blogs/${blog.id}`}>
          <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-primary transition-colors duration-300 cursor-pointer">
            {blog.title}
          </h3>
        </Link>
        <p className="text-slate-600 mb-4 line-clamp-3">
          {blog.content.substring(0, 150)}...
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {new Date(blog.postedDate).toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReactionToggle}
              className={`flex items-center space-x-1 ${isReacted ? 'text-red-500' : 'text-slate-600'} hover:text-red-500 transition-colors duration-300`}
            >
              <Heart className={`w-4 h-4 ${isReacted ? 'fill-current' : ''}`} />
              <span>{reactionCount}</span>
            </Button>
            <span className="flex items-center space-x-1 text-slate-600">
              <MessageCircle className="w-4 h-4" />
              <span>{commentCount}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
