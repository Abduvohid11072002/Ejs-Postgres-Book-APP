import pool from "../db/database.js";
import Joi from "joi";


export const getAllBooksSale = async (req, res) => {
    /*Bu funksiya registratsiyadan o'tgan userni esales tabledan sotib 
    olgan kitoblarini title  url ni qaytarishi kerak*/
    //  userni id sini qanday olishni bilmadim
    try {
        const a = "SELECT title, url FROM sales AS s right join users AS u ON s.user_id = u.id"
        const results = await pool.query(a)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Serverda xatolik bor" });
    };
};

export const addBooks = async (req, res) => {
    try {
        const { title, genre, price, url } = req.params;
        const checkData = Joi.object({
            title: Joi.string().min(4).required(),
            genre: Joi.string().min(4).required(),
            price: Joi.number().required(),
            url: Joi.string().min(5).required()
        });

        const { err, value } = checkData.validate({ title, genre, price, url });
        if (err) return res.status(400).json({ message: "Ma'lumotlarni to'g'ri kiriting" });

        const values = [value.title, value.genre, value.price, value.url];

        const results = await pool.query("INSERT INTO books (title, genre, price, url) VALUES ($1, $2, $3, $4) RETURNING *", values);
        res.status(201).send(results.rows);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Serverda xatolik bor" });
    };
};

export const getBook = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
        if (results.rows) return res.status(404).json({ message: "Bunday kitob mavjud emas" });
        res.status(200).send(results.rows)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Serverda xatolik bor" });
    };
};

export const getAllBooks = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM books");
        if (results.rows) return res.status(200).json({ message: "Kitoblar jadvali bo'sh" });
        res.status(200).send(results.rows)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Serverda xatolik bor" });
    };
};