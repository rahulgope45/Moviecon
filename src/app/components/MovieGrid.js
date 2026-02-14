import MovieCard from './MovieCard';

const MovieGrid = ({ movies, title }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-bold">No movies found</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-4xl font-bold mb-8 border-b-8 border-black inline-block pb-2">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;