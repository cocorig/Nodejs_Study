import express from "express";
import mysql from "mysql2/index.js";
import cors from "cors";
import dbconfig from "./config/database.js";
const db = mysql.createConnection(dbconfig);
const app = express();
app.use(cors());
// 클라이언트를 사용하여 json 파일을 보낼 수 있는 미들웨어
app.use(express.json());

app.get("/", (req, res) => {
  res.json("안녕 ~!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//추가 : 이번엔 세부내용을 보냄 INSERT INTO [table명] ([column명]) VALUES ([값]);
app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title` , `desc` , `cover` , `price`) VALUES (?)";
  const valuse = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [valuse], (err, data) => {
    if (err) return res.json(err);
    return res.json("도서 추가~!");
  });
});

// 삭제  DELETE FROM [table명] WHERE [조건식];
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("도서 삭제~!");
  });
});

// 수정  UPDATE [table명] SET [column명]=[수정할 값] WHERE [조건식];
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE  books SET  `title`= ? , `desc` = ? , `cover` = ? , `price`= ?  WHERE id = ?";

  const valuse = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...valuse, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("도서 수정~!");
  });
});

app.listen(8800, () => {
  console.log(`백엔드 연결~!`);
});
// 저장기능 post, 책장 담기, 좋아요, user id마다
