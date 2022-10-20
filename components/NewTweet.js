import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function NewTweet() {
  const [content, setContent] = useState('');
  const { data: session, status } = useSession();

  const handleContent = event => {
    setContent(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (!content) {
      alert('No Content');
      return;
    }

    fetch('/api/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content
      })
    });
  }

  if (!session || !session.user)
    return null;

  return (
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
            <textarea 
              className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary'
              name="content" 
              cols={50} 
              rows={2}
              placeholder="What's Happening?"
              onChange={handleContent}
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex-1 mb-5">
            <button className='border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full'>
              Tweet
            </button>
          </div>
        </div>
      </form>
  );
};
