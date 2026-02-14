import Link from 'next/link';
import { getImageUrl } from '../utils/tmdbApi';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date, vote_average } = movie;

  return (
    <Link href={`/movie/${id}`}>
      <div className="neo-brutal-card group cursor-pointer transform transition-all hover:-translate-y-2">
        <div className="relative overflow-hidden border-4 border-black">
          <img
            src={getImageUrl(poster_path, 'w500')}
            alt={title}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        </div>
        <div className="p-4 bg-white border-4 border-t-0 border-black">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {release_date ? new Date(release_date).getFullYear() : 'N/A'}
            </span>
            <span className="px-3 py-1 bg-yellow-400 border-2 border-black font-bold">
              ⭐ {typeof vote_average === "number" ? vote_average.toFixed(1) : "N/A"}
            </span>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;