import pool from "../db/database.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import createViewPath from "../db/createViewPath.js";
 

export const loginForm = async (req, res) => {
    try {
        const { email, password } = req.body;
        const results = await pool.query("SELECT email, password FROM users WHERE email = $1", [email]);
        
        const validPassword = await bcrypt.compare(password, results.rows[0].password);
        if (results.rows[0].email === email &&  validPassword) {
           
            return res.render(createViewPath('books'), 
            { article : "Books Page"});
        };
       
        if (!validPassword) return res.status(400).json({ status: "Incorrect password" });
    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
};

export const registerForm = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const checkData = Joi.object({
            name: Joi.string().min(4).required(),
            email: Joi.required(),
            password: Joi.string().min(6).required()
        });
        let { error, value } = checkData.validate({ name, email, password });
        console.log(error, value)
        
        if (error) return res.status(400).json({message : "Ma'lumotlarni to'g'ri kiriting" });

        const check = await pool.query("SELECT email, password FROM users WHERE email = $1", [value.email]);
        if (check.rows){
            const unhashedPassword = await bcrypt.compare(check.rows.email, 10);
            if (check.rows[0].email === value.email && value.password === unhashedPassword) {
                return res.render(createViewPath('books'), { article : "Books Page"});
            }; 
        }
       
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const a = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
        const result = await pool.query(a, [value.name, value.email, value.password]);
        res.render(createViewPath('books'), { article : "Books Page"});
    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
};