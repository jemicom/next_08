'use client'
import React from 'react'
import './Pagenation.css'

const active = {
  background: "black",
  color: "white",
};

const Pagenation = ({ length, pagePerCount, setCurrentPage, currentPage }) => {
  const pageNumbers = []; // 총 페이지 번호

  for (let i = 1; i <= Math.ceil(length / pagePerCount); i++) {
    //   for (let i = 1; i <= Math.ceil(105 / 20); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      {(pageNumbers.join(",").toString(), length)}
      {/* <h2>Pagenation</h2> */}
      <div className="pagenation-container">
        <button
          className="prevBtn"
          style={
            currentPage === pageNumbers[0]
              ? { display: "none" }
              : { display: "inline" }
          }
          //   onClick={() => setCurrentPage((prev) => prev - 1)}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        {pageNumbers.map((item) => (
          <button
            key={item}
            onClick={() => setCurrentPage(item)}
            style={item === currentPage ? active : null}
          >
            {item}
          </button>
        ))}

        <button
          className="nextBtn"
          style={
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? { display: "none" }
              : { display: "inline" }
          }
          //   onClick={() => setCurrentPage((prev) => prev + 1)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Pagenation;

/*
    전체 item 개수 : 101~109/20 = 10.09 = 11
    현재 화면에 표시할 개수 
    현재 사용하는 pager
    <div>Pagenation {pageNumbers.join(",").toString()}</div>
*/
