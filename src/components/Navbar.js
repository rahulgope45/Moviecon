import Link from 'next/link';
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b-8 border-black bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/logo.png"        // ✅ path relative to /public
            alt="Moviecon Logo"
            width={40}             // set width
            height={40}            // set height
            className="hover:scale-105 transition-transform"
          />
          <span className="text-3xl md:text-4xl font-bold hover:text-yellow-400 transition-colors">
            Moviecon
          </span>
        </Link>

        <div className="flex gap-4">
          <Link href="/">
            <span className="px-4 py-2 border-4 border-black bg-yellow-400 font-bold hover:bg-yellow-300 cursor-pointer transition-all hover:translate-x-1 hover:translate-y-1 shadow-brutal">
              Home
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;