import Link from "next/link";
import clsx from 'clsx';
const imageUrl1 = 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const imageUrl2 = 'https://plus.unsplash.com/premium_photo-1663054480506-583f20275a34?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  
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
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-1" style={{ marginTop: '64px' }}>
      <h1 className="text-3xl font-bold px-10 uppercase text-[#04371E]">Blogs</h1>
        <h2 className="text-xl font-semibold p-10 text-[#04371E]" >Read about travel experiences of other users.</h2>

      {_limit && _page && (
        <div className="flex items-baseline gap-8 pb-10">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-4">
            <Link
              href={{
                pathname: "/blogs",
                query: { _page: 1, _limit: pageSize },
              }}
              className="rounded-3xl border  bg-[#065E35] px-3 py-1 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]"
            >
              First
            </Link>
            <Link
              href={{
                pathname: "/blogs",
                query: { _page: page > 1 ? page - 1 : 1, _limit: pageSize },
              }}
              className={clsx(
                "rounded-3xl border bg-[#065E35] px-3 py-1 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
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
                "rounded-3xl border bg-[#065E35] px-3 py-1 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
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
              className="rounded-3xl border bg-[#065E35] px-3 py-1 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]"
            >
              Last
            </Link>
          </div>
        </div>
      )}

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
  <div className="grid grid-cols-2 gap-8 py-4">
    {posts.map((post, index) => (
      <div key={post.id}>
        <Link href={`blogs/${post.id}`}>
          <div
            className="p-4 border border-gray-300 rounded h-64 relative"
            style={{
              backgroundImage: (index % 3 === 0 || index % 3 === 1) ? `url(${imageUrl1})` : `url(${imageUrl2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            >
            <span className="text-2xl text-gray-100 drop-shadow-2xl font-semibold capitalize">
              Post {post.title}
            </span>
            
            <div className="absolute bottom-4 left-4 w-full flex items-center p-2">
              <div className="w-10 h-10 rounded-full mr-4" style={{
                backgroundImage: `url(${avatar})`,  backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',}}>
              </div> 
              <span className="text-gray-100 text-sm font-medium tracking-widest uppercase">Alex Park</span> 
              <span className="text-gray-100 mx-2  tracking-widest">•</span>
              <span className="text-gray-100 text-sm font-medium  tracking-widest">8/11/2023</span> 
            </div>
          </div>
        </Link>
      </div>
    ))}
      </div>
    </main>
  );
}