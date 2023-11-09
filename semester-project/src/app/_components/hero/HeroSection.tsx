import Image, { StaticImageData } from "next/image";
import styles from './hero.module.css';
import Link from "next/link";

import heroImage1 from "/public/hero/split.jpg";
import heroImage2 from "/public/hero/london.jpg";
import heroImage4 from "/public/hero/barcelona.jpg";
import heroImage3 from "/public/hero/newyork.jpg";

type HeroImageObject = {
  image: StaticImageData;
  borderRadius: string;
  city: string;
  country: string;
};

const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "20% 0 0 0", city: "Split", country: "Croatia" },
  { image: heroImage2, borderRadius: "0 20% 0 0", city: "London", country: "England" },
  { image: heroImage3, borderRadius: "0 0 0 20%", city: "Barcelona", country: "Spain" },
  { image: heroImage4, borderRadius: "0 0 20% 0", city: "New York", country: "USA" },
];

const HeroSection = () => (
  <div className={styles.imageContainer}>
    {images.map((imageObj, index) => (
      <div key={index} className={styles.images}>
        <Link href={`destinations`}>
        <Image
          src={imageObj.image}
          alt={`Hero image ${index + 1}`}
          fill
          style={{
            objectFit: "cover",
            borderRadius: `${imageObj.borderRadius}`,
          }}
        />
        <div className={styles.textContainer}>
          <h1 className={styles.cityTitle}>{imageObj.city}</h1>
          <div className={styles.subtitleContainer}>
            <Image
              src="/images/location.png"
              alt="Location"
              width={50}
              height={50}
              className={styles.smallImage}
            />
              <h2 className={styles.countryTitle}>{imageObj.country}</h2>
          </div>
        </div>
        </Link>
      </div>
    ))}
  </div>
);

export default HeroSection;
