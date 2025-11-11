interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div 
      className="article-content prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
      data-testid="content-article"
    >
      <style>{`
        .article-content p {
          margin-bottom: 1.5em;
          line-height: 1.8;
        }
        
        .article-content h1,
        .article-content h2,
        .article-content h3 {
          margin-top: 2em;
          margin-bottom: 0.75em;
          font-weight: 600;
        }
        
        .article-content h1 {
          font-size: 2rem;
        }
        
        .article-content h2 {
          font-size: 1.75rem;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
        }
        
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2em 0;
        }
        
        .article-content iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0.5rem;
          margin: 2em 0;
        }
        
        .article-content ul,
        .article-content ol {
          margin: 1.5em 0;
          padding-left: 2em;
        }
        
        .article-content li {
          margin-bottom: 0.5em;
        }
        
        .article-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }
        
        .article-content code {
          background: hsl(var(--muted));
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.9em;
          font-family: var(--font-mono);
        }
        
        .article-content pre {
          background: hsl(var(--muted));
          padding: 1.5em;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 2em 0;
        }
        
        .article-content pre code {
          background: none;
          padding: 0;
        }
        
        .article-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        
        .article-content a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
