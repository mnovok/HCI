import Image, { StaticImageData } from "next/image";
import styles from './hero.module.css';
import Link from "next/link";
import { TypeDestinationListItem, destinations } from "../../destinations/destinationsList";

import heroImage1 from "/public/images/destinations/split.jpg";
import heroImage2 from "/public/images/destinations/nyc.jpg";
import heroImage4 from "/public/images/destinations/banff.jpg";
import heroImage3 from "/public/images/destinations/cairo.jpg";

type HeroImageObject = {
  image: StaticImageData;
  borderRadius: string;
  city: string;
  country: string;
};

const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "20% 0 0 0", city: "Split", country: "Croatia" },
  { image: heroImage2, borderRadius: "0 20% 0 0", city: "NYC", country: "USA" },
  { image: heroImage4, borderRadius: "0 0 0 20%", city: "Banff", country: "Canada" },
  { image: heroImage3, borderRadius: "0 0 20% 0", city: "Cairo", country: "Egypt" },
];

const HeroSection = () => (
  
  <div className={styles.imageContainer}>
    {destinations.slice(0,4).map((destination: TypeDestinationListItem) => (
      <div key={destination.id} className={styles.images}>
        <Link href={`destinations/${destination.id}`}>
          <Image src={destination.heroImage} alt={`Hero image ${destination.id + 1}`} fill style={{objectFit: "cover", borderRadius: destination.borderRadius}}></Image>
          <div className={styles.textContainer}>
          <h1 className={styles.cityTitle}>{destination.name}</h1>
          <div className={styles.subtitleContainer}>
            <Image
              src="/images/location.png"
              alt="Location"
              width={50}
              height={50}
              className={styles.smallImage}
              loading="lazy"
            />
              <h2 className={styles.countryTitle}>{destination.country}</h2>
          </div>
          </div>
        </Link>
      </div>
    ))}

    
  </div>
);

export default HeroSection;
