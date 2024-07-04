"use client"
import { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import {updatePost}  from "../../../api/board/lib/board-action" 
 
const Editform =  ({params}) => {
  const router = useRouter();
  const { id } = params; 
  const [board, setBoard] = useState({});
   
  const fetchIdHandle = async (id) => { 
    const response = await fetch(`https://next-08.vercel.app/api/board/${id}`);
    const data = await response.json();
    setBoard( data )
  };

  useEffect( ()=>{
      fetchIdHandle(id); 
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
     
    try { 
      await updatePost(formData);
      router.push('/board')
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      {/* <form  action={ updatePost }> */}
      <form onSubmit={handleSubmit}>
        <input type="text" readOnly name="id" value={board.id}/>
        <input type="text" placeholder={board.title} name="title" />
        <input type="text" placeholder={board.body} name="body"  /> 
        <button>저장</button>
      </form>
    </div>
  )
}

export default Editform