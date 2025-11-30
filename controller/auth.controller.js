import prisma from "../config/database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { comparePassword } from "../service/auth.service.js";


export const registerAdmin = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);

        const data = await prisma.admins.create({
            data: {
                username,
                email,
                password: hashed
            }
        });

        return res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.admins.findUnique({ where: { email } });

        if (!user) return res.status(400).json({ message: "Email ou senha inválidos" });

        await comparePassword(password, user.password, res);

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });
    } catch (error) {
        next(error)
    }
};

export const alterAdmin = async (req, res, next) => {
    try {
        const { username } = req.body;
        const id = req.user.id;

        if (!username || username.trim() === "") {
            return res.status(400).json({ message: "Nome é obrigatório" });
        }

        const updated = await prisma.admins.update({
            where: { id: id },
            data: { username }
        });

        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        await prisma.admins.delete({
            where: { id: req.user.id }
        });
        return res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}