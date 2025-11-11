import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { Link } from "wouter";
import ThemeToggle from "@/components/ThemeToggle";
import ArticleCard from "@/components/ArticleCard";

import techImage from '@assets/generated_images/Tech_blog_coding_article_484e1668.png';
import webDevImage from '@assets/generated_images/Web_development_abstract_design_f990b1bb.png';
import productivityImage from '@assets/generated_images/Productivity_workspace_illustration_1a372f7d.png';

export default function ArticleDetail() {
  const relatedArticles = [
    {
      title: "Advanced TypeScript Patterns",
      excerpt: "Deep dive into advanced TypeScript patterns for building robust applications.",
      thumbnail: webDevImage,
      category: "Tutorials",
      readTime: 8,
    },
    {
      title: "React Best Practices 2024",
      excerpt: "Modern React patterns and best practices for building scalable applications.",
      thumbnail: productivityImage,
      category: "Documentation",
      readTime: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4" data-testid="text-article-category">
              Tutorials
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" data-testid="text-article-title">
              Getting Started with Modern Web Development
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span data-testid="text-article-date">Nov 11, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span data-testid="text-article-readtime">5 min read</span>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto" data-testid="button-share">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
              <img 
                src={techImage} 
                alt="Article cover"
                className="w-full h-full object-cover"
                data-testid="img-article-cover"
              />
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Learn the fundamentals of modern web development including React, TypeScript, and best practices 
              for building scalable applications that stand the test of time.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Introduction</h2>
            <p className="leading-relaxed mb-6">
              Modern web development has evolved significantly over the past few years. With the introduction 
              of powerful frameworks and tools, developers can now build complex applications more efficiently 
              than ever before.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Key Concepts</h2>
            <p className="leading-relaxed mb-4">
              To get started with modern web development, you should understand these fundamental concepts:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Component-based architecture for reusable UI elements</li>
              <li>State management and data flow patterns</li>
              <li>TypeScript for type-safe code</li>
              <li>Modern build tools and development workflows</li>
              <li>Responsive design and accessibility best practices</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Getting Started</h2>
            <p className="leading-relaxed mb-6">
              The best way to learn is by building real projects. Start with a simple application and 
              gradually add more features as you become comfortable with the tools and patterns.
            </p>

            <div className="bg-muted p-6 rounded-lg my-8">
              <h3 className="text-lg font-semibold mb-3">Pro Tip</h3>
              <p className="text-sm leading-relaxed">
                Focus on understanding the fundamentals before diving into complex frameworks. 
                A solid foundation in JavaScript, HTML, and CSS will make learning any framework much easier.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Conclusion</h2>
            <p className="leading-relaxed mb-6">
              Modern web development offers exciting opportunities to build amazing user experiences. 
              Take your time to learn the fundamentals, and don't be afraid to experiment with new tools and techniques.
            </p>
          </div>
        </article>

        <Separator className="my-16" />

        <div>
          <h2 className="text-2xl font-semibold mb-6" data-testid="text-related-articles-heading">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <ArticleCard
                key={article.title}
                {...article}
                onClick={() => console.log(`Navigate to ${article.title}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
