import { useState } from "react";
import styles from './post.module.css';
import Link from "next/link";
const imageUrl1 = 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const imageUrl2 = 'https://plus.unsplash.com/premium_photo-1663054480506-583f20275a34?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  
const imageUrl3 = 'https://plus.unsplash.com/premium_photo-1680102981920-cbdc911b7556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const avatar1 = 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const avatar2 = 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
import contentfulService from "../../../../lib/contentfulClient";


interface Params {
  postId: string;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
  username: string;
}

// Create an object adhering to the Post interface
const post: Posts = {
  userId: 1,
  id: 1,
  title: 'Sample Title',
  body: 'This is a sample body for the post.',
  username: 'John Doe',
};

const suggestedPosts: Posts[] = [
  {
    userId: 2,
    id: 2,
    title: 'Suggested Post 1',
    body: 'This is the body of suggested post 1.',
    username: 'Jane Smith',
  },
  {
    userId: 3,
    id: 3,
    title: 'Suggested Post 2',
    body: 'This is the body of suggested post 2.',
    username: 'Alice Johnson',
  },
  {
    userId: 4,
    id: 4,
    title: 'Suggested Post 3',
    body: 'This is the body of suggested post 3.',
    username: 'Bob Williams',
  },
];

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

// const getPost = async (id: string): Promise<Post> => {
//   const data = await fetch(`${BASE_API_URL}/posts/${id}`);
//   return data.json();
// };



export default async function BlogPost({ params }: { params: Params }) {
  // const post = await getPost(params.postId);

  return (
    <div className={styles.main}>

      <div className={styles.headerContainer}>

        <h1 className={styles.title}>
          <span className="text-green-800">Post {post.id}:</span> {post.title}
        </h1>

        <div className={styles.userInfo}>
          <Link href={'/user/id'}>
            <h2 className={styles.cardInfo}>Jessica Park</h2>
          </Link>
          <span className={styles.date}>• 8/11/2023</span>
        </div>

      </div>

      <div className={styles.contentContainer}>

        <div className={styles.imageContainer}>
          <img src={imageUrl1} className={styles.postImage}></img>
        </div>

        <p className="text-xl p-10">{post.body}</p>

        <div className={styles.aboutContainer}>
          <div className={styles.avatar}>
            <img src={avatar1} alt="Avatar" />
         </div>

        <div className={styles.aboutInfo}>
           <Link href={'/user/id'}>
            <h2 className={styles.cardInfo}>Jessica Park</h2>
            </Link>
            <p>Status: Online</p>
            <p>Joined: 07/11/2023</p>
            <p>Country: South Korea</p>
            <p>About: fitness, hiking, travelling!</p>
        </div>
        </div>
        
        <h1 className="flex justify-center text-3xl py-4 text-[#04371E]">Suggested blogs:</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-8 lg:px-24 py-4">
          {suggestedPosts.map((suggestedPost, index) => (
          <div key={suggestedPost.id} className={`relative col-span-3 md:col-span-1`}>
            <Link href={`${suggestedPost.id}`}>
              <div
                className={`${styles.blogCardItemSuggested} h-80 md:h-96 lg:h-80 p-4 border border-gray-300 rounded relative hover:opacity-80`}
                style={{
                  backgroundImage: index === 0 ? `url(${imageUrl2})` : `url(${index % 2 === 0 ? imageUrl2 : imageUrl3})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className={`${styles.cardTextSuggested} text-xl md:text-xl lg:text-xl xl:text-3xl font-semibold capitalize`}>
                  {suggestedPost.title}
                </span>
                
                <div className={`${styles.authorInfo} absolute bottom-4 left-4 w-full flex items-center p-2`}>
                  <div className={`${styles.avatarSuggested} w-4 h-4 rounded-full mr-4`} 
                    style={{
                      backgroundImage: `url(${avatar1})`,  
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}>
                  </div> 
                  <p className={styles.cardInfoSuggested}>{suggestedPost.username} • 8/11/2023</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      
        <div className={styles.commentContainer}>
          <div>
            <input
              type="text"
              placeholder="Write a comment..."
              className={styles.commentInput}
            />
          <Link href={'/comment'}>  
            <button><p>Add Comment</p></button>
          </Link>      
          </div>
        </div>

        <div className={styles.commentsContainer}>
          <div className={styles.commentAvatar}>
            <img src={avatar2} alt="Avatar" />
         </div>

        <div className={styles.aboutInfo}>
           <Link href={'/user/id'}>
            <h2 className={styles.cardInfoComment}>Toni Marrone</h2>
            </Link>
            <p className="py-2 text-gray-400">3 hrs ago</p>
            <p>Inspiring post! I used to travel solo when I was younger but now I always travel with my family. Packing is tough though...</p>
        </div>
      </div>

       </div>

      </div>
  );
}