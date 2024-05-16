import { Router } from "express";
import { loginForm, registerForm} from "../controllers/auth.controller.js";
import createViewPath from "../db/createViewPath.js";

const router = Router()

router.post("/register", registerForm)

router.post("/login", loginForm)


router.get("/", (req, res) => {
    res.render(createViewPath('index'), { article : "Home Page"})
});

router.get("/register", (req, res) => {
    res.render(createViewPath('register'), { article : "Register Page"})
});

router.get("/login", (req, res) => {
    res.render(createViewPath('login'), { article : "Login Page"})
});

export default router;