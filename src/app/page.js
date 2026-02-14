import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import SEO from '../components/SEO';
import { getNewReleases, searchMovies } from '@/utils/tmdbApi';

// Just make the component async!
export default async function Home({ searchParams }) {
  const searchQuery = searchParams?.search || '';
  
  let movies = [];
  let pageTitle = 'New Releases';
  
  try {
    if (searchQuery) {
      const searchResults = await searchMovies(searchQuery);
      movies = searchResults.results;
      pageTitle = `Search Results for "${searchQuery}"`;
    } else {
      const newReleases = await getNewReleases();
      movies = newReleases.results;
    }
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }

  const seoTitle = searchQuery 
    ? `${searchQuery} - Movie Search Results` 
    : 'Discover New Movies & Search';
  
  const seoDescription = searchQuery
    ? `Search results for ${searchQuery}. Find movie details, ratings, cast information, and similar recommendations.`
    : 'Discover the latest movie releases, search for your favorite films, and explore detailed information including ratings, cast, and recommendations.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'MovieFinder',
    'url': 'https://yourdomain.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://yourdomain.com/?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        jsonLd={jsonLd}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <Navbar />
        
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow-brutal">
              Find Your Next Favorite Movie
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium">
              Search thousands of movies, discover new releases, and explore details
            </p>
            <SearchBar />
          </div>

          <MovieGrid movies={movies} title={pageTitle} />
        </main>
      </div>
    </>
  );
}