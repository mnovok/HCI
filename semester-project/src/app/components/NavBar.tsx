'use client'

import Link from "next/link";
import { FC, useState } from "react";
import Logo from "./Logo";
import styles from './nav.module.css';
import { cn } from "../../../lib/utils";
import { usePathname } from "next/navigation";

interface NavbarProps {
  // Record of string keys and string values where each value is a path starting with a slash
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "uppercase whitespace-nowrap text-base px-5 py-5 text-[#065E33] hover:bg-[#B3E0CA]";
  
const Navbar: FC<NavbarProps> = ({ pages }) => {
    const pathName = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = () => {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      };

      const handleMenuClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };

    return (
        <nav className={styles.navContainer}>
            <Link href={`/`}>
                <Logo />
            </Link>
            <ul className={styles.navList}>
                {Object.entries(pages).map(([name, path]) => (
                    <li key={name} >
                        <Link href={path} className={styles.tabs}>
                        <span className={`${
                            styles.baseClass
                            } 
                            ${
                                path === pathName 
                                || (name === 'blogs' && pathName === '/blogs') 
                                || pathName.includes(`${path}/`) 
                                ? styles.activeTab : ''}`}>
                            {name === "signin" ? "Sign In" : name}
                        </span>
                        </Link>
                    </li>
                ))}
            </ul>
            
        <div className={styles.menu}>
        <ul>
          <li className="text-[#065E35] font-semibold" >
            <Link href="#" className={styles.tabs} onClick={handleMenuClick}>
              MENU
            </Link>
            <ul className={cn(styles.dropdown, { [styles.showMobileMenu]: isMobileMenuOpen })}>
              {Object.entries(pages).map(([name, path]) => (
                <li key={name} onClick={handleLinkClick}>
                  <Link href={path} className={styles.tabs}>
                    <span
                      className={`${
                        styles.baseClass2
                      } ${
                        path === pathName ||
                        (name === "blogs" && pathName === "/blogs") ||
                        pathName.includes(`${path}/`)
                          ? `${styles.activeDropdownTab} ${styles.activeDropdownTab}`
                          : ""
                      }`}
                    >
                      {name === "signin" ? "Sign In" : name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

        </nav>
  );
};

export default Navbar;