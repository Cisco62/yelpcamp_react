import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';


const Home = () => {
    const navigate = useNavigate();

    const viewCampgrounds = () => {
        navigate('/campgrounds');
    }

    return (
        <div className='container2'>
            <div className='header'>
                <h1>YelpCamp</h1>
                <div className='intro'>
                    <p className='lead'> Welcome to YelpCamp! <br/>Jump right in and explore our many campgrounds.<br/> Feel free to share some of your own and comment on others!</p>
                    <button className='button' color='primary' size="small" onClick={viewCampgrounds}>View Campgrounds</button>
                </div>
            </div>
        </div>
    );
}

export default Home;