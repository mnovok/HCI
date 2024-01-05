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

const getPaginatedBlogsQuery = `
query GetBlogPosts($skip: Int, $limit: Int) {
  blogPostCollection(skip: $skip, limit: $limit) {
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

const gqlAllBlogsQuery = `
  query blogPostsList {
    blogPostCollection(order: datePosted_DESC){
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

const getTotalBlogPostsNumberQuery = `
  query GetTotalBlogPostsNumber {
    blogPostCollection {
    total
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

interface TypeDestinationListItem {
  id: string;
  title: string;
  country: string;
  thumbnail: string;
  continent: string;
  contentBody: {
    nodeType: any;
    data: any;
    content: [];
  };
}

const gqlAllDestinationsQuery = `query destinationPostsList {
  destinationPostCollection {
    items {
      sys {
        id
      }
      title
      country
      continent
      image {
        url
      }
      body {
        json
      }
    }
  }
}`;

const getDestinationById = `
  query getDestinationPostById($destinationId: String!) {
    destinationPost(id: $destinationId) {
      sys {
        id
      }
      title
      country
      continent
      image {
        url
      }
      body {
        json
      }
    }
  }
`;

interface DestinationCollectionResponse {
  destinationPostCollection: {
      items: DestinationItem[];
    };
}

interface DestinationItem {
  sys: {
    id: string;
  };
  title: string;
  country: string;
  thumbnail: {
    url: string;
  };
  continent: string;
  contentBody: {
    json: {
    }
  }
}

  const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

  const getAllBlogs = async (page: number, pageSize: number): Promise<TypeBlogListItem[]> => {
    try {
      const skip = (page - 1) * pageSize;
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: gqlAllBlogsQuery,
          variables: {
            _page: page,
            _limit: pageSize,
          },
        }),
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
  
      console.log(`Fetched blogs for page ${page}:`, blogs);
      return blogs;
    } catch (error) {
      console.error("Error fetching blogs:", error);
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

  const getTotalBlogPostsNumber = async (): Promise<number> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: getTotalBlogPostsNumberQuery,
        }),
      });

      const responseBody = await response.json();

      if (!response.ok || !responseBody.data || !responseBody.data.blogPostCollection) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const total = responseBody.data.blogPostCollection.total;

      console.log("Total number of blog posts:", total);
      return total;
    } catch (error) {
      console.error("Error fetching total number of blog posts:", error);
      return 0;
    }
  };


const getAllDestinations = async (): Promise<TypeDestinationListItem[]> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: gqlAllDestinationsQuery }),
    });

    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const body = responseBody.data;

    if (!body?.destinationPostCollection?.items) {
      throw new Error("No items found in the response");
    }

    const destinations: TypeDestinationListItem[] = body.destinationPostCollection.items.map((item: any) => ({
      id: item.sys.id,
      title: item.title,
      country: item.country,
      thumbnail: item.image.url,
      contentBody: item.body.json,
      continent: item.continent,
    }));

   console.log("Destinations fetched:", destinations);
    return destinations;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const getDestinationPostById = async (destinationId: string): Promise<TypeDestinationListItem | null> => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: getDestinationById, 
        variables: { destinationId }, 
      }),
    });

    const body = await response.json();
    if (body.errors) {
      throw new Error(body.errors[0].message);
    }
    const destinationPost = body.data.destinationPost;

    const formattedDestinationPost: TypeDestinationListItem = {
      id: destinationPost.sys.id,
      title: destinationPost.title,
      country: destinationPost.country,
      continent: destinationPost.continent,
      thumbnail: destinationPost.image.url,
      contentBody: destinationPost.body.json,
    };

    return formattedDestinationPost;
  } catch (error) {
    console.error('Error fetching destination post:', error);
    return null;
  }
}
  
const contentfulService = {
    getAllBlogs,
    getBlogPostById,
    getTotalBlogPostsNumber,
    getAllDestinations,
    getDestinationPostById,
  };
  
export default contentfulService;

