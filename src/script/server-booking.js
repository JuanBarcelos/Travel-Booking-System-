import axios from "axios";

const sheetID = import.meta.env.VITE_SHEET_DB_ID;

export const createBooking = (data, user) => {
  // Adiciona um ID único ao formulário (exemplo: "BF-123ABC")
  const bookingId = generateUniqueId();
  const currentDate = new Date().toLocaleDateString("pt-BR");
  const dataServico = data.SERVICE_DATE.toLocaleDateString("pt-BR")

  const newBooking = {
    ID: bookingId,
    ...data,
    BOOKING_DATE: currentDate,
    OPERATOR: user.NOME,
    SERVICE_DATE: dataServico,
  };

  return newBooking;
};

export const createUser = async (formData) => {
  try {
    const { name, lastName, email, username, password } = formData;
    const ID = generateUniqueId();
    const CREATEDAT = new Date().toLocaleDateString("pt-BR");
    const NOME = `${name} ${lastName}`;

    const newUser = {
      ID,
      NOME,
      EMAIL: email,
      USERNAME: username,
      SENHA: password,
      CREATEDAT,
    };

    const response = await sendPostUserRequest(newUser);

    if (response?.success) {
      return { success: true, message: "Autenticado com sucesso!" };
    } else {
      return { success: false, message: "Código invalido." };
    }
  } catch (error) {
    console.log("Código invalido.", error);
    return { success: false, message: "Código invalido." };
  }
};

export const getCode = async (formData) => {
  try {
    const response = await sendGetCodeRequest(formData);

    if (response?.success) {
      return { success: true, message: "Usuário cadastrado com sucesso!" };
    } else {
      return { success: false, message: "Erro ao cadastrar usuário." };
    }
  } catch (error) {
    console.log("Erro ao cadastrar reserva:", error);
    return { success: false, message: "Erro ao cadastrar reserva." };
  }
};

// Função para formatar a data no formato "DD/MM/AAAA"
export const formatDate = (dateString) => {
  if (!dateString) return "Data inválida"; // Evita erro se `dateString` for undefined
  if (/\d{2}\/\d{2}\/\d{4}/.test(dateString)) return dateString; // Verifica se a data já está no formato correto

  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

// Função para gerar um ID único no formato "BF-123ABC"
const generateUniqueId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomLetters = Array.from(
    { length: 3 },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join("");
  const randomNumbers = Array.from(
    { length: 3 },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join("");

  return `BL-${randomNumbers}${randomLetters}`;
};

const sendPostUserRequest = async (data) => {
  const response = await axios.post(
    `https://sheetdb.io/api/v1/${sheetID}/?sheet=Login`,
    { data }
  );
  return response?.data
    ? { success: true, message: "Usuário cadastrado com sucesso!" }
    : { success: false, message: "Erro ao cadastrar usuário." };
};

const sendGetCodeRequest = async (code) => {
  const response = await axios.get(
    `https://sheetdb.io/api/v1/${sheetID}/search?sheet=Autenticar&CODE=${code}`
  );
  return response?.data
    ? { success: true, message: "Autenticado com sucesso!" }
    : { success: false, message: "Código invalido." };
};
