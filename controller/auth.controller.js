import prisma from "../config/database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { comparePassword } from "../service/auth.service.js";
import { AppError } from "../utils/AppError.js";


export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);

        const data = await prisma.users.create({
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

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

        await comparePassword(password, user.password);

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ "message": error.message });
        }
        next(error)
    }
};

export const alterUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        const id = req.user.id;

        if (!username || username.trim() === "") {
            throw new AppError("Nome é obrigatório", 400);
        }

        const updated = await prisma.users.update({
            where: { id: id },
            data: { username }
        });

        return res.status(200).json(updated);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ "message": error.message });
        }
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await prisma.users.delete({
            where: { id: req.user.id }
        });
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}