'use server'
import {updatePost}  from "../../../api/board/lib/board-action"
import { redirect } from "next/navigation";
 
const fetchIdHandle = async (id) => { 
  const response = await fetch(`http://localhost:3000/api/board/${id}`);
  const data = await response.json();
  return data;
};
 
const Editform = async ({params}) => {
  const { id } = params;
  const board = await fetchIdHandle(id); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const data = {
    //   title: formData.get("title"),
    //   body: formData.get("body"),
    // };

    try {
      // await updatePost(id, data);
      await updatePost(formData);
      redirect("/board"); // 메인 게시판 페이지로 리디렉션
      // router.push('/board')
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <form  action={ updatePost }>
      {/* <form onSubmit={handleSubmit}> */}
        <input type="text" readOnly name="id" value={board.id}/>
        <input type="text" placeholder={board.title} name="title" />
        <input type="text" placeholder={board.body} name="body"  /> 
        <button>저장</button>
      </form>
    </div>
  )
}

export default Editform