import NewReply from "components/NewReply";
import Tweet from "components/Tweet";
import Tweets from "components/Tweets";
import { getReplies, getTweet } from "lib/data";
import prisma from "lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SingleTweet({ tweet, replies }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parent_data.author.name}/status/${tweet.parent}`);
  }

  const handleDelete = async () => {
    const res = await fetch('/api/tweet', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tweet.id })
    });

    if (res.status === 401) {
      alert('Unathorized');
    }

    if (res.status === 200) {
      router.push('/home');
    }
  }

  return (
    <div>
      <Tweet tweet={ tweet }/>

      {session && session.user.email === tweet.author.email && (
        <div className='flex-1 py-2 m-2 text-center'>
          {/*
            Note: In the project, the delete button is an anchor tag.
            I changed it to be a button based on the belief that 
            even though it's taking us to a page, it's primary 
            duty is performing an action. Therefore, it needs 
            to be a button.
          */}
          <button
            className='flex items-center w-12 px-3 py-2 mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      )}
      <NewReply tweet={ tweet }/>
      <Tweets tweets={ replies } nolink={ true }/>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let replies = await getReplies(params.id, prisma);
  replies = JSON.parse(JSON.stringify(replies));

  return {
    props: {
      tweet,
      replies
    }
  }
}