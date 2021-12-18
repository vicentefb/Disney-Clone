import { GraphQLClient } from "graphql-request";

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({ body }, res) => {
  const url = process.env.ENDPOINT;
  const graphcms = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_API_TOKEN}`,
    },
  });
  // writing a mutation to update the seen value
  await graphcms.request(
    `
      mutation($slug: String!) {
        updateVideo(where:
          {slug: $slug}, 
          data:{seen:false}
        
        ) {
          id,
          title,
          seen
        }
      }
      `,
    { slug: body.slug }
  );

  // mutation to publish the video
  await graphcms.request(
    `mutation publishVideo($slug: String){
        publishVideo(where: {slug: $slug}, to: PUBLISHED){
            slug
        }
    }`,
    { slug: body.slug }
  );

  res.status(201).json({ slug: body.slug });
};
