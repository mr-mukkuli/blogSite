import { useState } from "react";
import Header from "@/components/Header";
import SearchHero from "@/components/SearchHero";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "wouter";

import techImage from '@assets/generated_images/Tech_blog_coding_article_484e1668.png';
import webDevImage from '@assets/generated_images/Web_development_abstract_design_f990b1bb.png';
import productivityImage from '@assets/generated_images/Productivity_workspace_illustration_1a372f7d.png';
import dataImage from '@assets/generated_images/Data_analytics_visualization_6be74d11.png';
import aiImage from '@assets/generated_images/AI_technology_concept_890b9ea7.png';
import tutorialsIcon from '@assets/generated_images/Tutorials_category_icon_54656d74.png';
import communityIcon from '@assets/generated_images/Community_category_icon_c2432777.png';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      name: "Documentation",
      description: "Learn everything about how to get started with modern web development and explore advanced features.",
      articleCount: 27,
      icon: tutorialsIcon,
    },
    {
      name: "Guides",
      description: "A series of guides that delve deep into specific use cases and best practices for developers.",
      articleCount: 15,
      icon: communityIcon,
    },
  ];

  const suggestedArticles = [
    {
      title: "Getting Started: 5-Minute Quickstart",
      excerpt: "Quick introduction to building modern web applications with React, TypeScript, and best practices.",
      thumbnail: techImage,
      category: "Tutorials",
      readTime: 5,
    },
    {
      title: "Modern Web Development Practices",
      excerpt: "Discover the latest trends and techniques in web development for building scalable applications.",
      thumbnail: webDevImage,
      category: "Documentation",
      readTime: 8,
    },
    {
      title: "Productivity Tips for Developers",
      excerpt: "Learn how to optimize your workflow and boost productivity with these essential tools and techniques.",
      thumbnail: productivityImage,
      category: "Guides",
      readTime: 6,
    },
    {
      title: "Data Visualization Best Practices",
      excerpt: "Create compelling data visualizations that tell stories and drive insights for your users.",
      thumbnail: dataImage,
      category: "Tutorials",
      readTime: 10,
    },
    {
      title: "AI and Machine Learning Integration",
      excerpt: "Integrate AI capabilities into your applications with practical examples and use cases.",
      thumbnail: aiImage,
      category: "Advanced",
      readTime: 12,
    },
    {
      title: "Building Scalable APIs",
      excerpt: "Design and implement RESTful APIs that scale with your application's growth.",
      thumbnail: webDevImage,
      category: "Documentation",
      readTime: 9,
    },
  ];

  const filteredArticles = searchQuery
    ? suggestedArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestedArticles;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 border-b">
        <Header onSearchChange={setSearchQuery} showSearch={false} />
        <ThemeToggle />
      </div>
      
      <SearchHero onSearchChange={setSearchQuery} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              {...category}
              onClick={() => console.log(`Navigate to ${category.name}`)}
            />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6" data-testid="text-suggested-articles-heading">
            {searchQuery ? `Search Results (${filteredArticles.length})` : "Suggested Articles"}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground" data-testid="text-no-results">
                No articles found for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.title}
                  {...article}
                  onClick={() => console.log(`Navigate to ${article.title}`)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/articles">
            <span className="text-primary font-medium hover:underline cursor-pointer" data-testid="link-show-all">
              Show All Articles →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
