import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import './style.css';

const TicketManage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);

    // Hàm định dạng ngày tháng
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Lấy danh sách vé từ server
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets`);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="ticket-manage">
            <h1 style={{color: 'white', marginBottom: '20px'}}>Ticket Management</h1>
            {user && (
                <div className="user-info">
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                    <p>Permission: {user.permission === 0 ? 'User' : 'Admin'}</p>
                </div>
            )}
            <Button variant="contained" color="secondary" onClick={handleLogout} className="logout-btn">
                Logout
            </Button>

            {/* Hiển thị danh sách vé */}
            <div className="ticket-list">
                {tickets.map((ticket) => (
                    <Paper key={ticket.bookid} className="ticket-item" elevation={3}>
                        <h2>Ticket ID: {ticket.bookid}</h2>
                        <div className="ticket-details">
                            <p><strong>Depart Date:</strong> {formatDate(ticket.departdate)}</p>
                            <p><strong>Return Date:</strong> {formatDate(ticket.returndate)}</p>
                            <p><strong>Departure:</strong> {ticket.bookdepart}</p>
                            <p><strong>Destination:</strong> {ticket.bookdest}</p>
                            <p><strong>Bus Name:</strong> {ticket.bookbusname}</p>
                            <p><strong>Bus Type:</strong> {ticket.bookbustype}</p>
                            <p><strong>Rate:</strong> {ticket.bookrate}</p>
                            <p><strong>Guest:</strong> {ticket.bookguest}</p>
                            <p><strong>Departure Time:</strong> {ticket.bookdeparttime}</p>
                            <p><strong>Arrival Time:</strong> {ticket.bookarrivaltime}</p>
                        </div>
                        <img
                            src={
                                ticket.bookimg.startsWith('data:image')
                                    ? ticket.bookimg
                                    : require(`../../../../images/${ticket.bookimg}`)
                            }
                            alt="Bus"
                            className="bus-image"
                        />

                        {/* Hiển thị thông tin người đăng ký bằng Material-UI Table */}
                        <h3 style={{marginTop: '30px'}}>Registered Guests:</h3>
                        <TableContainer component={Paper} className="guest-table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Phone</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Gender</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ticket.names.length > 0 ? (
                                        ticket.names.map((guest, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{guest.name}</TableCell>
                                                <TableCell>{guest.phone}</TableCell>
                                                <TableCell>{guest.email}</TableCell>
                                                <TableCell>{guest.gender}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No registered guests.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default TicketManage;