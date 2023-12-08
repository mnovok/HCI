"use client";

import Link from "next/link";
import styles from './destionations.module.css';
import { TypeCategory, TypeDestinationListItem, categories, destinations } from "./destinationsList";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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
          <div className={styles.category} key={category?.label} onClick={() => setSearchParam("_category", category?.label as string)}>
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
                <h2 className={styles.name}>{destination.name}</h2>
                <p className={styles.country}>Country: {destination.country}</p>
                <img src={destination.heroImage} alt={destination.name} className={styles.destinationImage} />
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
};
  
//<p>Categories: {destination.categories.map(category => category.label).join(', ')}</p>

export default DestinationsPage;