import './Dashboard.css';
import Menu from '../../components/menu/Menu';
import { MagnifyingGlass, } from '@phosphor-icons/react';
import CardBooking from '../../components/card-booking/CardBooking';
import { useState, useEffect } from 'react';
import ModalBooking from '../../components/modal-booking-details/ModalBooking';
import { useNavigate } from 'react-router-dom';
import { getBookings } from '../../script/get-info';

function Dashboard() {
    const navigate = useNavigate();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    // Carrega todas as reservas ao iniciar o componente
    useEffect(() => {
        const storedBookings = getBookings();
        //const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
        setFilteredBookings(storedBookings);
    }, []);

     // Função para filtrar as reservas
     const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (!term) {
            // Se estiver vazio, mostra todas as reservas
            setFilteredBookings(bookings); 
            return;
        }

        const results = bookings.filter((booking) =>
            (booking.cliente || "").toLowerCase().includes(term) || 
            (booking.solicitante || "").toLowerCase().includes(term) || 
            (booking.pickup || "").toLowerCase().includes(term) ||
            (booking.id || "").toLowerCase().includes(term) ||
            (booking.dataServico || "").toLowerCase().includes(term) ||
            (booking.voo || "").toLowerCase().includes(term) ||
            (booking.servico || "").toLowerCase().includes(term) ||
            (booking.veiculo || "").toLowerCase().includes(term) ||
            (booking.status || "").toLowerCase().includes(term) ||
            (booking.operador || "").toLowerCase().includes(term) ||
            (booking.dropoff || "").toLowerCase().includes(term)
        );

        setFilteredBookings(results);
    };

    const openModal = (booking) => setSelectedBooking(booking);
    const closeModal = () => setSelectedBooking(null);

    const handleBooking = () => {
        navigate('/booking')
    }

    return (
        <>
            <div className="conatiner">
               <Menu />
                <section id="dashboard-section">
                    <div className="warpper">
                        <header className="dashboard-header">
                            <div className="input-search">
                                <MagnifyingGlass size={24} />
                                <input 
                                    type="search" 
                                    name="search" 
                                    id="search" 
                                    placeholder="Pesquisar reserva..." 
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <button type="submit" id="search-button" className="button" onClick={handleBooking}>
                                <i className="ph ph-plus"></i>
                                Nova Reserva
                            </button>
                        </header>
                        <main>
                            <CardBooking onClick={openModal} Bookings={filteredBookings}/>
                            {selectedBooking && <ModalBooking booking={selectedBooking} onClose={closeModal}/>}
                        </main>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Dashboard