import { useState, useEffect } from 'react';

export const useHomeController = (busRoutes) => {

    useEffect(() => {
        document.title = 'ホーム';
    })
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = busRoutes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(busRoutes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPaginationNumbers = () => {
        const pages = [];     
        pages.push(1);
    
        if (totalPages <= 5) {            
            for (let i = 2; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (currentPage <= 3) {           
            for (let i = 2; i <= 4; i++) {
                pages.push(i);
            }
            if (totalPages > 4) {
                pages.push('...');
                pages.push(totalPages);
            }
        } else if (currentPage >= totalPages - 2) {
          
            pages.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {          
            pages.push('...');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
    
        return pages;
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

    return { currentItems, totalPages, handlePageChange, currentPage, settings, getPaginationNumbers};
};
