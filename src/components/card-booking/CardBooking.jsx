import { CalendarBlank, Car, Clock, } from '@phosphor-icons/react';
import { formatDate } from '../../script/server-booking';

export default function CardBooking({ onClick, Bookings }) {

    return (
        <div className="booking-container">
            {Bookings.map((booking) => (
                <div key={booking.id} className="booking-content" onClick={() => onClick(booking)}>
                    <div className="booking-warpper">
                        <div className="booking-hearder">
                            <div className="title">
                                <span>{booking.solicitante}</span>
                                <p className="booking-timer">
                                    <Clock size={24} />
                                    {booking.horaServico}
                                </p>
                            </div>
                            <p className="booking-code">{booking.id}</p>
                        </div>
                        <div className="destination">
                            <p>{booking.pickup}</p>
                            <Car size={24} />
                            <p>{booking.dropoff}</p>
                        </div>
                        <div className="footer">
                            <p>
                                <CalendarBlank size={24} />
                                {formatDate(booking.dataServico)}
                            </p>
                            <span>{booking.servico}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}