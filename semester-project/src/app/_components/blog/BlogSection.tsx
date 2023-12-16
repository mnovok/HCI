import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';

const imageUrl2 = 'https://plus.unsplash.com/premium_photo-1663054480506-583f20275a34?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  
const imageUrl1 = 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const avatar1 = 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const avatar2 = 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


const BlogSection = () => {
 return(
    <div className={styles.blog}>
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>Share experiences</h1>
            <h2 className={styles.description}>Unfold your travel stories and experiences with fellow adventurers, delving into the enchantment of travel 
                to inspire and connect.
            </h2>
        </div>

        <div className={styles.blogsContainer}>

        <div className={styles.blogCard}>
                <Link href={`blogs/1`}>
                    <div
                        className={`${styles.blogCardItem} p-4 border border-gray-300 rounded h-80 relative hover:opacity-80`}
                        style={{
                            backgroundImage: `url(${imageUrl1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <span className={`${styles.cardText} text-2xl md:text-xl lg:text-2xl xl:text-3xl font-semibold capitalize`}>
                            How camping alone cleared my mind
                        </span>
                        
                        <div className={`${styles.authorInfo} absolute bottom-4 left-4 w-full flex items-center p-2`}>
                            <div className={`${styles.avatar} w-10 h-10 rounded-full mr-4`} 
                                 style={{ backgroundImage: `url(${avatar1})`,   
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center',
                                          backgroundRepeat: 'no-repeat',  }}>
                            </div>                             
                            <p className={styles.cardInfo}>Alex Park • 8/11/2023</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className={styles.blogCard}>
                <Link href={`blogs/3`}>
                    <div
                        className={`${styles.blogCardItem} p-4 border border-gray-300 rounded h-80 relative hover:opacity-80`}
                        style={{
                            backgroundImage: `url(${imageUrl2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <span className={`${styles.cardText} text-2xl md:text-xl lg:text-2xl xl:text-3xl font-semibold capitalize`}>
                            Travelling to Italy with family
                        </span>
                        
                        <div className={`${styles.authorInfo} absolute bottom-4 left-4 w-full flex items-center p-2`}>
                            <div className={`${styles.avatar} w-10 h-10 rounded-full mr-4`} 
                                 style={{ backgroundImage: `url(${avatar2})`,   
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center',
                                          backgroundRepeat: 'no-repeat',  }}>
                            </div>                             
                            <p className={styles.cardInfo}>Toni Marrone • 8/11/2023</p>
                        </div>
                    </div>
                </Link>
            </div>

        </div>
        <Link href="/blogs?_page=1&_limit=6" className={styles.btn}>Load more</Link>
    </div>
 )
};

export default BlogSection;