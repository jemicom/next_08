'use server'
import { redirect  } from "next/navigation";
import Link from "next/link";
import React from 'react'
import DeleteBtn from "../components/DeleteBtn"; 

// src/app/board/[id]/page.js
// localhost:3002/app/board/[id]
// localhost:3002/app/board/1
// localhost:3002/app/board/2
const fetchIdHandle = async (id) => { 
  const response = await fetch(`https://next-07-inky.vercel.app/api/board/${id}`);
  const data = await response.json();
  return data;
};

const BoardId = async({params}) => {
  const { id } = params;
  const board = await fetchIdHandle(id);
  
  // 자세히 보기가 아닌경우
  if( board.length > 1 ){
    redirect('/board')
  }

  return (
    <div>
        <h1>BoardId {params.id}</h1>
        <p>{board.title}</p>   
        <p>{board.body}</p>   
        <p>{board.createAt}</p>   
        <DeleteBtn board={board}  /> 
        <Link href={`/board/${board.id}/edit`}>수정</Link> 
    </div>
  )
}

export default BoardId 

 

 