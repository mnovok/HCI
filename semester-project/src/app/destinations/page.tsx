import Link from "next/link";
import Image from "next/image";
import styles from './destionations.module.css';
import contentfulService from "../../../lib/contentfulClient";
import ContinentFilter from "../(contentful)/types/_components/ContinentFilter";
import { categories } from "./destinationsList";
import { FC } from "react";

export type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>;
};

export interface TypeCategory {
  label: "Asia" | "Africa" | "Europe" | "Australia" | "North America" | "South America";
}

const DestinationsPage: FC<SearchParams> = async ({ searchParams }) => {
  const destinations = await contentfulService.getAllDestinations();
  const continents: TypeCategory[] = [
    { label: "Africa" },
    { label: "Asia" },
    { label: "Australia" },
    { label: "Europe" },
    { label: "North America" },
    { label: "South America" },
  ];

  const continentFilter: string | string[] | undefined = searchParams._category;

  const filteredDestinations = typeof continentFilter === 'string'
    ? destinations.filter((destination) => destination.continent === continentFilter)
    : destinations;
  

  return (
    <>
    {/* <div className={styles.categoriesContainer}>
        {continents.map((category) => (
          <div className={`${styles.category} `} key={category?.label}>
            {category?.label}
          </div>
        ))}
          <div className={styles.resetCategory}>
            Reset filter
          </div>
      </div> */}
    <ContinentFilter categories={continents}/>
    
    <div className={styles.destinationsContainer}>
    {filteredDestinations.map((destination) => {
          return (
            <div key={destination.id} className={styles.destinationCard}>
              <Link href={`destinations/${destination.id}`}>
                <div className={styles.imageContainer}>
                  <Image src="/images/heart2.png" alt="Heart" width={23} height={23} className={styles.heart}/>
                  <img src={destination.thumbnail} alt={destination.thumbnail} className={styles.destinationImage} />
                </div>
                <h2 className={styles.name}>{destination.title}</h2>
                <p className={styles.country}>{destination.country}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DestinationsPage;

/*

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
                  <Image src="/images/heart2.png" alt="Heart" width={23} height={23} className={styles.heart}/>
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
export default CmsPage;*/
