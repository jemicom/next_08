// export const addPost = async (formData) => {
//     "use server";

//     console.log('hello server')
//     // const title = formData.get("title");
//     // const desc = formData.get("desc");
//     // const blog = formData.get("blog");
  
//     const { title, desc, blog, userId } = Object.fromEntries(formData);
//     // Object.formEntries()
//     // Object.Entries() 아님에 유의 
  
//      console.log(title, desc, blog, userId   )
//   };
  

"use server";
 

const myData = []

// export const getPost = async () => { 
//   try {
     
//     return myData;
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };
export const getPosts = async () => {
  return myData;
};
// create Post
export const addPost = async ( formData) => { 

  const { title, desc, blog, userId } = Object.fromEntries(formData);
  try {
     
    const newPost =  {
      id : myData.length + 1,
      title,
      desc,
      blog,
      userId,
    } ;
 
    myData.push( newPost )
    console.log("saved to db", newPost);
    console.log("length", myData);
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {

    const index = myData.findIndex(item=>item.id === +id)
    const delData = myData.splice(index, 1)
    console.log("deleted from db", delData); 
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updatePost = async (formData) => { 
  const { id, title, desc, blog, userId } = Object.fromEntries(formData);
  try {
    const updatePost = { id, title, desc, blog, userId }
    const index = myData.findIndex(item=>item.id === +id)
    myData.splice(index, 1, updatePost )
    console.log("updated from db", updatePost); 
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// export const addUser = async (prevState,formData) => {
//   const { username, email, password, img } = Object.fromEntries(formData);

//   try {
//     connectToDb();
//     const newUser = new User({
//       username,
//       email,
//       password,
//       img,
//     });

//     await newUser.save();
//     console.log("saved to db");
//     revalidatePath("/admin");
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };

// export const deleteUser = async (formData) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDb();

//     await Post.deleteMany({ userId: id });
//     await User.findByIdAndDelete(id);
//     console.log("deleted from db");
//     revalidatePath("/admin");
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };

// export const handleGithubLogin = async () => {
//   "use server";
//   await signIn("github");
// };

// export const handleLogout = async () => {
//   "use server";
//   await signOut();
// };

// export const register = async (previousState, formData) => {
//   const { username, email, password, img, passwordRepeat } =
//     Object.fromEntries(formData);

//   if (password !== passwordRepeat) {
//     return { error: "Passwords do not match" };
//   }

//   try {
//     connectToDb();

//     const user = await User.findOne({ username });

//     if (user) {
//       return { error: "Username already exists" };
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       img,
//     });

//     await newUser.save();
//     console.log("saved to db");

//     return { success: true };
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };

// export const login = async (prevState, formData) => {
//   const { username, password } = Object.fromEntries(formData);

//   try {
//     await signIn("credentials", { username, password });
//   } catch (err) {
//     console.log(err);

//     if (err.message.includes("CredentialsSignin")) {
//       return { error: "Invalid username or password" };
//     }
//     throw err;
//   }
// };