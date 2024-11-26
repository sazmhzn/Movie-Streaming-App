import Image from "next/image";
import Link from "next/link";

import GenreDropDown from "./GenreDropDown";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
      {/* Logo */}
      <Link
        href={"/"}
        className="bg-blue-500 px-4 py-2 font-bold rounded-md uppercase"
      >
        {/* <Image
          src=""
          alt="Logo"
          width={120}
          height={100}
          priority={true}
          className="cursor-pointer w-40 h-auto"
        /> */}
        BitMovies
      </Link>
      <nav className="hidden md:block">
        <ul className="flex gap-12">
          <li>Home</li>
          <li>Country</li>
          <li>Movies</li>
          <li>TV Shows</li>
        </ul>
      </nav>
      {/* Others */}
      <div className="text-white flex space-x-2 items-center">
        {/* Genre */}
        <GenreDropDown />
        {/* Search */}
        {/* <SearchInput /> */}
        {/* Theme */}
        {/* <ThemeToggler /> */}
      </div>
    </div>
  );
};

export default Header;
