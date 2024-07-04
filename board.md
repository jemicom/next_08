알겠습니다. NextJS 14에서 게시판 CRUD 기능을 구현할 때의 라우트 구조는 다음과 같이 구성할 수 있습니다:

1. **페이지 구성**
   - `pages/board/index.js`: 게시판 메인 페이지
   - `pages/board/[id].js`: 개별 게시물 페이지
   - `pages/board/new.js`: 새 게시물 작성 페이지
   - `pages/board/edit/[id].js`: 게시물 수정 페이지

2. **라우팅 설정**
   - `app/board/route.js`: 게시판 관련 API 라우트 정의
   - `app/board/[id]/route.js`: 개별 게시물 API 라우트 정의

3. **서버 측 로직**
   - `app/board/route.js`:
     - GET: 게시물 목록 조회
     - POST: 새 게시물 작성
   - `app/board/[id]/route.js`:
     - GET: 개별 게시물 조회
     - PATCH: 게시물 수정
     - DELETE: 게시물 삭제

4. **클라이언트 측 컴포넌트**
   - `pages/board/index.js`:
     - 게시물 목록 표시
     - 새 게시물 작성 링크
   - `pages/board/[id].js`:
     - 개별 게시물 표시
     - 수정/삭제 버튼
   - `pages/board/new.js`:
     - 새 게시물 작성 폼
   - `pages/board/edit/[id].js`:
     - 게시물 수정 폼

5. **폼 데이터 처리**
   - 새 게시물 작성, 게시물 수정 시 `FormData` 객체를 사용하여 데이터를 서버로 전송합니다.
   - `pages/board/new.js`, `pages/board/edit/[id].js`에서 `FormData`를 사용하여 폼 데이터를 수집하고 서버 API로 전송합니다.

이와 같은 구조로 NextJS 14에서 게시판 CRUD 기능을 구현할 수 있습니다. 서버 측 로직은 `app/board/route.js`와 `app/board/[id]/route.js`에 정의하고, 클라이언트 측 컴포넌트는 `pages/board` 디렉토리 아래에 구현합니다. 폼 데이터 처리는 `FormData` 객체를 활용하여 수행할 수 있습니다. 
 

```jsx
// 단순히 data 파일을 가져와 표시하기 
import React, { use } from 'react' 
import { board } from '../api/board/data';

// src/app/board/page.js
// localhost:3002/board 
const Board = () => { 
  return (
    <div>
        <h1>Board</h1>
        {
            board.map(item=><div key={item.id}>{item.title}</div>)
        }
     </div>
  )
}

export default Board

```

위코드는 필터링 하려는 순간 csr이 되어야 함 

```jsx
// 파라미터를 사용하는 방법
import { useSearchParams} from 'next/navigation';
..
const searchParams = useSearchParams();
const query = searchParams.get('query');
console.log(query)
```

```jsx
'use client'
import React, {use} from 'react'
import { board } from '../api/board/data';
import { useSearchParams,  useRouter  } from 'next/navigation';
// csr 에서만 사용가능 

// src/app/board/page.js
// localhost:3002/board 
const Board = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  console.log(query)

  const filtered = board.filter(item=>item.title.includes(query)) 
  const router = useRouter();
  const handleClick = (query) => {
     router.push(`/board?query=${query}`);
  };
  return (
    <div>
        <h1>Board</h1>
        <div>
            // Link를 이용한 상호 작용은 되지 않음 error
            <a href="/board?query=first">first</a>
            <a href="/board?query=second">second</a>
            <a href="/board?query=third">third</a>  
            <p onClick={()=>handleClick('first')}>router push first</p>  
            <p onClick={()=>handleClick('second')}>router push second</p>   
            <p onClick={()=>router.push("/board?query=third")}>router push third</p>  
        </div>
        {
            filtered.map(item=><div key={item.id}>{item.title}</div>)
        }
     </div>
  ) 
}

export default Board 
```

# fetch SSR

```jsx 
import React, {use} from 'react' 
const fetchQueryDataHandle = async () => { 
    const response = await fetch(`http://localhost:3002/api/board`);
    const data = await response.json();
    return data;
  };

// src/app/board/page.js
// localhost:3002/board 
const Board = async () => {
  
  const board = await fetchQueryDataHandle();
  // const board = use(fetchQueryDataHandle());
  // await 처리없이 바로 실행할 수 있도록 함 
   
  return (
    <div>
        <h1>Board</h1>
        {
            board.map(item=><div key={item.id}>{item.title}</div>)
        }
     </div>
  ) 
}

export default Board 
```

useClient는 클라이언트 측 컴포넌트에서 사용되는 훅으로, 클라이언트 측에서 실행됩니다. 클라이언트 측에서는 async/await 구문을 사용할 수 없기 때문에 useClient에서도 async 처리가 불가능합니다.

만약 클라이언트 측에서 비동기 작업이 필요한 경우, 다음과 같은 방법을 사용할 수 있습니다:

- useEffect 훅을 사용하여 비동기 작업을 수행합니다.
- Promise 객체를 사용하여 비동기 작업을 처리합니다.
- async/await 구문을 사용하지 않고 .then().catch() 구문을 사용합니다.


# CSR

```jsx
'use client'
import React, {useState, useEffect} from 'react' 
import { useSearchParams } from 'next/navigation';



// src/app/board/page.js
// http://localhost:3002/board?query=first
const Board = () => {
  const searchParams = useSearchParams(); 
  const query = searchParams.get('query') || '';

  const [ board, setBoard ] = useState([])
  
  useEffect(()=>{
    fetch('http://localhost:3002/api/board')
        .then(res=>res.json())
        .then(res=>{
            // console.log('res', res); 
            setBoard(res)
        })
  }, []) 

  const fetchQueryDataHandle = async (query) => { 
      try{
        let response = await fetch(`http://localhost:3002/api/board?query=${query}`);
        const data = await response.json();
        console.log('res', data); 
                
        setBoard(data);
        console.log(board);
  
      }catch(err){
        console.log('data not found')
      }
  };

  useEffect(()=>{
    
    // fetchQueryDataHandle()
     
    fetch(`http://localhost:3002/api/board?query=${query}`)
        .then(res=>res.json())
        .then(res=>{
            console.log('res', res); 
            setBoard(res)
        })
  }, [query]) 

  return (
    <div>
        <a href="/board?query=first">first</a>
        <a href="/board?query=second">second</a>
        <a href="/board?query=third">third</a>  
        {/* <p onClick={()=>handleClick('first')}>router push first</p>  
        <p onClick={()=>handleClick('second')}>router push second</p>   
        <p onClick={()=>router.push("/board?query=third")}>router push third</p>   */}
        {
            board.length && board.map(item=><div key={item.id} style={{color:"red"}}>{item.title}</div>)
        } 
    </div>
    
  ) 
}

export default Board 
 ```