import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  const tutorialsCategory = await storage.createCategory({
    name: "Documentation",
    slug: "documentation",
    description: "Learn everything about how to get started with modern web development and explore advanced features.",
  });

  const guidesCategory = await storage.createCategory({
    name: "Guides",
    slug: "guides",
    description: "A series of guides that delve deep into specific use cases and best practices for developers.",
  });

  const articles = [
    {
      title: "Getting Started: 5-Minute Quickstart",
      slug: "getting-started-quickstart",
      excerpt: "Quick introduction to building modern web applications with React, TypeScript, and best practices. Learn the fundamentals in just 5 minutes.",
      content: `
        <h2>Introduction</h2>
        <p>Welcome to modern web development! This quickstart guide will get you up and running in just 5 minutes.</p>
        
        <h3>What You'll Learn</h3>
        <ul>
          <li>Setting up your development environment</li>
          <li>Creating your first React component</li>
          <li>Understanding TypeScript basics</li>
          <li>Best practices for modern web apps</li>
        </ul>

        <h2>Step 1: Setup Your Environment</h2>
        <p>First, make sure you have Node.js installed on your system. You can download it from <a href="https://nodejs.org">nodejs.org</a>.</p>

        <h2>Step 2: Create Your First Component</h2>
        <p>React components are the building blocks of your application. Here's a simple example:</p>
        <pre><code>function Welcome() {
  return &lt;h1&gt;Hello, World!&lt;/h1&gt;;
}</code></pre>

        <h2>YouTube Tutorial</h2>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <h2>Next Steps</h2>
        <p>Now that you've learned the basics, you're ready to build amazing applications! Check out our advanced guides for more in-depth tutorials.</p>
      `,
      categoryId: tutorialsCategory.id,
      readTime: 5,
    },
    {
      title: "Modern Web Development Practices",
      slug: "modern-web-development-practices",
      excerpt: "Discover the latest trends and techniques in web development for building scalable, maintainable applications that stand the test of time.",
      content: `
        <h2>The Evolution of Web Development</h2>
        <p>Web development has come a long way in the past decade. Modern practices focus on performance, accessibility, and developer experience.</p>

        <h3>Key Principles</h3>
        <ul>
          <li>Component-based architecture</li>
          <li>Type safety with TypeScript</li>
          <li>Progressive enhancement</li>
          <li>Performance optimization</li>
          <li>Accessibility-first design</li>
        </ul>

        <h2>Component-Based Architecture</h2>
        <p>Breaking your application into reusable components makes it easier to maintain and scale. Each component should have a single responsibility and be composable with others.</p>

        <h2>Video: Building Scalable Applications</h2>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <blockquote>
          "The best code is no code at all. The second best is code that's easy to understand and maintain."
        </blockquote>

        <h2>Conclusion</h2>
        <p>By following modern web development practices, you'll build applications that are faster, more reliable, and easier to maintain over time.</p>
      `,
      categoryId: tutorialsCategory.id,
      readTime: 8,
    },
    {
      title: "Productivity Tips for Developers",
      slug: "productivity-tips-for-developers",
      excerpt: "Learn how to optimize your workflow and boost productivity with these essential tools, techniques, and habits for modern developers.",
      content: `
        <h2>Maximize Your Developer Productivity</h2>
        <p>Being productive isn't about working longer hours—it's about working smarter. Here are proven strategies to boost your development productivity.</p>

        <h3>Essential Tools</h3>
        <ul>
          <li>VS Code with the right extensions</li>
          <li>Terminal multiplexers like tmux</li>
          <li>Git workflows and aliases</li>
          <li>Task management systems</li>
          <li>Note-taking apps for documentation</li>
        </ul>

        <h2>Time Management Techniques</h2>
        <p>The Pomodoro Technique works wonders for developers. Work in focused 25-minute sessions, then take a 5-minute break. This helps maintain concentration and prevents burnout.</p>

        <h2>Keyboard Shortcuts Matter</h2>
        <p>Learning keyboard shortcuts can save you hours every week. Here are some essential ones:</p>
        <ul>
          <li>Multi-cursor editing</li>
          <li>Quick file navigation</li>
          <li>Refactoring shortcuts</li>
          <li>Search and replace patterns</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Small improvements compound over time. Implement these productivity tips gradually, and you'll see significant improvements in your development workflow.</p>
      `,
      categoryId: guidesCategory.id,
      readTime: 6,
    },
    {
      title: "Data Visualization Best Practices",
      slug: "data-visualization-best-practices",
      excerpt: "Create compelling data visualizations that tell stories and drive insights. Learn the principles of effective visual communication.",
      content: `
        <h2>The Art and Science of Data Visualization</h2>
        <p>Great data visualizations don't just present information—they tell a story. Let's explore the principles that make visualizations effective.</p>

        <h3>Choose the Right Chart Type</h3>
        <ul>
          <li>Bar charts for comparing categories</li>
          <li>Line charts for trends over time</li>
          <li>Pie charts for parts of a whole (use sparingly)</li>
          <li>Scatter plots for correlations</li>
          <li>Heatmaps for complex patterns</li>
        </ul>

        <h2>Color Theory</h2>
        <p>Color is powerful but can be misused. Use color to highlight important data, but avoid using too many colors that distract from your message.</p>

        <blockquote>
          "The purpose of visualization is insight, not pictures." - Ben Shneiderman
        </blockquote>

        <h2>Interactive Visualizations</h2>
        <p>Modern web technologies allow for rich, interactive visualizations that let users explore data on their own terms. Libraries like D3.js and Chart.js make this accessible to developers.</p>

        <h2>Accessibility Matters</h2>
        <p>Don't rely solely on color to convey information. Use patterns, labels, and alternative text to ensure your visualizations are accessible to everyone.</p>
      `,
      categoryId: tutorialsCategory.id,
      readTime: 10,
    },
    {
      title: "Building Scalable APIs",
      slug: "building-scalable-apis",
      excerpt: "Design and implement RESTful APIs that scale with your application's growth. Learn best practices for API design, versioning, and performance.",
      content: `
        <h2>API Design Fundamentals</h2>
        <p>A well-designed API is intuitive, consistent, and scalable. Let's explore the principles that make APIs great.</p>

        <h3>RESTful Design Principles</h3>
        <ul>
          <li>Use HTTP methods correctly (GET, POST, PUT, DELETE)</li>
          <li>Resource-based URLs</li>
          <li>Proper status codes</li>
          <li>Stateless architecture</li>
          <li>HATEOAS for discoverability</li>
        </ul>

        <h2>Versioning Strategies</h2>
        <p>Plan for change from the start. API versioning ensures backward compatibility while allowing your API to evolve.</p>

        <pre><code>// URL versioning example
app.get('/api/v1/users', getUsers);
app.get('/api/v2/users', getUsersV2);</code></pre>

        <h2>Performance Optimization</h2>
        <p>Scale your API by implementing caching, pagination, and rate limiting. These techniques ensure your API remains responsive under load.</p>

        <h3>Caching Strategies</h3>
        <ul>
          <li>HTTP caching headers</li>
          <li>CDN for static content</li>
          <li>Redis for dynamic data</li>
          <li>Database query optimization</li>
        </ul>

        <h2>Security Best Practices</h2>
        <p>Never trust user input. Validate all data, use authentication and authorization, and protect against common vulnerabilities like SQL injection and XSS.</p>
      `,
      categoryId: guidesCategory.id,
      readTime: 9,
    },
  ];

  for (const article of articles) {
    await storage.createArticle(article);
    console.log(`Created article: ${article.title}`);
  }

  console.log("Seeding complete!");
  console.log(`Created ${articles.length} articles and 2 categories`);
}

seed().catch(console.error);
