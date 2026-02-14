import SearchBar from "./components/SearchBar";


export default function Home() {

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Example: navigate or call API
    // router.push(`/results?query=${query}`);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Next.js App</h1>
      <SearchBar  />
    </main>

  );
}
