'use client'

import Link from 'next/link';
import Image from 'next/image';
import { TypeDestinationListItem, destinations } from '../destinations/destinationsList';
import styles from './search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function SearchPage(){
    const searchParams = useSearchParams();
    const searchFilter: string = searchParams.get("search") || "";
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
    
    return(
        <div className={styles.searchMain}>
            <div className={styles.searchBarContainer}>
                <h1 className={styles.header1}>Search <i>destinations</i> or <i>blogs</i></h1>
                <form action="" className={styles.searchForm}>
                    <input type="text" className={styles.searchInput} placeholder="e.g. Split" name="search" />
                    <Image src="/images/search.png" alt="Location" width={20} height={20} className={styles.searchIcon} />
                </form>
                {searchFilter !== "" && (
                    <div className={styles.reset} onClick={() => deleteSearchParam("search")}>
                        Reset filter
                    </div>
                )}
            </div>
            <div className={styles.suggestionsContainer}>
                {searchFilter !== "" && <span className={styles.suggestionsHeader}>Results:</span>}
                <div className={styles.destinationsSuggestions}>
                {searchFilter !== "" &&  destinations.filter((destination: TypeDestinationListItem) => destination.name.toLowerCase().includes(searchFilter.toLowerCase())
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
            <div className={styles.suggestionsContainer}>
                <span className={styles.suggestionsHeader}>Destination suggestions:</span>
                <div className={styles.destinationsSuggestions}>
                    {destinations.slice(0,4).map((destination: TypeDestinationListItem) => (
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
            <div className={styles.suggestionsContainer}>
                <span className={styles.suggestionsHeader}>Blog suggestions:</span>
                <div className={styles.blogsSuggestions}>

                </div>
            </div>
        </div>
    )
};