"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ correct for App Router

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
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
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-yellow-400 border-4 border-black font-bold hover:bg-yellow-300 transition-all hover:translate-x-1 hover:translate-y-1 shadow-brutal"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
