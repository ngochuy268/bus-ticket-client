import { useEffect, useRef, useState } from 'react';
import logo from '../../images/logo.png';
import clsx from 'clsx';
import { Link } from 'react-router-dom';


const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            triggerRef.current &&
            !triggerRef.current.contains(event.target)
        ) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">                              
                                <a href="index.html" className="logo">
                                    <img src={logo} alt="" />
                                </a>                              
                                <ul ref={menuRef} className={clsx('nav', { active: isMenuOpen })}>
                                    <li><Link to={'/'} onClick={closeMenu}>ホーム</Link></li>
                                    <li><Link to={'/book'} onClick={closeMenu}>予約</Link></li>
                                    <li><Link to={'/manage'} onClick={closeMenu}>管理</Link></li>
                                    <li><Link to={'/contact'} onClick={closeMenu}>連絡</Link></li>
                                    <li><Link to={'/login'} onClick={closeMenu}>ログイン</Link></li>
                                </ul>
                                <a className='menu-trigger' onClick={toggleMenu} ref={triggerRef}>
                                    <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )

}

export default Header;