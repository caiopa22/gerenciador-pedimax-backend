import prisma from "../config/database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { comparePassword } from "../service/auth.service.js";
import { AppError } from "../utils/AppError.js";

// Criar novo usuário
export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Hash da senha
        const hashed = await bcrypt.hash(password, 10);

        // Criando usuário pelo prisma
        // Comentário add: Não criei um service para esses casos
        // por que são simples demais para ter um service dedicado.
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

// Login de usuário
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Encontrando usuário
        const user = await prisma.users.findUnique({ where: { email } });

        // Caso não exista
        if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

        // Compara a senha do corpo com a do usuário encontrado
        await comparePassword(password, user.password);

        // Criando token JWT, com id de usuário e email
        // Duração de 1 hora
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

// Alterar dados do usuário
export const alterUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        const id = req.user.id;

        if (!username || username.trim() === "") {
            throw new AppError("Nome é obrigatório", 400);
        }

        // Atualizando pelo prisma
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
        // Sem verificação, apagando usuário pelo id da req de forma segura
        await prisma.users.delete({
            where: { id: req.user.id }
        });
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}