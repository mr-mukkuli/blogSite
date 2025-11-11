import Header from '../Header';

export default function HeaderExample() {
  return <Header onSearchChange={(q) => console.log('Search:', q)} />;
}
