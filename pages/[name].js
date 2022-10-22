import Tweets from "components/Tweets";
import { getUserTweets } from "lib/data";
import prisma from "lib/prisma";

export default function UserProfile({ name, tweets }) {
  return (
    <>
      <p>User profile of { name }</p>
      <Tweets tweets={ tweets }/>
    </>
  );
};

export async function getServerSideProps({ params }) {
  let tweets = await getUserTweets(params.name, prisma);
  tweets = JSON.parse(JSON.stringify(tweets));
    
  return {
    props: {
      name: params.name,
      tweets
    }
  }
}
