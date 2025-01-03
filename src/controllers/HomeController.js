import { useState, useEffect } from 'react';

export const useHomeController = (busRoutes) => {

    useEffect(() => {
        document.title = 'ホーム';
    })
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = busRoutes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(busRoutes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const settings = {
        dots: true, 
        infinite: true, 
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return { currentItems, totalPages, handlePageChange, currentPage, settings };
};
