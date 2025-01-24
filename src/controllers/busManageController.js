import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {
    fetchBusesWithRoutes,
    addBus,
    deleteBus,
    updateBus,
    addRoute,
    updateRoute,
    deleteRoute,
    convertFileToBase64,
} from '../models/busManageModel';
import { toast } from 'react-toastify';

export const useBusManage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [buses, setBuses] = useState([]);
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleBuses, setVisibleBuses] = useState(5);
    const [selectedBus, setSelectedBus] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newRoute, setNewRoute] = useState({
        depart: '',
        dest: '',
        departtime: '',
        arrivaltime: '',
    });
    const [editingRoute, setEditingRoute] = useState(null);
    const [isAddBusDialogOpen, setIsAddBusDialogOpen] = useState(false);
    const [newBus, setNewBus] = useState({
        busname: '',
        bustype: '',
        rate: '',
        cost: '',
        seat: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBusesWithRoutes();
                setBuses(data);
                setFilteredBuses(data);
            } catch (error) {
                console.error('Error fetching buses with routes:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term === '') {
            setFilteredBuses(buses);
        } else {
            const filtered = buses.filter((bus) =>
                bus.busname.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBuses(filtered);
        }
    };

    const handleShowMore = () => {
        setVisibleBuses((prev) => prev + 5);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddBus = async () => {
        try {
            if (!newBus.busname || !newBus.bustype || !newBus.rate || !newBus.cost || !newBus.seat || !newBus.description || !newBus.image) {
                toast.error('Please fill in all fields.');
                return;
            }

            let base64Image = newBus.image;
            if (newBus.image instanceof File) {
                base64Image = await convertFileToBase64(newBus.image);
            }

            const bus = await addBus({ ...newBus, image: base64Image });
            setBuses([...buses, bus]);
            setFilteredBuses([...filteredBuses, bus]);

            toast.success('Bus added successfully!');
            setIsAddBusDialogOpen(false);
            setNewBus({
                busname: '',
                bustype: '',
                rate: '',
                cost: '',
                seat: '',
                description: '',
                image: null,
            });
        } catch (error) {
            console.error('Error adding bus:', error);
            toast.error('Failed to add bus. Please try again.');
        }
    };

    const handleDeleteBus = async (busid) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this bus and its routes?');
            if (confirmDelete) {
                await deleteBus(busid);
                const updatedBuses = buses.filter((bus) => bus.busid !== busid);
                setBuses(updatedBuses);
                setFilteredBuses(updatedBuses);
                toast.success('Bus and its routes deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting bus:', error);
            toast.error('Failed to delete bus. Please try again.');
        }
    };

    const handleEditBus = (bus) => {
        setSelectedBus(bus);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedBus(null);
    };

    const handleStartEditRoute = (route) => {
        setEditingRoute(route);
    };

    const handleCancelEditRoute = () => {
        setEditingRoute(null);
    };

    const handleBusUpdate = async () => {
        if (!selectedBus.busname || !selectedBus.bustype || !selectedBus.rate || !selectedBus.cost || !selectedBus.seat || !selectedBus.description) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const updatedBus = await updateBus(selectedBus.busid, selectedBus);
            const updatedBuses = buses.map((bus) =>
                bus.busid === selectedBus.busid ? updatedBus : bus
            );
            setBuses(updatedBuses);
            setFilteredBuses(updatedBuses);

            toast.success('Bus updated successfully!');
            handleCloseEditDialog();
        } catch (error) {
            console.error('Error updating bus:', error);
            toast.error('Failed to update bus. Please try again.');
        }
    };

    const handleSaveRoute = async () => {
        if (!editingRoute.depart || !editingRoute.dest || !editingRoute.departtime || !editingRoute.arrivaltime) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const updatedRoute = await updateRoute(editingRoute.routeid, editingRoute);
            const updatedRoutes = selectedBus.routes.map((route) =>
                route.routeid === editingRoute.routeid ? updatedRoute : route
            );

            setSelectedBus({
                ...selectedBus,
                routes: updatedRoutes,
            });

            toast.success('Route updated successfully!');
            setEditingRoute(null);
        } catch (error) {
            console.error('Error updating route:', error);
            toast.error('Failed to update route. Please try again.');
        }
    };

    const handleDeleteRoute = async (routeId) => {
        try {
            await deleteRoute(routeId);
            toast.success('Route deleted successfully!');
            const updatedBus = {
                ...selectedBus,
                routes: selectedBus.routes.filter((route) => route.routeid !== routeId),
            };
            setSelectedBus(updatedBus);
        } catch (error) {
            console.error('Error deleting route:', error);
            toast.error('Failed to delete route. Please try again.');
        }
    };

    const handleAddRoute = async () => {
        if (!newRoute.depart || !newRoute.dest || !newRoute.departtime || !newRoute.arrivaltime) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const route = await addRoute({ ...newRoute, busid: selectedBus.busid });
            const updatedBus = {
                ...selectedBus,
                routes: [...selectedBus.routes, route],
            };
            setSelectedBus(updatedBus);

            toast.success('Route added successfully!');
            setNewRoute({ depart: '', dest: '', departtime: '', arrivaltime: '' });
        } catch (error) {
            console.error('Error adding route:', error);
            toast.error('Failed to add route. Please try again.');
        }
    };

    return {
        user,
        buses,
        filteredBuses,
        searchTerm,
        visibleBuses,
        selectedBus,
        isEditDialogOpen,
        newRoute,
        editingRoute,
        isAddBusDialogOpen,
        newBus,
        setSearchTerm,
        setVisibleBuses,
        setSelectedBus,
        setIsEditDialogOpen,
        setNewRoute,
        setEditingRoute,
        setIsAddBusDialogOpen,
        setNewBus,
        handleSearch,
        handleShowMore,
        scrollToTop,
        handleLogout,
        handleAddBus,
        handleDeleteBus,
        handleEditBus,
        handleCloseEditDialog,
        handleStartEditRoute,
        handleCancelEditRoute,
        handleBusUpdate,
        handleSaveRoute,
        handleDeleteRoute,
        handleAddRoute,
    };
};