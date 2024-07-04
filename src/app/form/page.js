 
import { addPost, deletePost, updatePost, getPosts} from "./form-action"
 
// update, list 추가할 것 
const ServerAction =  async () => {

  const actionInComponent = async ()=>{
    "use server"
    console.log("it works!")
  }

  const posts = await getPosts();
  return (
    <div>

    <div>
        {
          posts?.map(post=><h1 key={post.title}>{post.title}</h1>)
        }
      </div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title"/>
        <input type="text" placeholder="desc" name="desc"/>
        <input type="text" placeholder="blog" name="blog"/>
        <input type="text" placeholder="userId" name="userId"/>
        <button>Create</button>
      </form>

      <form action={deletePost}>
        <input type="text" placeholder="postId" name="id" />
        <button>Delete</button>
      </form>

      <form action={updatePost}>
        <input type="text" placeholder="title" name="title"/>
        <input type="text" placeholder="desc" name="desc"/>
        <input type="text" placeholder="blog" name="blog"/>
        <input type="text" placeholder="userId" name="userId"/>
        <button>Update</button>
      </form>
      
    </div>
  )
}

export default ServerAction