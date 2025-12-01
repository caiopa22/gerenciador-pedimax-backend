import bcrypt from "bcrypt"
import { AppError } from "../utils/AppError.js";

export const comparePassword = async (password, passwordToCompare) => {
    const isValid = await bcrypt.compare(password, passwordToCompare);
    if (!isValid) {
        throw new AppError("Email ou senha inválidos.", 400)
    }
}