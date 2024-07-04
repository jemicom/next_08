'use client'
import React, {useState, useEffect} from 'react' 
import { useSearchParams , useRouter } from 'next/navigation'; 


// src/app/board/page.js
// http://localhost:3000/board?query=first
const Board = () => {
  const searchParams = useSearchParams(); 
  const query = searchParams.get('query') || '';

  const [ board, setBoard ] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const router = useRouter(); 

  useEffect(()=>{
    fetch('https://next-08-8maiduwyc-jemicoms-projects.vercel.app/api/board')
        .then(res=>res.json())
        .then(res=>{
            // console.log('res', res); 
            setBoard(res)
            setFilteredPosts(res)//
        })
  }, []) 

  useEffect(() => {
    // 검색어에 따라 게시물을 필터링합니다.
    const results = board.filter(
      post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, board]);

   
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // router.push(`/board?query=${event.target.value}`);
  };

  useEffect(()=>{
     
    fetch(`https://next-08-8maiduwyc-jemicoms-projects.vercel.app/api/board?query=${query}`)
        .then(res=>res.json())
        .then(res=>{
            console.log('res', res); 
            setBoard(res)
        })
  }, [query]) 

  // useEffect(() => {
  //   if (router.query.query) {
  //     setSearchTerm(router.query.query);
  //   }
  // }, [router.query.query]);

  return (
  
    <div>
        <a href="/board?query=css"> css </a>
        <a href="/board?query=test"> test </a>
        <a href="/board?query=java"> java </a>
        <a href="/board"> reset </a>  
        {/* <p onClick={()=>handleClick('first')}>router push first</p>  
        <p onClick={()=>handleClick('second')}>router push second</p>   
        <p onClick={()=>router.push("/board?query=third")}>router push third</p>     */}


        <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearch}
            />
        </div>
        <ul>
          {filteredPosts.map(item => (
            <li key={item.id}>
              <h2><a href={`/board/${item.id}`}> {item.title} </a></h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
        <ul>
          {board.map(item => (
            <li key={item.id}>
              <h2><a href={`/board/${item.id}`}> {item.title} </a></h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
         {/* {
            board.length && board.map(item=><div key={item.id} style={{color:"red"}}>
                     <a href={`/board/${item.id}`}>{item.title} </a>
                  
                </div>
             )
            } 
          */}
    </div>
    
  ) 
}

export default Board 
 