import NotFound404 from "../_components/notFound404/NotFound404";
import { createClient } from "contentful";
import 'dotenv/config';
import React from 'react';

// require('dotenv').config();

// interface blogPost {
//   title: string;
//   content: string;
// }

// export async function getStaticProps(){
//     let client = null;

//     if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_KEY) {
//       client = createClient({
//         space: process.env.CONTENTFUL_SPACE_ID,
//         accessToken: process.env.CONTENTFUL_ACCESS_KEY,
//       });
//     }

//     console.log(client);

//     const res = await client?.getEntries({content_type: 'blogPost'});

//     return{
//       props: {
//         blogPosts: res?.items,
//       }
//     };
// }

//export default function SignUpPage({ blogPost }: { blogPost: blogPost }) {

export default function SignUpPage() {
  // console.log(blogPost);
  
  //   return (
  //       <div>
  //         <h1>hey</h1>
  //       </div>
  //   );

  return (
    <NotFound404/>
  )

}