import bcrypt from "bcrypt"

export const comparePassword = async (password, passwordToCompare, res) => {
    const isValid = await bcrypt.compare(password, passwordToCompare);
    if (!isValid) {
        return res.status(400).json({ message: "Email ou senha inválidos." });
    }
}