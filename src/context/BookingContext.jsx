import { createContext, useContext, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://sheetdb.io/api/v1/2fmj1ybi9hf0s";

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const queryClient = useQueryClient();
    
    // Estado para armazenar a busca e filtro
    const [searchTerm, setSearchTerm] = useState("");
    
    // Carregar as reservas com React Query
    const { data: bookings, isLoading, error } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const response = await axios.get(API_URL);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // Atualiza a cada 5 minutos
        cacheTime: 1000 * 60 * 10, // Mantém no cache por 10 minutos
    });

    // Filtrar reservas conforme busca ou mostrar apenas as reservas do dia
    const filteredBookings = useMemo(() => {
        if (!bookings) return [];
        
        const today = new Date().toLocaleDateString("pt-BR");

        // Se houver termo de busca, filtra ainda mais os resultados
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return bookings.filter(
              (booking) =>
                  booking.cliente?.toLowerCase().includes(term) ||
                  booking.solicitante?.toLowerCase().includes(term) ||
                  booking.pickup?.toLowerCase().includes(term) ||
                  booking.id?.toLowerCase().includes(term) ||
                  booking.dataServico?.toLowerCase().includes(term) ||
                  booking.voo?.toLowerCase().includes(term) ||
                  booking.servico?.toLowerCase().includes(term) ||
                  booking.veiculo?.toLowerCase().includes(term) ||
                  booking.status?.toLowerCase().includes(term) ||
                  booking.operador?.toLowerCase().includes(term) ||
                  booking.dropoff?.toLowerCase().includes(term)
          );
        }

        // Se não houver busca, mostra apenas as reservas do dia
        return bookings.filter((booking) => booking.dataAgendamento === today);
    }, [bookings, searchTerm]);

    // Mutação para adicionar uma nova reserva e atualizar o cache
    const addBooking = useMutation({
        mutationFn: async (newBooking) => {
            await axios.post(API_URL, { data: newBooking });
            return newBooking;
        },
        onSuccess: (newBooking) => {
            queryClient.setQueryData(["bookings"], (oldBookings) => [...oldBookings, newBooking]);
        },
    });

    return (
        <BookingContext.Provider
            value={{
                bookings,
                filteredBookings,
                isLoading,
                error,
                addBooking,
                setSearchTerm,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
