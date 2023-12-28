import { useState } from "react";
import styles from './post.module.css';
import Link from "next/link";
import contentfulService from "../../../../lib/contentfulClient";

const avatar2 = 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const BASE_API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

interface Params {
  postId: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
}

function splitContentIntoParagraphs(content: string): string[] {
  const sentences = content.split(/[.!?]/).filter(sentence => sentence.trim().length > 0);
  const paragraphs: string[] = [];

  const sentenceChunks = 10;
  const totalChunks = Math.ceil(sentences.length / sentenceChunks);

  for (let i = 0; i < totalChunks; i++) {
    const chunk = sentences.slice(i * sentenceChunks, (i + 1) * sentenceChunks);

    // If it's not the last chunk, include periods after sentences
    const paragraph = i < totalChunks - 1 ?
      chunk.join('. ') + '.' :
      chunk.join('. ');

    paragraphs.push(paragraph);
  }

  return paragraphs;
}
export default async function BlogPost({ params }: { params: Params }) {
  // const post = await getPost(params.postId);
  const blogsPerPage = 6;
  const blog = await contentfulService.getBlogPostById(params.postId);
  const allBlogs = await contentfulService.getAllBlogs(1, blogsPerPage);

  const randomStartIndex = Math.floor(Math.random() * (allBlogs.length - 3));
  const suggestedBlogs = allBlogs.slice(randomStartIndex, randomStartIndex + 3);



  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const paragraphs = splitContentIntoParagraphs(blog.content);

  return (
    <div className={styles.main}>

      <div className={styles.headerContainer}>

        <h1 className={styles.title}>
          <span className="text-green-800"></span> {blog?.title}
        </h1>

        <div className={styles.userInfo}>
          <Link href={'/user/id'}>
            <h2 className={styles.cardInfo}>{blog.author}</h2>
          </Link>
          <span className={styles.date}>• {formatDate(blog.datePosted)}</span>
        </div>

      </div>

      <div className={styles.contentContainer}>

        <div className={styles.imageContainer}>
          <img src={blog.thumbnail} className={styles.postImage}></img>
        </div>

        {/* <p className="text-xl p-10 leading-8">{blog.content}</p> */}
        <div className="text-xl p-10 leading-8">
          {paragraphs.map((paragraph, index) => (
            <div key={index} className={`mb-6 ${index !== 0 ? 'mt-6' : ''}`}>
              {paragraph}
            </div>
          ))}
        </div>

        <div className={styles.aboutContainer}>
          <div className={styles.avatar}>
            <img src={blog.avatar} alt="Avatar" />
         </div>

        <div className={styles.aboutInfo}>
           <Link href={'/user/id'}>
            <h2 className={styles.cardInfo}>{blog.author}</h2>
            </Link>
            <p>Status: Online</p>
            <p>Joined: 07/11/2023</p>
            <p>Country: USA</p>
            <p>About: fitness, hiking, travelling!</p>
        </div>
        </div>
        
        <h1 className="flex justify-center text-3xl py-4 text-[#04371E]">Suggested blogs:</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:px-8 lg:px-10 py-4">
          {suggestedBlogs.map((suggestedBlog) => (
          <div key={suggestedBlog.id} className={`relative col-span-3 md:col-span-1`}>
            <Link href={`${suggestedBlog.id}`}>
              <div
                className={`${styles.blogCardItemSuggested} h-80 md:h-96 lg:h-80 p-4 border border-gray-300 rounded relative hover:opacity-80`}
                style={{
                  backgroundImage: `url(${suggestedBlog.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className={`${styles.cardTextSuggested} text-xl md:text-xl lg:text-xl xl:text-2xl font-semibold capitalize`}>
                  {suggestedBlog.title}
                </span>
                
                <div className={`${styles.authorInfo} absolute bottom-4 left-4 w-full flex items-center p-2`}>
                  <div className={`${styles.avatarSuggested} w-4 h-4 rounded-full mr-4`} 
                    style={{
                      backgroundImage: `url(${suggestedBlog.avatar})`,  
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}>
                  </div> 
                  <p className={styles.cardInfoSuggested}>{suggestedBlog.author} • {formatDate(suggestedBlog.datePosted)}</p>
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