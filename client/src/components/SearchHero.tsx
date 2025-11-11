import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchHeroProps {
  onSearchChange?: (query: string) => void;
}

export default function SearchHero({ onSearchChange }: SearchHeroProps) {
  return (
    <div className="py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
        How can we help? 👋
      </h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for articles..."
            className="pl-12 pr-16 h-14 text-base shadow-lg"
            onChange={(e) => onSearchChange?.(e.target.value)}
            data-testid="input-hero-search"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
}
