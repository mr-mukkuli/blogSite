import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomeConnected from "@/pages/HomeConnected";
import ArticleDetailConnected from "@/pages/ArticleDetailConnected";
import CMSDashboardConnected from "@/pages/CMSDashboardConnected";
import ArticleEditor from "@/pages/ArticleEditor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeConnected} />
      <Route path="/article/:slug" component={ArticleDetailConnected} />
      <Route path="/cms" component={CMSDashboardConnected} />
      <Route path="/cms/articles/:id/edit" component={ArticleEditor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
