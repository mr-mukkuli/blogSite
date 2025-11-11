import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  description: string;
  articleCount: number;
  icon?: string;
  onClick?: () => void;
}

export default function CategoryCard({ name, description, articleCount, icon, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 min-h-48 flex flex-col relative group"
      onClick={onClick}
      data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="absolute top-4 right-4">
        <Badge variant="secondary" className="text-xs" data-testid={`text-article-count-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          {articleCount} Article{articleCount !== 1 ? 's' : ''}
        </Badge>
      </div>
      
      {icon && (
        <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <img src={icon} alt="" className="w-8 h-8 object-contain" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2 pr-20" data-testid={`text-category-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        {name}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed flex-1" data-testid={`text-category-description-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        {description}
      </p>
      
      <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
        Explore
        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );
}
