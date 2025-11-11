import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  thumbnail?: string;
  category?: string;
  readTime?: number;
  onClick?: () => void;
}

export default function ArticleCard({ title, excerpt, thumbnail, category, readTime, onClick }: ArticleCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 group"
      onClick={onClick}
      data-testid={`card-article-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {thumbnail && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {category && (
          <Badge variant="secondary" className="mb-3 text-xs" data-testid={`text-category-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {category}
          </Badge>
        )}
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-snug" data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed" data-testid={`text-excerpt-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {excerpt}
        </p>
        
        {readTime && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span data-testid={`text-readtime-${title.toLowerCase().replace(/\s+/g, '-')}`}>{readTime} min read</span>
          </div>
        )}
      </div>
    </Card>
  );
}
