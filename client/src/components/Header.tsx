import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

export default function Header({ onSearchChange, showSearch = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" data-testid="icon-logo" />
            <span className="text-xl font-semibold" data-testid="text-site-title">BlogCMS</span>
          </div>
          
          {showSearch && (
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 pr-16"
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  data-testid="input-search"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </div>
            </div>
          )}

          <Button variant="default" size="sm" data-testid="button-cms">
            CMS Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
}
