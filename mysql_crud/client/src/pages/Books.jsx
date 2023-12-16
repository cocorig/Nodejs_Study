import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);
  // 모든 책 받아오기
  useEffect(() => {
    const AllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log("책 가져오기 실패");
      }
    };
    AllBooks();
  }, []);

  // 삭제요청 보내기
  const handelBookDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.log("삭제 실패");
    }
  };

  console.log(books);
  return (
    <main>
      <ul className="BookList">
        {books.map((book) => (
          <li className="bookItem" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <div className="BtnGroup">
              <button
                className="delete"
                onClick={() => handelBookDelete(book.id)}
              >
                삭제
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>수정</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button>
        <Link to="add">책 추가하기</Link>
      </button>
    </main>
  );
};

export default Books;

//localhost/:1 Access to XMLHttpRequest at 'http://localhost:8800/books' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.  -> 백엔드에서 npm i cors 설치
