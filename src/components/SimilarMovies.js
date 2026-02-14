import MovieGrid from './MovieGrid';

const SimilarMovies = ({ movies }) => {
  return (
    <div className="mt-16 border-t-8 border-black pt-8">
      <MovieGrid movies={movies.slice(0, 8)} title="Similar Movies" />
    </div>
  );
};

export default SimilarMovies;