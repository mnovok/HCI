import styles from './home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div className={styles.landing}>
        <p className={styles.slogan}>Navigating Your Journey, <br /> One Adventure at a Time!</p>
        <Link href="/destinations" className={styles.btn}>Explore Now</Link>
      </div>
    </main>
  );
}
