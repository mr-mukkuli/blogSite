import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import SearchHero from "@/components/SearchHero";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import ThemeToggle from "@/components/ThemeToggle";
import type { Article } from "@shared/schema";

interface CategoryWithCount {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string | null;
  articleCount: number;
}

export default function HomeConnected() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories, isLoading: categoriesLoading } = useQuery<CategoryWithCount[]>({
    queryKey: ["/api/categories"],
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: searchQuery ? [`/api/articles?search=${encodeURIComponent(searchQuery)}`] : ["/api/articles"],
  });

  const filteredArticles = searchQuery && articles
    ? articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : articles || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 border-b">
        <Header onSearchChange={setSearchQuery} showSearch={false} />
        <ThemeToggle />
      </div>
      
      <SearchHero onSearchChange={setSearchQuery} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {categoriesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          categories && categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  description={category.description || ""}
                  articleCount={category.articleCount}
                  icon={category.icon || undefined}
                  onClick={() => navigate(`/category/${category.slug}`)}
                />
              ))}
            </div>
          )
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6" data-testid="text-suggested-articles-heading">
            {searchQuery ? `Search Results (${filteredArticles.length})` : "Recent Articles"}
          </h2>
          
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground" data-testid="text-no-results">
                {searchQuery ? `No articles found for "${searchQuery}"` : "No articles yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(0, 6).map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt || ""}
                  thumbnail={article.thumbnail || undefined}
                  readTime={article.readTime || undefined}
                  onClick={() => navigate(`/article/${article.slug}`)}
                />
              ))}
            </div>
          )}
        </div>

        {filteredArticles.length > 6 && !searchQuery && (
          <div className="text-center mt-8">
            <span 
              className="text-primary font-medium hover:underline cursor-pointer" 
              onClick={() => navigate("/articles")}
              data-testid="link-show-all"
            >
              Show All Articles →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
