import { redirect } from "next/navigation";
import { board } from './data'
// 새로운 board 를 읽어오지 않으므로 기존 데이터를 그대로 출력함 

// let board = [];
// const filePath = path.join(process.cwd(), 'src/app/api/board', 'data.js');
// if (fs.existsSync(filePath)) {
//   // data.js 파일이 존재하면 board 배열 초기화
//   const { board } = require('./data');
//   board = boardData;
// }


// 파라미터 사용법이 React와 같음 
// 1
// export async function GET() {
//   return Response.json(board);
// }


//localhost:3002/api/board?query=second
export async function GET(request, { params } ) {
  // params를 사용할 수 없을 때 
  // params : undefind 
  // 라우트를 자동 인식하므로 파라미터도 자동 인식됨 
  const searchParams = request.nextUrl.searchParams;
  //
  console.log( params,   searchParams )
  const query = searchParams.get("query");
  const filtered = query
    ? board.filter((item) => item.title.includes(query))
    : board;

    console.log( filtered )
  return Response.json(filtered );
  // return Response.json(searchParams);
}


import fs from 'fs'
import path from 'path'
//  post : localhost:3000/api/board
// 그러나 get test하면 목록이 늘어나는 것을 확인할 수 있음 
 
// pages/api/addPost.js
export async function POST(request) {
  try {
     const formData = await request.formData();
    // console.log(formData )
    // const { title, body } = Object.fromEntries(formData);

    const newPost = {
      // id : `${ board[board.length].id + 1}`, 
      id : "30", 
      title : formData.get('title'),
      body : formData.get('body'),
    }
    console.log('server post', newPost)
    board.push(newPost);

    const filePath = path.join(process.cwd(), 'src/app/api/board', 'data.js');
    // 파일에 쓰기
    fs.writeFileSync( filePath, `export const board = ${JSON.stringify(board, null, 3)}`, 'utf8');

    // 여기서 데이터베이스 저장 등 추가 작업을 수행할 수 있습니다.

    // 리디렉션 응답 반환
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/board',
      },
    });
  } catch (error) {
    console.error("Error processing form data:", error);

    // 에러 응답 반환
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}