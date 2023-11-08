import HeroSection from './_components/hero/HeroSection';
import styles from './home.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.landingFrame1}>
        <p className={styles.slogan}>Navigating Your Journey, <br /> One Adventure at a Time!</p>
        <Link href="/destinations" className={styles.btn}>Explore Now</Link>
      </div>
      <div className={styles.discoverFrame2}>
        <div className={styles.discover}>
          <h1 className={styles.discoverTitle}>Discover</h1>
          <p className={styles.discoverText}>Unveil the allure of enchanting cities. Immerse yourself in diverse cultures, savor local flavors, and create unforgettable memories.</p>
          <Link href="/destinations" className={styles.btn}>Explore Now</Link>
        </div>
        <div className={styles.heroDestinations}>
          <HeroSection />
        </div>
      </div>
      <div className={styles.Frame3}>
        
      </div>
    </div>
  );
}
