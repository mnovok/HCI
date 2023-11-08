import Link from "next/link";
import { FC } from "react";
import Logo from "./Logo";

interface NavbarProps {
  // Record of string keys and string values where each value is a path starting with a slash
  pages: Record<string, `/${string}`>;
}

const Navbar: FC<NavbarProps> = ({ pages }) => {
  return (
    <nav className="bg-white flex justify-between items-center py-1.5 sticky top-0">
          <Logo />
          <ul className="flex gap-8">
            {Object.entries(pages).map(([name, path]) => (
                <li key={name}>
                    <Link href={path} className="hover:text-emerald-700">{name}</Link>
                </li>
            ))}
          </ul>
          
        </nav>
  );
};

export default Navbar;