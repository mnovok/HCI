import Image, { StaticImageData } from "next/image";
import styles from './help.module.css'
import { FC, SVGProps } from "react";

const HelpSection: FC<SVGProps<SVGSVGElement>> = ({
    width = 42,
    height = 42,
    ...rest
  }) => {
    return (
        <div className={styles.help}>
            <div className={styles.group}>
                <div className={styles.icon}></div>
                <div className={styles.title}>Create Account</div>
                <div className={styles.text}>Customize your profile page</div>
            </div>
            <div className={styles.group}>
                <div className={styles.icon}></div>
                <div className={styles.title}>Explore</div>
                <div className={styles.text}>Learn more about different destinations</div>
            </div>
            <div className={styles.group}>
                <div className={styles.icon}></div>
                <div className={styles.title}>Share and Connect</div>
                <div className={styles.text}>Write about your own experiences </div>
            </div>
        </div>
    );
  };

export default HelpSection;