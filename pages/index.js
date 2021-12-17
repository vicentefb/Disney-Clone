import { gql, GraphQLClient } from "graphql-request";

export const getStaticProps = async () => {
  const url =
    "https://api-us-east-1.graphcms.com/v2/ckx6q2kp55wm201xq1cn127ia/master";
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_API_TOKEN}`,
    },
  });

  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const videos = data.videos;

  return {
    props: {
      videos,
    },
  };
};

export default function Home({ videos }) {
  console.log(videos);
  return <div></div>;
}
