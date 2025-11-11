import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CMSDashboard() {
  const style = {
    "--sidebar-width": "16rem",
  };

  const articles = [
    {
      id: 1,
      title: "Getting Started with Modern Web Development",
      category: "Tutorials",
      status: "Published",
      views: 1234,
      date: "Nov 11, 2025",
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      category: "Documentation",
      status: "Draft",
      views: 0,
      date: "Nov 10, 2025",
    },
    {
      id: 3,
      title: "Building Scalable APIs",
      category: "Guides",
      status: "Published",
      views: 856,
      date: "Nov 9, 2025",
    },
  ];

  return (
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
                <Button data-testid="button-create-article">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Article
                </Button>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id} data-testid={`row-article-${article.id}`}>
                        <TableCell className="font-medium" data-testid={`text-article-title-${article.id}`}>
                          {article.title}
                        </TableCell>
                        <TableCell data-testid={`text-article-category-${article.id}`}>
                          <Badge variant="secondary">{article.category}</Badge>
                        </TableCell>
                        <TableCell data-testid={`text-article-status-${article.id}`}>
                          <Badge variant={article.status === "Published" ? "default" : "outline"}>
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell data-testid={`text-article-views-${article.id}`}>
                          {article.views.toLocaleString()}
                        </TableCell>
                        <TableCell data-testid={`text-article-date-${article.id}`}>
                          {article.date}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              data-testid={`button-view-${article.id}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              data-testid={`button-edit-${article.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
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
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stat-total-label">
                    Total Articles
                  </h3>
                  <p className="text-3xl font-bold" data-testid="text-stat-total-value">24</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stat-published-label">
                    Published
                  </h3>
                  <p className="text-3xl font-bold" data-testid="text-stat-published-value">18</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stat-drafts-label">
                    Drafts
                  </h3>
                  <p className="text-3xl font-bold" data-testid="text-stat-drafts-value">6</p>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
