import { createContext, useContext, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";

const sheetID = import.meta.env.VITE_SHEET_DB_ID;
const API_URL = `https://sheetdb.io/api/v1/${sheetID}`;

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const queryClient = useQueryClient();
    
    // Estado para armazenar a busca e filtro
    const [searchTerm, setSearchTerm] = useState("");
    // Estado para armazenar o resumo da reserva antes da confirmação
    const [previewData, setPreviewData] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    //Estado para armazenar o resumo da reserva já cadastrada
    const [selectedBooking, setSelectedBooking] = useState(null);
    // Função para resetar formulário
    const resetFormRef = useRef(null);

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
                  booking.CUSTOMER_NAME?.toLowerCase().includes(term) ||
                  booking.REQUESTING?.toLowerCase().includes(term) ||
                  booking.PICKUP?.toLowerCase().includes(term) ||
                  booking.ID?.toLowerCase().includes(term) ||
                  booking.SERVICE_DATE?.toLowerCase().includes(term) ||
                  booking.FLIGHT_NUMBER?.toLowerCase().includes(term) ||
                  booking.SERVICE_TYPE?.toLowerCase().includes(term) ||
                  booking.VEHICLE_TYPE?.toLowerCase().includes(term) ||
                  booking.STATUS?.toLowerCase().includes(term) ||
                  booking.OPERATOR?.toLowerCase().includes(term) ||
                  booking.DROPOFF?.toLowerCase().includes(term)
          );
        }

        // Se não houver busca, mostra apenas as reservas do dia
        return bookings.filter((booking) => booking.BOOKING_DATE === today);
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

    // Função para abrir o modal com os dados da reserva antes da confirmação
    const previewBooking = (data) => {
        setPreviewData(data);
        setModalOpen(true);
        // Limpa reserva selecionada
        setSelectedBooking(null);
    };

    // Fechar o modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedBooking(null);
        setPreviewData(null);
    };

    // Função para definir a função de reset do formulário
    const setResetFunction = (resetFn) => {
        resetFormRef.current = resetFn;
    };

     // Confirmar a reserva e fechar o modal
     const confirmBooking = async () => {
        if (!previewData) return;

        addBooking.mutate(previewData, {
            onSuccess: () => {
                closeModal();
                if(resetFormRef.current) {
                    resetFormRef.current();
                }
                toast.success("Reserva cadastrada com sucesso!");
            },
            onError: () => {
                closeModal();
                toast.error("Erro ao cadastrar a reserva.");
            }
        });
    };

    // Função para abrir o modal com uma reserva específica
    const openModal = (booking) => {
        setSelectedBooking(booking);
        setModalOpen(true);
        // Limpa dados de preview
        setPreviewData(null);
    };

    return (
        <BookingContext.Provider
            value={{
                bookings,
                filteredBookings,
                isLoading,
                error,
                addBooking,
                setSearchTerm,
                previewBooking,
                closeModal,
                confirmBooking,
                isModalOpen,
                previewData,
                selectedBooking,
                openModal,
                setResetFunction
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
