'use client'

import Link from 'next/link';
import Image from 'next/image';
import { TypeDestinationListItem, destinations } from '../destinations/destinationsList';
import styles from './search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect , ChangeEvent} from 'react';

export default function SearchPage(){
    const searchParams = useSearchParams();
    const [searchFilter, setSearchFilter] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const [shuffledSuggestions, setShuffledSuggestions] = useState<TypeDestinationListItem[]>([]);
    const randomStartIndex = Math.floor(Math.random() * (5));

    const setSearchParam = useCallback(
        (name: string, value: string) => {
          const currentParams = searchParams.toString();
          const params = new URLSearchParams(currentParams);
    
          params.set(name, value);
          // If search params are still the, same there's no need to do anything
          if (currentParams === params.toString()) return;
    
          router.replace(pathname + "?" + params.toString(), { scroll: false });
        },
        [searchParams, pathname, router]
    );

    useEffect(() => {
        const initialSearch = searchParams.get('search') || '';
        setSearchFilter(initialSearch);
    }, [searchParams]);

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedValue = e.target.value;
        setSearchFilter(updatedValue);
        setSearchParam('search', updatedValue);
    };

    const deleteSearchParam = useCallback(
        (name: string) => {
          const currentParams = searchParams.toString();
          const params = new URLSearchParams(currentParams);
    
          params.delete(name);
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, pathname, router]
    );

    const filteredDestinations = destinations.filter(
        (destination: TypeDestinationListItem) =>
          destination.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          destination.country.toLowerCase() === searchFilter.toLowerCase()
      );

      const shuffleArray = (array: TypeDestinationListItem[]) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };

      useEffect(() => {
        const shuffledArray = shuffleArray(destinations.slice(randomStartIndex, randomStartIndex + 4));
        setShuffledSuggestions(shuffledArray);
      }, [destinations]);

    
    return(
        <div className={styles.searchMain}>
            <div className={styles.searchBarContainer}>
                <h1 className={styles.header1}>Where would you like to travel?</h1>
                <form action="" className={styles.searchForm}>
                    <input type="text"  
                           autoFocus 
                           className={styles.searchInput} 
                           placeholder="e.g. Split" 
                           name="search"
                           onChange={handleSearchInput} />
                    <button type='submit'>
                        <Image src="/images/search.png" alt="Location" width={20} height={20} className={styles.searchIcon} />
                    </button>
                </form>
                {searchFilter !== "" && (
                    <div className={styles.reset} onClick={() => deleteSearchParam("search")}>
                        Reset filter
                    </div>
                )}
            </div>
            <div className={styles.suggestionsContainer}>
                {searchFilter === "" ? null : (
                    filteredDestinations.length > 0 ? (
                        <>
                        <span className={styles.suggestionsHeader}>Results:</span>
                        <div className={styles.destinationsSuggestions}>
                        {filteredDestinations.map((destination: TypeDestinationListItem) => (
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
                        </>
                    ) : (
                        <>
                        <span className={styles.suggestionsHeader}>Results:</span>
                        <p className={styles.failedSearchText}>No destinations found. Try searching something else.</p></>
                    )
                )}

            </div>
            <div className={styles.suggestionsContainer}>
                <span className={styles.suggestionsHeader}>Suggestions:</span>
                <div className={styles.destinationsSuggestions}>
                    {shuffledSuggestions.slice(0,4).map((destination: TypeDestinationListItem) => (
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
        </div>
    )
};