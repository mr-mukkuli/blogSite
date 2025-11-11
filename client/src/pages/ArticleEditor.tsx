import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Category, Article } from "@shared/schema";
import { ArrowLeft, Save } from "lucide-react";

export default function ArticleEditor() {
  const [, params] = useRoute("/cms/articles/:id/edit");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const isEdit = params?.id !== "new";
  const articleId = isEdit ? params?.id : undefined;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [readTime, setReadTime] = useState("");

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: article } = useQuery<Article>({
    queryKey: [`/api/articles/${articleId}`],
    enabled: isEdit && !!articleId,
  });

  useEffect(() => {
    if (article && isEdit) {
      setTitle(article.title);
      setSlug(article.slug);
      setExcerpt(article.excerpt || "");
      setContent(article.content);
      setThumbnail(article.thumbnail || "");
      setCategoryId(article.categoryId || "");
      setReadTime(article.readTime?.toString() || "");
    }
  }, [article, isEdit]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEdit || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/articles", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Success",
        description: "Article created successfully",
      });
      navigate("/cms");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PUT", `/api/articles/${articleId}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles", articleId] });
      toast({
        title: "Success",
        description: "Article updated successfully",
      });
      navigate("/cms");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update article",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      slug,
      excerpt: excerpt || undefined,
      content,
      thumbnail: thumbnail || undefined,
      categoryId: categoryId || undefined,
      readTime: readTime ? parseInt(readTime) : undefined,
    };

    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const style = {
    "--sidebar-width": "16rem",
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/cms")}
                data-testid="button-back-to-dashboard"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-8" data-testid="text-editor-title">
                {isEdit ? "Edit Article" : "Create New Article"}
              </h1>

              <form onSubmit={handleSubmit}>
                <Card className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter article title"
                      required
                      data-testid="input-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="article-url-slug"
                      required
                      data-testid="input-slug"
                    />
                    <p className="text-xs text-muted-foreground">
                      URL-friendly version of the title
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief summary of the article"
                      rows={3}
                      data-testid="input-excerpt"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      data-testid="input-thumbnail"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger id="category" data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="readTime">Read Time (minutes)</Label>
                      <Input
                        id="readTime"
                        type="number"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        placeholder="5"
                        min="1"
                        data-testid="input-readtime"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <RichTextEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Write your article content here. You can add YouTube videos, images, and rich formatting."
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Use the video button to embed YouTube videos, and the image button to add images.
                    </p>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/cms")}
                      disabled={isPending}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending || !title || !slug || !content}
                      data-testid="button-save"
                    >
                      {isPending ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {isEdit ? "Update Article" : "Create Article"}
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </form>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
