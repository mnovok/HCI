'use client'

import Link from "next/link";
import { FC, useState } from "react";
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
            <div className={styles.menu}>
                <ul>
                    <li>MENU
                        <ul className={styles.dropdown}>
                            {Object.entries(pages).map(([name, path]) => (
                                <li key={name}>
                                    <Link href={path} className={styles.tabs}>{name}</Link>
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