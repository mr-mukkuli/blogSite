import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ArticleCard from "@/components/ArticleCard";
import ArticleContent from "@/components/ArticleContent";
import type { Article, Category } from "@shared/schema";
import { format } from "date-fns";

export default function ArticleDetailConnected() {
  const [match, params] = useRoute("/article/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug;

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedArticles } = useQuery<Article[]>({
    queryKey: article?.categoryId ? [`/api/articles?category=${article.categoryId}`] : ["/api/articles"],
    enabled: !!article?.categoryId,
  });

  const { data: category } = useQuery<Category>({
    queryKey: [`/api/categories/${article?.categoryId}`],
    enabled: !!article?.categoryId,
  });

  const related = relatedArticles
    ?.filter((a) => a.id !== article?.id)
    .slice(0, 2) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-muted rounded w-24" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/2" />
            <div className="aspect-video bg-muted rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <div className="mb-8">
            {category && (
              <Badge variant="secondary" className="mb-4" data-testid="text-article-category">
                {category.name}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" data-testid="text-article-title">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              {article.published && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-article-date">
                    {format(new Date(article.published), "MMM d, yyyy")}
                  </span>
                </div>
              )}
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span data-testid="text-article-readtime">{article.readTime} min read</span>
                </div>
              )}
              <Button variant="ghost" size="sm" className="ml-auto" data-testid="button-share">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {article.thumbnail && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  data-testid="img-article-cover"
                />
              </div>
            )}

            {article.excerpt && (
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                {article.excerpt}
              </p>
            )}
          </div>

          <ArticleContent content={article.content} />
        </article>

        {related.length > 0 && (
          <>
            <Separator className="my-16" />
            <div>
              <h2 className="text-2xl font-semibold mb-6" data-testid="text-related-articles-heading">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    title={relatedArticle.title}
                    excerpt={relatedArticle.excerpt || ""}
                    thumbnail={relatedArticle.thumbnail || undefined}
                    readTime={relatedArticle.readTime || undefined}
                    onClick={() => navigate(`/article/${relatedArticle.slug}`)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
