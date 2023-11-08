import Image, { StaticImageData } from "next/image";
import styles from './hero.module.css'

import heroImage1 from "/public/hero/split.jpg";
import heroImage2 from "/public/hero/london.jpg";
import heroImage4 from "/public/hero/barcelona.jpg";
import heroImage3 from "/public/hero/newyork.jpg";

type HeroImageObject = {
  image: StaticImageData;
  borderRadius: string;
};

const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "20% 0 0 0" },
  { image: heroImage2, borderRadius: "0 20% 0 0" },
  { image: heroImage3, borderRadius: "0 0 0 20%" },
  { image: heroImage4, borderRadius: "0 0 20% 0" },
];

const HeroSection = () => (
      <div className={styles.imageContainer}>
        {images.map((imageObj, index) => (
          <div key={index} className={styles.images}>
            <Image
              src={imageObj.image}
              alt={`Hero image ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                borderRadius: `${imageObj.borderRadius}`,
              }}
            />
          </div>
        ))}
      </div>
);

export default HeroSection;