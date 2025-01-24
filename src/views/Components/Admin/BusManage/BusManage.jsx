import './style.css'; 
import { useBusManage } from '../../../../controllers/busManageController';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const BusManage = () => {

    const {
        user,
        filteredBuses,
        searchTerm,
        visibleBuses,
        selectedBus,
        isEditDialogOpen,
        newRoute,
        editingRoute,
        isAddBusDialogOpen,
        newBus,
        setSelectedBus,
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
    } = useBusManage();

    return (
        <div className="bus-manage">
            <h1>Bus Management</h1>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                    <p>Permission: {user.permission === 1 ? 'Admin' : 'User'}</p>
                </div>
            )}
            <button onClick={handleLogout} className="log-out-btn">Logout</button>

           
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by bus name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={() => setIsAddBusDialogOpen(true)} className="add-bus-btn">
                    Add New Bus
                </button>     
            </div>
            <div className="bus-list">
                {filteredBuses.slice(0, visibleBuses).map((bus) => (                             
                    <div key={bus.busid} className="bus-item">
                        <h2>{bus.busname}</h2>
                        <p>Type: {bus.bustype}</p>
                        <p>Rate: {bus.rate}</p>
                        <p>Cost: {bus.cost}</p>
                        <p>Seats: {bus.seat}</p>
                        <p>Description: {bus.description}</p>
                        <img
                            src={
                                bus.image.startsWith('data:image') 
                                    ? bus.image 
                                    : require(`../../../../images/${bus.image}`) 
                            }
                            alt={bus.busname}
                            className="bus-image"
                        />
                        <h3>Routes:</h3>
                        <ul className="route-list">
                            {bus.routes.map((route) => (
                                <li key={route.routeid} className="route-item">
                                    <p>Depart: {route.depart}</p>
                                    <p>Destination: {route.dest}</p>
                                    <p>Departure Time: {route.departtime}</p>
                                    <p>Arrival Time: {route.arrivaltime}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="bus-actions">
                            <button className="edit-btn" onClick={() => handleEditBus(bus)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDeleteBus(bus.busid)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {visibleBuses < filteredBuses.length && (
                <button className="show-more-btn" onClick={handleShowMore}>
                    Show More
                </button>
            )}
            <button className="scroll-to-top-btn" onClick={scrollToTop}>
                ⬆
            </button>
            <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} maxWidth="md">
                <DialogTitle style={{fontWeight: '700'}}>Edit Bus Information</DialogTitle>
                <DialogContent>
                    {selectedBus && (                       
                        <>
                            <TextField
                                label="Bus Name"
                                value={selectedBus.busname}
                                onChange={(e) =>
                                    setSelectedBus({ ...selectedBus, busname: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Bus Type"
                                value={selectedBus.bustype}
                                onChange={(e) =>
                                    setSelectedBus({ ...selectedBus, bustype: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Rate"
                                value={selectedBus.rate}
                                onChange={(e) =>
                                    setSelectedBus({ ...selectedBus, rate: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Cost"
                                value={selectedBus.cost}
                                onChange={(e) =>
                                    setSelectedBus({ ...selectedBus, cost: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Seats"
                                value={selectedBus.seat}
                                onChange={(e) =>
                                    setSelectedBus({ ...selectedBus, seat: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                value={selectedBus.description}
                                onChange={(e) =>
                                    setSelectedBus({ ...selectedBus, description: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <h3>Routes:</h3>
                            {selectedBus.routes && selectedBus.routes.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Depart</TableCell>
                                                <TableCell>Destination</TableCell>
                                                <TableCell>Departure Time</TableCell>
                                                <TableCell>Arrival Time</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedBus.routes.map((route) => (
                                                <TableRow key={route.routeid}>
                                                    {editingRoute && editingRoute.routeid === route.routeid ? (
                                                        <>
                                                            <TableCell>
                                                                <TextField
                                                                    value={editingRoute.depart}
                                                                    onChange={(e) =>
                                                                        setEditingRoute({ ...editingRoute, depart: e.target.value })
                                                                    }
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    value={editingRoute.dest}
                                                                    onChange={(e) =>
                                                                        setEditingRoute({ ...editingRoute, dest: e.target.value })
                                                                    }
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    value={editingRoute.departtime}
                                                                    onChange={(e) =>
                                                                        setEditingRoute({ ...editingRoute, departtime: e.target.value })
                                                                    }
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    value={editingRoute.arrivaltime}
                                                                    onChange={(e) =>
                                                                        setEditingRoute({ ...editingRoute, arrivaltime: e.target.value })
                                                                    }
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button onClick={handleSaveRoute} color="primary">
                                                                    Save
                                                                </Button>
                                                                <Button onClick={handleCancelEditRoute} color="secondary">
                                                                    Cancel
                                                                </Button>
                                                            </TableCell>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TableCell>{route.depart}</TableCell>
                                                            <TableCell>{route.dest}</TableCell>
                                                            <TableCell>{route.departtime}</TableCell>
                                                            <TableCell>{route.arrivaltime}</TableCell>
                                                            <TableCell>
                                                                <Button onClick={() => handleStartEditRoute(route)} color="primary">
                                                                    Edit
                                                                </Button>
                                                                <Button onClick={() => handleDeleteRoute(route.routeid)} color="secondary">
                                                                    Delete
                                                                </Button>
                                                            </TableCell>
                                                        </>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <p>No routes available.</p>
                            )}

                            <h3 style={{marginTop: '30px'}}>Add New Route:</h3>
                            <TextField
                                label="Depart"
                                value={newRoute.depart}
                                onChange={(e) =>
                                    setNewRoute({ ...newRoute, depart: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Destination"
                                value={newRoute.dest}
                                onChange={(e) =>
                                    setNewRoute({ ...newRoute, dest: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Departure Time"
                                value={newRoute.departtime}
                                onChange={(e) =>
                                    setNewRoute({ ...newRoute, departtime: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Arrival Time"
                                value={newRoute.arrivaltime}
                                onChange={(e) =>
                                    setNewRoute({ ...newRoute, arrivaltime: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <Button onClick={handleAddRoute} color="primary">
                                Add Route
                            </Button>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleBusUpdate} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isAddBusDialogOpen}
                onClose={() => setIsAddBusDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle style={{fontWeight: '700'}}>Add New Bus</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Bus Name"
                        value={newBus.busname}
                        onChange={(e) => setNewBus({ ...newBus, busname: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Bus Type"
                        value={newBus.bustype}
                        onChange={(e) => setNewBus({ ...newBus, bustype: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Rate"
                        value={newBus.rate}
                        onChange={(e) => setNewBus({ ...newBus, rate: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cost"
                        value={newBus.cost}
                        onChange={(e) => setNewBus({ ...newBus, cost: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Seats"
                        value={newBus.seat}
                        onChange={(e) => setNewBus({ ...newBus, seat: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={newBus.description}
                        onChange={(e) => setNewBus({ ...newBus, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setNewBus({ ...newBus, image: file }); 
                            }
                        }}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddBusDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddBus} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BusManage;