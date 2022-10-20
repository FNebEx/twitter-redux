import NewTweet from 'components/NewTweet';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return <p>loading...</p>;

  return (
    <div>
      { session ? 
        (<>
          <NewTweet />
        </>) :
         <p>You are not logged in 😞</p>
      }
    </div>
  );
};
