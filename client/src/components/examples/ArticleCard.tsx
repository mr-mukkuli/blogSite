import ArticleCard from '../ArticleCard';
import techImage from '@assets/generated_images/Tech_blog_coding_article_484e1668.png';

export default function ArticleCardExample() {
  return (
    <div className="p-8 bg-background max-w-sm">
      <ArticleCard
        title="Getting Started with Modern Web Development"
        excerpt="Learn the fundamentals of modern web development including React, TypeScript, and best practices for building scalable applications."
        thumbnail={techImage}
        category="Tutorials"
        readTime={5}
        onClick={() => console.log('Article clicked')}
      />
    </div>
  );
}
