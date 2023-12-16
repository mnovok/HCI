import Link from "next/link";
import clsx from 'clsx';
import styles from './blog.module.css';
import { useState } from "react";
const imageUrl1 = 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const imageUrl2 = 'https://plus.unsplash.com/premium_photo-1663054480506-583f20275a34?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  
const imageUrl3 = 'https://plus.unsplash.com/premium_photo-1680102981920-cbdc911b7556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const avatar = 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Pagination {
  limit: number;
  page: number;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPosts = async (
  pagination: Pagination = {
    limit: 9999,
    page: 1,
  }
): Promise<Post[]> => {
  const data = await fetch(
    `${BASE_API_URL}/posts?_limit=${pagination.limit}&_page=${pagination.page}`
  );
  return data.json();
};

const getTotalPosts = async (): Promise<number> => {
  const response = await fetch(`${BASE_API_URL}/posts?_limit=1`, {
    method: "HEAD",
  });
  // get x-total-count header
  return parseInt(response.headers.get("x-total-count") || "1", 10);
};



export default async function Blog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { _limit, _page } = searchParams;
  const [pageSize, page] = [_limit, _page].map(Number);
  const totalPosts = await getTotalPosts();
  const totalPages = Math.ceil(totalPosts / pageSize);

  const posts = await getPosts({
    limit: pageSize,
    page: page,
  });

  return (
    <div className={styles.main}>
        <div className={styles.headerContainer}>
          <h1>Blogs</h1>
          <h2>Read about travel experiences of other users.</h2>  
          <div className="flex items-baseline gap-8 pb-10">
            <div className="flex gap-4">
              <Link
                href={{
                  pathname: "/post",
                }}
                className={clsx(
                  "rounded-3xl border bg-[#065E35] px-12 py-2 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33] text-xl",
                )}>
                POST
              </Link>
            </div>
          </div>
        </div>

      
        {/* <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`blogs/${post.id}`}>
                <span className="text-2xl text-[#065E33] capitalize">
                  Post {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul> */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-8 lg:px-24">
        {posts.map((post, index) => (
          <div key={post.id} className={`relative col-span-1 md:col-span-2 lg:col-span-1`}>
            <Link href={`blogs/${post.id}`}>
              <div
                className={`${styles.blogCardItem} h-80 md:h-64 lg:h-80 p-4 border border-gray-300 rounded relative hover:opacity-80`}
                style={{
                  backgroundImage: index === 0 ? `url(${imageUrl1})` : `url(${index % 2 === 0 ? imageUrl2 : imageUrl3})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className={`${styles.cardText} text-2xl md:text-xl lg:text-2xl xl:text-3xl font-semibold capitalize`}>
                  Post {post.title}
                </span>
                
                <div className={`${styles.authorInfo} absolute bottom-4 left-4 w-full flex items-center p-2`}>
                  <div className={`${styles.avatar} w-10 h-10 rounded-full mr-4`} 
                   style={{
                    backgroundImage: `url(${avatar})`,  backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}>
                  </div> 
                    <p className={styles.cardInfo}>John Doe • 8/11/2023</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>


    <div className="flex flex-col items-center">
      <div className="mb-4 md:mb-4 text-center md:text-left text-lg">
          Page {page} of {totalPages}
      </div>
      {_limit && _page && (
          <div className="flex items-baseline gap-8 pb-10">
            <div className="flex gap-4">
              <Link
                href={{
                  pathname: "/blogs",
                  query: { _page: 1, _limit: pageSize },
                }}
                className="rounded-3xl border  bg-[#065E35] px-10 py-2  text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]"
              >
                First
              </Link>
              <Link
                href={{
                  pathname: "/blogs",
                  query: { _page: page > 1 ? page - 1 : 1, _limit: pageSize },
                }}
                className={clsx(
                  "rounded-3xl border bg-[#065E35] px-6 py-2 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
                  page === 1 && "pointer-events-none opacity-50"
                )}
              >
                Previous
              </Link>
              <Link
                href={{
                  pathname: "/blogs",
                  query: { _page: page + 1, _limit: pageSize },
                }}
                className={clsx(
                  "rounded-3xl border bg-[#065E35] px-10 py-2 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
                  page === totalPages && "pointer-events-none opacity-50"
                )}
              >
                Next
              </Link>
              <Link
                href={{
                  pathname: "/blogs",
                  query: { _page: totalPages, _limit: pageSize },
                }}
                className="rounded-3xl border bg-[#065E35] px-10 py-2 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]"
              >
                Last
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}