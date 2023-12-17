// import { TypeBlogListItem } from "../src/app/(contentful)/types/TypeBlog";
interface TypeBlogListItem {
    id: string;
    title: string;
    author: string;
    datePosted: string;
    content: string;
    thumbnail: string;
    avatar: string;
}

const gqlAllBlogsQuery = `
  query blogPostsList {
    blogPostCollection {
      items {
        sys {
          id
        }
        title
        author
        datePosted
        content
        thumbnail {
            url
        }
        avatar {
            url
        }
      }
    }
  }
`;

const getBlogById = `
  query GetBlogPostById($postId: String!) {
    blogPost(id: $postId) {
      sys {
        id
      }
      title
      author
      datePosted
      content
      thumbnail {
        url
      }
      avatar {
        url
      }
    }
  }
`;

interface BlogCollectionResponse {
    blogPostCollection: {
      items: BlogItem[];
    };
  }
  
interface BlogItem {
    sys: {
      id: string;
    };
    title: string;
    author: string;
    datePosted: string;
    content: string;
    thumbnail: {
        url: string;
    };
    avatar: {
        url: string;
    };    
  }

  const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

  const getAllBlogs = async (): Promise<TypeBlogListItem[]> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query: gqlAllBlogsQuery }),
      });

  
      // Log the complete response from the Contentful API
      console.log("Response from Contentful API:", response);
      const responseBody = await response.json();
      console.log("Response Body from Contentful API:", responseBody);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const body = responseBody.data;
  
      if (!body?.blogPostCollection?.items) {
        throw new Error("No items found in the response");
      }
  
      const blogs: TypeBlogListItem[] = body.blogPostCollection.items.map((item: any) => ({
        id: item.sys.id,
        title: item.title,
        author: item.author,
        datePosted: item.datePosted,
        content: item.content,
        thumbnail: item.thumbnail.url,
        avatar: item.avatar.url,
      }));
  
     console.log("Products fetched:", blogs);
      return blogs;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const getBlogPostById = async (postId: string): Promise<TypeBlogListItem | null> => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: getBlogById, // Use the defined query for getting a blog post by ID
          variables: { postId }, // Pass the postId as a variable
        }),
      });
  
      const body = await response.json();
  
      // Check for errors in the response
      if (body.errors) {
        throw new Error(body.errors[0].message);
      }
  
      const blogPost = body.data.blogPost;
  
      const formattedBlogPost: TypeBlogListItem = {
        id: blogPost.sys.id,
        title: blogPost.title,
        author: blogPost.author,
        datePosted: blogPost.datePosted,
        content: blogPost.content,
        thumbnail: blogPost.thumbnail?.url,
        avatar: blogPost.avatar?.url,
      };
  
      return formattedBlogPost;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  };
  
const contentfulService = {
    getAllBlogs,
    getBlogPostById,
  };
  
export default contentfulService;

