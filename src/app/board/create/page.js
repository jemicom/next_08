'use server'
import { addPost } from "@/app/api/board/lib/board-action";
// import { redirect } from "next/navigation";
 
 
const CreatePost = async () => {
   
  return (
    <div>
      {/* <form  action={ createPostHandle }>  */}
      {/* <form  action={ addPost }>   */}
      <form action="/api/board" method="POST">
        <input type="text" placeholder="제목" name="title" />
        <input type="text" placeholder="내용" name="body"  /> 
        <button>등록</button>
      </form>
    </div>
  )
}

export default CreatePost