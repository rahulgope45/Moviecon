"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      router.push(`/?search=${encodeURIComponent(query)}`);
      // optional: reset loading after navigation
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative neo-brutal-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-6 py-4 text-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400"
          aria-label="Search movies"
        />
        <button
          type="submit"
          disabled={loading}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 border-4 border-black font-bold shadow-brutal 
            transition-transform transform hover:scale-105 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"}`}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
