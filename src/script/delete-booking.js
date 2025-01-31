import axios from "axios";

export const deleteBooking = async (booking) => {
    try {
        const { observation, id } = booking;
        const today = new Date().toLocaleDateString("pt-BR");
        const user = JSON.parse(localStorage.getItem("user")) || { nome: "Desconhecido" };

        const newOservation = `Cancelado por ${user.nome} no dia ${today}  //  ${observation}`;

        const newbooking = {
            status: "CANCELADO",
            observation: newOservation,
        }

        const response = await sendUpdateBooking(newbooking, id);
        if (response?.success) {
            // 1. Recupera todas as reservas do localStorage
            let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
            // 2. Encontrar o índice da reserva a ser atualizada
            const index = bookings.findIndex(booking => booking.id === id);

            if (index === -1) {
                return { success: false, message: "Reserva não encontrada." };
            }

            // 3. Atualiza os dados da reserva mantendo o mesmo ID
            bookings[index] = { ...bookings[index], ...newbooking };

            // 4. Salva a lista atualizada no localStorage
            localStorage.setItem("bookings", JSON.stringify(bookings));


            return { success: true, message: "Reserva cancelada com sucesso!" };
        } else {
            return { success: false, message: "Erro ao cancelar reserva no servidor." };
        }
    } catch (error) {
        console.log("Erro ao cancelar reserva:", error);
        return { success: false, message: "Erro ao cancelar reserva." };
    }
}

const sendUpdateBooking = async (data, id) => {
    try {
        const response = await axios.patch(`https://sheetdb.io/api/v1/2fmj1ybi9hf0s/id/${id}`, { data });
        return response?.data ? { success: true, message: "Reserva cancelada com sucesso!" } : { success: false };
    } catch (error) {
        console.log("Erro ao enviar requisição POST:", error);
        return { success: false, message: "Erro ao cancelar a reserva." };
    }
};
