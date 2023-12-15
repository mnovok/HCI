import Image, { StaticImageData } from "next/image";
import styles from './help.module.css'
import { FC, SVGProps } from "react";
import Link from "next/link";

const HelpSection: FC<SVGProps<SVGSVGElement>> = ({
    width = 42,
    height = 42,
    ...rest
  }) => {
    return (
        <div className={styles.help}>
            <Link href={`/signin`} className={styles.group}>
                <div className={styles.icon}>
                    <div className={styles.centeredImage}>
                        <Image src="/images/createAccount.png" alt="Icon" width={100} height={100} />
                    </div>
                </div>
                <div className={styles.title}>Create Account</div>
                <div className={styles.text}>Customize your profile page</div>
            </Link>
            <Link href={`/destinations`} className={styles.group}>
                <div className={styles.icon}>
                    <div className={styles.centeredImage}>
                        <Image src="/images/explore.png" alt="Icon" width={100} height={100} />
                    </div>
                </div>
                <div className={styles.title}>Explore</div>
                <div className={styles.text}>Learn more about different destinations</div>
            </Link>
            <Link href={`/blogs?_page=1&_limit=7`} className={styles.group}>
                <div className={styles.icon}>
                    <div className={styles.centeredImage}>
                        <Image src="/images/connect.png" alt="Icon" width={100} height={100} />
                    </div>
                </div>
                <div className={styles.title}>Share and Connect</div>
                <div className={styles.text}>Write about your own experiences </div>
            </Link>
        </div>
    );
  };

export default HelpSection;