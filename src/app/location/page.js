"use client"
import { useRouter } from 'next/navigation';

const ServerAction = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch('http://localhost:3000/location/api', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // 폼 제출 후 /main 페이지로 리디렉션
      router.push('/form');
    } else {
      console.error('Error submitting form');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" name="title" required />
        <input type="text" placeholder="desc" name="desc" required />
        <input type="text" placeholder="slug" name="slug" required />
        <input type="text" placeholder="userId" name="userId" required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ServerAction;
