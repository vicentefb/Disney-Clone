import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";
import NavBar from "../components/NavBar";
import Link from "next/Link";
import Image from "next/image";
import disneyLogo from "../public/disney-button.png";
import marvelLogo from "../public/marvel-button.png";
import natgeoLogo from "../public/natgeo-button.png";
import pixarLogo from "../public/pixar.png";
import starwarsLogo from "../public/star-wars-button.png";
import Head from "next/head";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_API_TOKEN}`,
    },
  });

  const videosQuery = gql`
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

  const accountQuery = gql`
    query {
      account(where: { id: "ckx6ro4agfd2j0b72ez7znunk" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;

  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};

export default function Home({ videos, account }) {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };

  return (
    <>
      <Head>
        <title>Disney+ Clone</title>
        <meta name="description" content="Disney+ Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar account={account} />
      <div className="app">
        <div className="main-video">
          <Image
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
            width="100%"
            height="100%"
            layout="responsive"
          />
        </div>
        {/*<div className="video-feed">
          <Link href="#disney">
            <div className="franchise" id="disney">
              <Image src={disneyLogo} alt="" />
            </div>
          </Link>

          <Link href="#pixar">
            <div className="franchise" id="pixar">
              <Image src={pixarLogo} alt="" />
            </div>
          </Link>

          <Link href="#star-wars">
            <div className="franchise" id="star-wars">
              <Image src={starwarsLogo} alt="" />
            </div>
          </Link>

          <Link href="#nat-geo">
            <div className="franchise" id="nat-geo">
              <Image src={natgeoLogo} alt="" />
            </div>
          </Link>

          <Link href="#marvel">
            <div className="franchise" id="marvel">
              <Image src={marvelLogo} alt="" />
            </div>
          </Link>
  </div>*/}
        <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
        <Section genre={"Family"} videos={filterVideos(videos, "family")} />
        <Section genre={"Thriller"} videos={filterVideos(videos, "thriller")} />
        <Section genre={"Classic"} videos={filterVideos(videos, "classic")} />
        <Section
          id="pixar"
          genre={"Pixar"}
          videos={filterVideos(videos, "pixar")}
        />
        <Section
          id="marvel"
          genre={"Marvel"}
          videos={filterVideos(videos, "marvel")}
        />
        <Section
          id="nat-geo"
          genre={"National Geographic"}
          videos={filterVideos(videos, "national-geographic")}
        />
        <Section
          id="disney"
          genre={"Disney"}
          videos={filterVideos(videos, "disney")}
        />
        <Section
          id="start-wars"
          genre={"Star Wars"}
          videos={filterVideos(videos, "star-wars")}
        />
      </div>
    </>
  );
}
