import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Article } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function CMSDashboardConnected() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete article",
        variant: "destructive",
      });
    },
  });

  const style = {
    "--sidebar-width": "16rem",
  };

  const publishedCount = articles?.length || 0;

  return (
    <>
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar />
          
          <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <h1 className="text-xl font-semibold" data-testid="text-dashboard-title">
                  Content Management
                </h1>
              </div>
              <ThemeToggle />
            </header>

            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2" data-testid="text-articles-heading">
                      Articles
                    </h2>
                    <p className="text-muted-foreground" data-testid="text-articles-description">
                      Manage your blog posts and content
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate("/cms/articles/new/edit")}
                    data-testid="button-create-article"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Article
                  </Button>
                </div>

                <Card>
                  {isLoading ? (
                    <div className="p-12 flex items-center justify-center">
                      <p className="text-muted-foreground">Loading articles...</p>
                    </div>
                  ) : articles && articles.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Published</TableHead>
                          <TableHead>Read Time</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {articles.map((article) => (
                          <TableRow key={article.id} data-testid={`row-article-${article.id}`}>
                            <TableCell className="font-medium" data-testid={`text-article-title-${article.id}`}>
                              {article.title}
                            </TableCell>
                            <TableCell data-testid={`text-article-date-${article.id}`}>
                              {article.published ? format(new Date(article.published), "MMM d, yyyy") : "-"}
                            </TableCell>
                            <TableCell data-testid={`text-article-readtime-${article.id}`}>
                              {article.readTime ? `${article.readTime} min` : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => navigate(`/article/${article.slug}`)}
                                  data-testid={`button-view-${article.id}`}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => navigate(`/cms/articles/${article.id}/edit`)}
                                  data-testid={`button-edit-${article.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setDeleteId(article.id)}
                                  data-testid={`button-delete-${article.id}`}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground mb-4">No articles yet</p>
                      <Button onClick={() => navigate("/cms/articles/new/edit")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Article
                      </Button>
                    </div>
                  )}
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stat-total-label">
                      Total Articles
                    </h3>
                    <p className="text-3xl font-bold" data-testid="text-stat-total-value">{publishedCount}</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stat-published-label">
                      Published
                    </h3>
                    <p className="text-3xl font-bold" data-testid="text-stat-published-value">{publishedCount}</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stat-views-label">
                      Categories
                    </h3>
                    <p className="text-3xl font-bold" data-testid="text-stat-views-value">-</p>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
