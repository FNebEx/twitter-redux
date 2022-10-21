import NewTweet from 'components/NewTweet';
import Tweets from 'components/Tweets';
import { getTweets } from 'lib/data';
import prisma from 'lib/prisma';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home({ tweets }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  if (loading)
    return <p>loading...</p>;

  if (!session)
    router.push('/');

  if (session && !session.user.name) {
    router.push('/setup')
  }

  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets}/>
    </>
  )
};

export async function getServerSideProps() {
  let tweets = await getTweets(prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets
    }
  }
}