import { useRouter } from "next/router";
import { useState } from "react";

export default function NewReply({ tweet }) {
  const [reply, setReply] = useState('');
  const router = useRouter();

  const handleChange = event => {
    setReply(event.target.value);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!reply) {
      alert('Enter a reply');
      return;
    }

    const res = await fetch('/api/tweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent: tweet.id,
        content: reply
      })
    });

    router.reload(window.location.pathname);
  }

  return (
    <form
      className='flex ml-2'
      onSubmit={handleSubmit}
    >
      <textarea 
        className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary'
        rows={1}
        cols={50}
        placeholder='Tweet your reply'
        onChange={handleChange}
      />
      <div className='flex'>
        <div className='flex-1 mb-5'>
          <button className='border float-right ml-2 px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover'>
            Reply
          </button>
        </div>
      </div>
    </form>
  );
};
