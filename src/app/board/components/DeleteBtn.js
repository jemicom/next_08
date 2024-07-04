'use client'
import { redirect, useRouter } from "next/navigation";
const DeleteBtn = ({ board  }) => {
    const router = useRouter();

    const deleteHandle = (id) => {
        fetch(`https://next-08.vercel.app/api/board/${id}`, {
            method: 'DELETE',
        }).then(res=>res.json())
        .then(res=>{
            console.log('delete');
            return router.push('https://next-08.vercel.app/api/board')
        })
    };
  return (
    <button onClick={() => { deleteHandle(board.id) }}> delete </button>
  )
}

export default DeleteBtn