import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();
  const handleBookPlus = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 벡앤드로 추가한 정보 보내기
  const onhandelPlus = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      // 추가하고 책 페이지로 이동
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(book);
  return (
    <div className="form">
      책을 추가하는 페이지
      <input
        type="text"
        placeholder="title.."
        name="title"
        onChange={handleBookPlus}
      />
      <input
        type="text"
        placeholder="desc.."
        name="desc"
        onChange={handleBookPlus}
      />
      <input
        type="text"
        placeholder="cover.."
        name="cover"
        onChange={handleBookPlus}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleBookPlus}
      />
      <button onClick={onhandelPlus}>추가하기</button>
    </div>
  );
};

export default Add;
