import { type Category, type InsertCategory, type Article, type InsertArticle } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getArticle(id: string): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(categoryId: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private articles: Map<string, Article>;

  constructor() {
    this.categories = new Map();
    this.articles = new Map();
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null,
      icon: insertCategory.icon ?? null,
    };
    this.categories.set(id, category);
    return category;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug,
    );
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticlesByCategory(categoryId: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.categoryId === categoryId,
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      excerpt: insertArticle.excerpt ?? null,
      thumbnail: insertArticle.thumbnail ?? null,
      categoryId: insertArticle.categoryId ?? null,
      readTime: insertArticle.readTime ?? null,
      published: new Date(),
      updatedAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: string, updates: Partial<InsertArticle>): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;
    
    const updated: Article = {
      ...article,
      ...updates,
      updatedAt: new Date(),
    };
    this.articles.set(id, updated);
    return updated;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }
}

export const storage = new MemStorage();
