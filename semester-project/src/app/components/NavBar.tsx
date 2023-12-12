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

    return (
        <nav className={styles.navContainer}>
            <Link href={`/`}>
                <Logo />
            </Link>
            <ul className={styles.navList}>
                {Object.entries(pages).map(([name, path]) => (
                    <li key={name}>
                        <Link href={path} className={styles.tabs}>
                        <span
                            className={cn(baseClass, {
                            "bg-[#065E33] text-[#d9e3de] pointer-events-none":
                                (path === pathName || (name === 'blogs' && pathName === '/blogs') || pathName.includes(`${path}/`)),
                            })}
                        >
                            {name === "signin" ? "Sign In" : name}
                        </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.menu}>
                <ul>
                    <li className="text-[#065E35] font-semibold">MENU
                        <ul className={styles.dropdown}>
                            {Object.entries(pages).map(([name, path]) => (
                                <li key={name}>
                                    <Link href={path} className={styles.tabs}>
                                        {name === "signin" ? "Sign In" : name}
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