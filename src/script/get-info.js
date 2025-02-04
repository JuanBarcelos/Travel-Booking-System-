export const getName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.NOME;
}

export const getBookings = () => {
    // Obtém a data de hoje no formato "DD/MM/AAAA"
    const today = new Date().toLocaleDateString("pt-BR");

    // Busca as reservas do localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Filtra apenas as reservas que têm a mesma data de hoje
    const todaysBookings = bookings.filter(booking => booking.dataAgendamento === today);

    return todaysBookings;
}

/*export const getAll = async () => {
    try {
        const response = await axios.get('https://sheetdb.io/api/v1/2fmj1ybi9hf0s');
        const bookings = response.data;
        localStorage.setItem("bookings", JSON.stringify(bookings));
       /* const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

        if (bookings.lenght > 0) {
            bookings.map((booking) => (
                existingBookings.push(booking)
            ))
   
        }
    } catch (error) {
        console.log("Erro ao enviar requisição PATCH:", error);
        return { success: false, message: "Erro ao cancelar a reserva." };
    }
}*/