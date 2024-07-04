'use client'
import { redirect, useRouter } from "next/navigation";
const DeleteBtn = ({ board  }) => {
    const router = useRouter();

    const deleteHandle = (id) => {
        fetch(`/api/board/${id}`, {
            method: 'DELETE',
            // body: JSON.stringify( newItem ),
            // headers: {
            //   'Content-type': 'application/json; charset=UTF-8',
            // },
        }).then(res=>res.json())
        .then(res=>{
            console.log('delete');
            router.push('/board')
        })
        // .then(res=>redirect('/board'))
        // client 사용 불가 
    };
  return (
    <button onClick={() => { deleteHandle(board.id) }}> delete </button>
  )
}

export default DeleteBtn