import bcrypt from "bcrypt"
import { AppError } from "../utils/AppError.js";

// Função que compara duas senhas usando bcrypt
export const comparePassword = async (password, passwordToCompare) => {
    const isValid = await bcrypt.compare(password, passwordToCompare);
    // Caso não for válido, lança um AppError
    if (!isValid) {
        throw new AppError("Email ou senha inválidos.", 400)
    }
}