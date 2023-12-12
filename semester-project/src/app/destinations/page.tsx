"use client";

import Link from "next/link";
import styles from './destionations.module.css';
import { TypeCategory, TypeDestinationListItem, categories, destinations } from "./destinationsList";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface CategoryFilterProps {
  categories: TypeCategory[];
}

const DestinationsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryFilter: string = searchParams.get("_category") || "";
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParam = useCallback(
    (name: string, value: string) => {
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);

      params.set(name, value);
      // If search params are still the same there's no need to do anything
      if (currentParams === params.toString()) return;

      router.replace(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const deleteSearchParam = useCallback(
    (name: string) => {
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);

      params.delete(name);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className={styles.main}>
      <div className={styles.categoriesContainer}>
        {categories.map((category: TypeCategory) => (
          <div className={`${styles.category} ${category?.label.toUpperCase() === categoryFilter.toUpperCase() ? styles.activeCategory : ''}`} 
            key={category?.label} onClick={() => setSearchParam("_category", category?.label as string)}>
            {category?.label}
          </div>
        ))}
        {categoryFilter !== "" && (
          <div className={styles.resetCategory} onClick={() => deleteSearchParam("_category")}>
            Reset filter
          </div>
      )}
      </div>
      
      <div className={styles.destinationsContainer}>
        {destinations.filter((destination: TypeDestinationListItem) =>
          categoryFilter === "" || destination.categories.some(category => category.label === categoryFilter)
          ).map((destination: TypeDestinationListItem) => (
            <div key={destination.id} className={styles.destinationCard}>
              <Link href={`destinations/${destination.id}`}>
                <div className={styles.imageContainer}>
                  <Image src="/images/heart.png" alt="Heart" width={23} height={23} className={styles.heart}/>
                  <img src={destination.heroImage} alt={destination.name} className={styles.destinationImage} />
                </div>
                <h2 className={styles.name}>{destination.name}</h2>
                <p className={styles.country}>{destination.country}</p>
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
};
  
//<p>Categories: {destination.categories.map(category => category.label).join(', ')}</p>

export default DestinationsPage;