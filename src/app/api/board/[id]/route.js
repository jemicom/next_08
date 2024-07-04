// localhost:3002/api/board/:id
// 다이나믹 파라미터처리

import { redirect } from "next/navigation";
import { board } from "../data"
// 새로운 board 를 읽어오지 않으므로 기존 데이터를 그대로 출력함 
// const { board } = fs.readFileSync('../data.js')

// 파라미터 사용법이 React와 같음 
// 1
// export async function GET( request , {params}) {
    
//   const findId = board.find(
//     (item) => item.id === parseInt(params.id)
//   );
//   return Response.json(findId);
// }


// 2. 파라미터 id를 찾을 수 없으면 redirect
// localhost:3000/api/api/1
// localhost:3000/api/api/3
// localhost:3000/api/api/3
// localhost:3000/api/api/300  : redirect
// localhost:3000/api/api/1?query=first
export async function GET( request , { params } ) {
  
  console.log( params ) 

  // 호출한 id가 전체 length 보다 크면  redirect

  // 리다렉트가 되는 것 같음
  // if (parseInt(params.id) > board.length) {
  //   redirect("/api/board");
  //   // 같은 backend로 route
  // }
  const findId = board.find(
    (item) => item.id ===  params.id 
  );
  return Response.json(findId);
}

import fs from 'fs';
import path from 'path'; 
// id는 params로 수정내용은 body로 가져오기 
export async function PUT( request, {params}) {
   try{
      const body = await request.json();  
      // console.log('body', body)
      const index = board.findIndex(
        // (item) => item.id === parseInt(params.id)
        (item) => item.id === params.id 
      );
    
      // // 이과정은 파일에 쓴 것은 아님 
      // board[index] = body;
      const deleteBoard = board.splice(index, 1, body)
      console.log("deleteBoard",deleteBoard)
      console.log("board", board)
    
      // // 파일에 쓰기
      // // process.cwd() 현재 경로
      const filePath = path.join(process.cwd(), 'src/app/api/board', '/data.js');
      fs.writeFileSync( filePath, `export const board = ${JSON.stringify(board, null, 3)}`, 'utf8');
       
      redirect("/api/board");
   }catch(err){
      // return Response.status(500)
      console.log(err)
   }
}

export async function DELETE( request, {params}) {
  try{
    const index = board.findIndex(
      (item) => item.id ===  params.id 
    );
  
  //   const deleted = board[index];
  //   지우데이터를 확인하기 위해 찾음 
  
    const deleted = board.splice(index, 1);
    //  splice는 지운것을 리턴하므로 굳이 찾을 필요 없음 
    console.log( deleted )
  
    // 파일에 쓰기
    // process.cwd() 현재 경로
    const filePath = path.join(process.cwd(), 'src/app/api/board', '/data.js');
    fs.writeFileSync( filePath, `export const board = ${JSON.stringify(board, null, 3)}`, 'utf8');
    
  
    // return Response.json( deleted );/
    return new Response(null, {
      status: 302,
      headers: {
        // Location: '/board',
        Location: 'https://next-08.vercel.app/board/',
      },
    });
  }catch(err){
    
    return new Response(null, {
      status: 302,
      headers: {
        // Location: '/board',
        Location: 'https://next-08.vercel.app/board/',
      },
    });
  }
}