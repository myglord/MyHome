import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navMenus } from '../data/CommonData/CommonData';
import { useAuth } from '../contextApi/AuthContext';

const NavMenu = (props) => {

    const [activeIndex, setActiveIndex] = useState(null);
    const { isAdmin } = useAuth();

    const handleDropdownOpen = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const location = useLocation();

    const filterSubmenus = (submenus) => {
        if (!submenus) return submenus;
        if (isAdmin) return submenus;
        return submenus.filter(s => s.path !== '/admin/add-listing');
    };

    const menus = isAdmin ? [...navMenus, { text: 'Admin', path: '/admin', submenus: null }] : navMenus;

    return (
        <>
            <ul className={`nav-menu flx-align ${props.navMenusClass}`}>
                {
                    menus.map((navMenu, index) => {
                        const submenus = filterSubmenus(navMenu.submenus);
                        const displayMenu = submenus ? { ...navMenu, submenus } : navMenu;

                        const isActiveNavMenu = location.pathname === navMenu.path; 
                        const isActiveSubMenu = navMenu.submenus && navMenu.submenus.some(submenu => location.pathname === submenu.path); 

                        const isActivePage = isActiveNavMenu || isActiveSubMenu;
                        
                        return (
                            <li
                                className={`nav-menu__item 
                                    ${ displayMenu.submenus && displayMenu.submenus.length > 0 ? 'has-submenu' : '' } 
                                    ${isActivePage ? 'activePage' : ''}
                                `}
                                key={index}
                                onClick={() => handleDropdownOpen(index)}
                            >
                                <NavLink to={navMenu.path} className="nav-menu__link">{navMenu.text}</NavLink>
                                {
                                    displayMenu.submenus && displayMenu.submenus.length > 0 && (
                                        <ul className="nav-submenu">
                                            {
                                                displayMenu.submenus.map((submenu, subIndex) => (
                                                    <li className={`nav-submenu__item ${location.pathname === submenu.path ? 'activePage' : ''}`} key={subIndex}>
                                                        <Link to={submenu.path} className="nav-submenu__link">{submenu.text}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>   
        </>
    );
};

export default NavMenu;

