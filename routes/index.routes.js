import { Router } from "express";
import authRouter from "./auth.routes.js";
import booksRouter from "./books.routes.js";


const router = Router()

router.use("/", authRouter);
router.use("/", booksRouter);


export default router;