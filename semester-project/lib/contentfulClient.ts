import { TypeBlogListItem } from "../src/app/(contentful)/types/TypeBlog";

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
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
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
  
  const contentfulService = {
    getAllBlogs,
  };
  
  export default contentfulService;

