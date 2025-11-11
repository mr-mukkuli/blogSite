import SearchHero from '../SearchHero';

export default function SearchHeroExample() {
  return (
    <div className="bg-background">
      <SearchHero onSearchChange={(q) => console.log('Search:', q)} />
    </div>
  );
}
