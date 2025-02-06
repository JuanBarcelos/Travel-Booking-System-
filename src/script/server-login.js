import axios from "axios";

const sheetID = import.meta.env.VITE_SHEET_DB_ID;

const generateToken = (username) => {
    const payload = {
        username: username,
        timestamp: new Date().toISOString(),
    };

    // Converte o payload para uma string Base64
    return btoa(JSON.stringify(payload));
}

export const isAuthenticatedUser = async (userName, password) => {
    try {
        const response = await axios.get(`
            https://sheetdb.io/api/v1/${sheetID}/search?sheet=Login&USERNAME=${userName}&SENHA=${password}
        `);

        if(response.data.length > 0) {
            const user = response.data[0];
            const token = generateToken(user.user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authToken", token);
            return { success: true, message: "Login realizado com sucesso!", user };
        }else{
            return { success: false, message: "Usuário ou senha errada." };
        }
    } catch (error) {
        console.log("Erro ao tentar fazer login:", error);
        return { success: false, message: "Usuário ou senha errada." };
        
    }
};

export const logout = () => {
    // Limpa dados do armazenamento local (localStorage ou sessionStorage)
    localStorage.clear();
};