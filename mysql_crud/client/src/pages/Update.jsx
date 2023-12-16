import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const handleBookPlus = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onhandelPlus = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(book);
  return (
    <div className="form">
      수정
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
      <button onClick={onhandelPlus}>수정</button>
    </div>
  );
};

export default Update;
