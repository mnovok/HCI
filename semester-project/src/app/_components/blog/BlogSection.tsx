import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import contentfulService from '../../../../lib/contentfulClient';

const BASE_API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
  
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
  
    return `${formattedDay}/${formattedMonth}/${year}`;
}

const BlogSection = async () => {
    const blogs = await contentfulService.getAllBlogs();
    const numBlogs = blogs.length;
    const slicedBlogs = blogs.slice(numBlogs - 2, numBlogs);
  
    return (
      <div className={styles.blog}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Share experiences</h1>
          <h2 className={styles.description}>
            Unfold your travel stories and experiences with fellow adventurers, delving into the enchantment of travel
            to inspire and connect.
          </h2>
        </div>
  
        <div className={styles.blogsContainer}>
          {slicedBlogs.map((blog, index) => (
            <div className={styles.blogCard} key={index}>
              <Link href={`blogs/${blog.id}`}>
                <div
                  className={`${styles.blogCardItem} p-4 border border-gray-300 rounded h-80 relative hover:opacity-80`}
                  style={{
                    backgroundImage: `url(${blog.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <span className={`${styles.cardText} text-2xl md:text-xl lg:text-2xl xl:text-3xl font-semibold capitalize`}>
                    {blog.title}
                  </span>
  
                  <div className={`${styles.authorInfo} absolute bottom-4 left-4 w-full flex items-center p-2`}>
                    <div
                      className={`${styles.avatar} w-10 h-10 rounded-full mr-4`}
                      style={{
                        backgroundImage: `url(${blog.avatar})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                    <p className={styles.cardInfo}>{blog.author} • {formatDate(blog.datePosted)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
  
        <Link href="/blogs?_page=1&_limit=6" className={styles.btn}>
          Load more
        </Link>
      </div>
    );
  };
  

export default BlogSection;