import Tweet from "./Tweet";

export default function Tweets({ tweets, nolink }) {
  if (!tweets) return null;

  return (
    <>
      {tweets.map(tweet => {
        return <Tweet key={tweet.id} tweet={tweet} nolink={true}/>
      })}
    </>
  );
};
