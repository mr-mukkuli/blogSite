import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCategorySchema, insertArticleSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const articles = await storage.getArticlesByCategory(category.id);
          return {
            ...category,
            articleCount: articles.length,
          };
        })
      );
      
      res.json(categoriesWithCounts);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      const articles = await storage.getArticlesByCategory(category.id);
      res.json({ ...category, articles });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validated = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validated);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const { category, search } = req.query;
      let articles;
      
      if (category && typeof category === 'string') {
        articles = await storage.getArticlesByCategory(category);
      } else {
        articles = await storage.getAllArticles();
      }
      
      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        articles = articles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchLower) ||
            article.excerpt?.toLowerCase().includes(searchLower) ||
            article.content.toLowerCase().includes(searchLower)
        );
      }
      
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validated = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validated);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Error creating article:", error);
      res.status(500).json({ error: "Failed to create article" });
    }
  });

  app.put("/api/articles/:id", async (req, res) => {
    try {
      const validated = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(req.params.id, validated);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Error updating article:", error);
      res.status(500).json({ error: "Failed to update article" });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const success = await storage.deleteArticle(req.params.id);
      
      if (!success) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
