"use client"

import styles from '../../../destinations/destionations.module.css';
import { cn } from '../../../../../lib/utils';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface TypeCategory {
  label: "Africa" | "Asia" | "Australia" | "Europe" | "North America" | "South America";
}

interface CategoryFilterProps {
  categories: TypeCategory[];
}

const ContinentFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const categoryFilter: string = searchParams.get("_category") || "";
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParam = useCallback(
    (name: string, value: string) => {
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);

      params.set(name, value);
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
    <div className={styles.categoriesContainer}>
      {categories.map((category) => (
        <div
          key={category?.label}
          className={`${styles.category} cursor-pointer ${
            categoryFilter !== "" &&
            categoryFilter !== category?.label &&
            "opacity-30"
          }`}
          onClick={() => setSearchParam("_category", category?.label as string)}
        >
          {category?.label}
        </div>
      ))}
      {categoryFilter !== "" && (
        <div
          className={`${styles.resetCategory} cursor-pointer`}
          onClick={() => deleteSearchParam("_category")}
        >
          Reset filter
        </div>
      )}
    </div>
  );
};

export default ContinentFilter;
