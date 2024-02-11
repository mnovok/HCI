import Link from "next/link";
import clsx from 'clsx';
import styles from './blog.module.css';
import contentfulService from "../../../lib/contentfulClient";
import Pagination from "../(contentful)/types/_components/Pagination";
import { useState } from "react";

export type PageProps = {
  page: number;
  limit?: number;
};

export type PaginationProps = {
  first?: PageProps;
  prev?: PageProps;
  next?: PageProps;
  last?: PageProps;
};

interface BlogItem {
    id: string;
    title: string;
    author: string;
    content: string;
    thumbnail: string;
    avatar: string;
}

const BASE_API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

const getPosts = async (
  pagination = {
    limit: 6,
    page: 1,
  }
): Promise<BlogItem[]> => {
  const skip = (pagination.page - 1) * pagination.limit;
  const data = await fetch(
    `${BASE_API_URL}/posts?limit=${pagination.limit}&skip=${skip}`
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { _limit, _page } = searchParams;
  const blogsPerPage = 6;
  const currentPage = 1;
  const [pageSize, page] = [_limit, _page].map(Number);
  const totalPosts = await contentfulService.getTotalBlogPostsNumber();
  const totalPages = Math.ceil(totalPosts / pageSize);
  const blogs = await contentfulService.getAllBlogs(1, blogsPerPage);
  const slicedBlogs = blogs.slice((page - 1) * pageSize, page * pageSize);

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

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-8 lg:px-24">
        {slicedBlogs.map((blog) => (
          <div key={blog.id} className={`relative col-span-1 md:col-span-2 lg:col-span-1`}>
            <Link href={`blogs/${blog.id}`}>
              <div
                className={`${styles.blogCardItem} loading="lazy" h-80 md:h-64 lg:h-80 p-4 border border-gray-300 rounded relative hover:opacity-80`}
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
                  <div className={`${styles.avatar} loading="lazy" w-10 h-10 rounded-full mr-4`} 
                   style={{
                    backgroundImage: `url(${blog.avatar})`,  backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}>
                  </div> 
                    <p className={styles.cardInfo}>{blog.author} • {formatDate(blog.datePosted)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>


    <div className="flex flex-col items-center">
      <div className="mb-4 md:mb-4 text-center md:text-left text-lg pt-4">
          Page {page} of {totalPages}
      </div>
        <Pagination page={page} totalPages={totalPages} pageSize={blogsPerPage} />
      </div>
    </div>
  );
}