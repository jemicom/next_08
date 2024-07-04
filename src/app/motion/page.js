'use client'
import { useState } from 'react'
import Pagenation from "@/components/Pagenation";

const tailwindConfigJs = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      width:{
        '9/10': '90%', // 사용자 정의 너비 비율 추가
      },
      colors: {
        'theme-red': '#FF6347',    // red
        'theme-green': '#00FF00',  // green
        'theme-blue': '#1E90FF',   // blue
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  }, 
};

`

export default function Home() {

  const [currentPage, setCurrentPage] = useState(3); // 화면에 보여질 페이지
  const [pagePerCount] = useState(15); // 한 화면에 보여질 개수 
  const indexOfLastPost = currentPage * pagePerCount; 
  // 마지막 데이터
  // 현재 페이지 * 보여질 개수 : 1 * 30 = 30번째 
  // 현재 페이지 * 보여질 개수 : 3 * 30 = 90번째 
  const indexOfFirstPost = indexOfLastPost - pagePerCount;
  // 시작번호 = 30번째 - 보여질 개수 
  // 시작번호 = 90번째 - 보여질 개수 

  // const currentCoins = coins.slice(indexOfFirstPost, indexOfLastPost);
  // 전체 coins를 필요한 coins로 자르기, slice(시작 번호,보여질 개수)

  return (
    <div className="h-screen w-full bg-gray-200 sm:bg-blue-200 md:bg-green-200 lg:bg-yellow-200 xl:bg-red-200">
      <h1 className="text-center text-2xl font-bold py-10">반응형 배경색 변경 페이지</h1>
      <p className="text-center">화면 크기에 따라 배경색이 달라집니다.</p>
      <div className="text-center mt-5">
        <ul>
          <li>기본 배경색: Gray</li>
          <li>작은 화면(sm 이상): Blue</li>
          <li>중간 화면(md 이상): Green</li>
          <li>큰 화면(lg 이상): Yellow</li>
          <li>매우 큰 화면(xl 이상): Red</li>
        </ul>
      </div>

      {/* <div className="bg-black m-auto w-9/10 h-5 sm:w-4/5 md:w-[800px] lg:w-[1000px] xl:w-[1200px]"> */}
      {/* <div className="bg-theme-red h-5 m-auto w-9/10 sm:w-4/5"> */}
      <div className="flex justify-center items-center bg-theme-red  m-auto w-9/10 sm:w-4/5
            flex-col sm:flex-row  
      ">
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span> 
      </div>
      <div className="grid grid-cols-1 justify-items-center bg-theme-red  m-auto w-9/10 sm:w-4/5
            justify-center
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
      ">
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span>
          <span className="block w-10 h-10 bg-theme-blue"></span> 
          <span className="block w-10 h-10 bg-theme-blue xl:hidden"></span> 
      </div>

      <Pagenation length={32}  
                pagePerCount={pagePerCount}  
                setCurrentPage={setCurrentPage}  
                currentPage={currentPage}
      />
    </div>
  );
}
