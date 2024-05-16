import { Router } from "express";
import { addBooks, getBook, getAllBooks, getAllBooksSale} from "../controllers/books.controller.js";
import createViewPath from "../db/createViewPath.js";

const router = Router()

router.post("/addBooks", addBooks);

router.get("/books/:id", getBook);

router.get("/books/api", getAllBooks);

router.get("/api/selas", getAllBooksSale);

router.get("/books", (req, res) => {
    res.render(createViewPath('books'), { article : "Books Page"});
});

router.get("/addBooks", (req, res) => {
    res.render(createViewPath('addBooks'), { article : "AddBooks Page"});
});

export default router;