import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { getCampgroundsBySearch } from '../../actions/campgrounds';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [search, setSearch] = useState('');

    const { user, token } = profile || {};

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');

        setProfile(null);
    }

    useEffect(() => {
        //Checking if the token has expired
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 3000 < new Date().getTime()) {
                logout()
            }
        }

        setProfile(JSON.parse(localStorage.getItem('profile')));
    }, [location, token]);

    const searchCampground = () => {
        if(search.trim()) { //Using trim to make sure that there are no empty spaces
            //dispatch -> fetch search post
            dispatch(getCampgroundsBySearch({ search }));
            navigate(`/campgrounds/search?searchQuery=${search || 'none'}`)
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            //search post
            searchCampground();
        }
    }

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>YelpCamp<i className='fab fa-firstdraft' /></Link>
                <div className='menu-icon' onClick={handleClick}><i className={click ? 'fas fa-times' : 'fas fa-bars'} /></div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/campgrounds' className='nav-links' onClick={closeMobileMenu}>Campgrounds</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/new_campground' className='nav-links' onClick={closeMobileMenu}>New Campground</Link>
                    </li>
                    <div className='toolBarSearch' position='static' >
                        <input name='search' variant='outlined' label='Search Campgrounds' value={search} onKeyPress={handleKeyPress} onChange={(e) => setSearch(e.target.value)} autoFocus="off"/>
                        {/* <button onClick={searchCampground} className='searchButton' >Search</button> */}
                        <Button variant='contained' color='secondary' className='logout' onClick={searchCampground}>Search</Button>
                    </div>
                    <Toolbar className='toolbar'>
                        {user ? (
                            < div className='profile'>
                                <Avatar className='purple' alt={user.name} src={user.picture}>
                                    {user.name.charAt(0)}
                                </Avatar>
                                <Typography className='userName' variant='h6' >{user.name}</Typography>
                                <Button variant='contained' color='secondary' className='logout' onClick={logout}>logout</Button>
                            </div>
                        ) : (
                            <li className='nav-item'>
                                <Link to='/auth' className='nav-links' onClick={closeMobileMenu}>Login</Link>
                            </li>
                        )}
                    </Toolbar>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;



// Object.keys(user).length > 0