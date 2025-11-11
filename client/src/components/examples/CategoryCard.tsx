import CategoryCard from '../CategoryCard';
import tutorialsIcon from '@assets/generated_images/Tutorials_category_icon_54656d74.png';

export default function CategoryCardExample() {
  return (
    <div className="p-8 bg-background">
      <CategoryCard
        name="Documentation"
        description="Learn everything about how to get started with our platform and explore advanced features."
        articleCount={27}
        icon={tutorialsIcon}
        onClick={() => console.log('Category clicked')}
      />
    </div>
  );
}
