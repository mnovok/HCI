import Link from "next/link";
import { FC } from "react";
import Logo from "./Logo";
import styles from './nav.module.css'

interface NavbarProps {
  // Record of string keys and string values where each value is a path starting with a slash
  pages: Record<string, `/${string}`>;
}

const Navbar: FC<NavbarProps> = ({ pages }) => {
  return (
    <nav className={styles.navContainer}>
          <Logo />
          <ul className={styles.navList}>
            {Object.entries(pages).map(([name, path]) => (
                <li key={name}>
                    <Link href={path} className={styles.tabs}>{name}</Link>
                </li>
            ))}
          </ul>
          
        </nav>
  );
};

export default Navbar;