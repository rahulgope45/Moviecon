import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import SimilarMovies from '@/components/SimilarMovies';
import SEO from '@/components/SEO';
import { getMovieDetails,getImageUrl } from '@/utils/tmdbApi';


export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const movie = await getMovieDetails(id);
    
    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function MovieDetail({ movie }) {
  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    genres,
    credits,
    similar,
  } = movie;

  const cast = credits?.cast?.slice(0, 8) || [];
  const similarMovies = similar?.results || [];

  const seoDescription = overview.length > 155 
    ? `${overview.substring(0, 152)}...` 
    : overview;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    'name': title,
    'description': overview,
    'image': getImageUrl(poster_path, 'original'),
    'datePublished': release_date,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': vote_average,
      'ratingCount': vote_count,
      'bestRating': '10',
      'worstRating': '0'
    },
    'genre': genres?.map(g => g.name).join(', '),
    'actor': cast.map(actor => ({
      '@type': 'Person',
      'name': actor.name
    }))
  };

  return (
    <>
      <SEO
        title={`${title} (${new Date(release_date).getFullYear()})`}
        description={seoDescription}
        image={getImageUrl(poster_path, 'original')}
        type="video.movie"
        jsonLd={jsonLd}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <Navbar />

        <main className="container mx-auto px-4 py-12">
          {/* Hero Section with Backdrop */}
          <div className="relative mb-12 border-8 border-black overflow-hidden">
            {backdrop_path && (
              <div className="absolute inset-0">
                <img
                  src={getImageUrl(backdrop_path, 'original')}
                  alt={title}
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
            )}
            <div className="relative bg-white/90 p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Poster */}
                <div className="md:col-span-1">
                  <div className="border-4 border-black shadow-brutal">
                    <img
                      src={getImageUrl(poster_path, 'w500')}
                      alt={title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-2">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 border-b-4 border-black inline-block pb-2">
                    {title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="px-4 py-2 bg-yellow-400 border-4 border-black font-bold text-xl">
                      ⭐ {vote_average.toFixed(1)}/10
                    </span>
                    <span className="px-4 py-2 bg-blue-400 border-4 border-black font-bold">
                      {new Date(release_date).getFullYear()}
                    </span>
                    {runtime && (
                      <span className="px-4 py-2 bg-green-400 border-4 border-black font-bold">
                        {Math.floor(runtime / 60)}h {runtime % 60}m
                      </span>
                    )}
                  </div>

                  {genres && genres.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-pink-300 border-2 border-black font-medium"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-3 border-b-4 border-black inline-block pb-1">
                      Overview
                    </h3>
                    <p className="text-lg leading-relaxed">{overview}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-bold">{vote_count.toLocaleString()}</span>
                    <span>ratings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          {cast.length > 0 && (
            <section className="mb-12 bg-white border-8 border-black p-8">
              <h2 className="text-3xl font-bold mb-6 border-b-4 border-black inline-block pb-2">
                Cast
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {cast.map((actor) => (
                  <div key={actor.id} className="text-center">
                    <div className="border-4 border-black mb-3 overflow-hidden">
                      <img
                        src={getImageUrl(actor.profile_path, 'w185')}
                        alt={actor.name}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-bold text-lg">{actor.name}</p>
                    <p className="text-gray-600 text-sm">{actor.character}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <SimilarMovies movies={similarMovies} />
          )}
        </main>
      </div>
    </>
  );
}