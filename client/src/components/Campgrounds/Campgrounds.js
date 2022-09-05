import React, { useEffect } from 'react';
import './Campgrounds.css';
import Campground from './Campground/Campground';

import { useSelector } from 'react-redux';
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import Pagination from '../Pagination';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCampgrounds } from '../../actions/campgrounds';




function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Campgrounds = ({ setCurrentId }) => {
    const { campgrounds, isLoading } = useSelector((state) => state.campgrounds);
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const dispatch = useDispatch();

    useEffect(() => {
       if(page) dispatch(getCampgrounds(page));
    }, [page, dispatch]);

    if(!campgrounds.length && !isLoading) {
        return 'No Campground Found';
    }

    return (
        isLoading ?
            <CircularProgress />
            : (
                <>
                    <Grid className='container'>
                        {campgrounds.map((campground) => (
                            <Grid key={campground._id}>
                                <Campground campground={campground} setCurrentId={setCurrentId} />
                            </Grid>
                        ))}
                    </Grid>
                    {(!searchQuery) && (
                        <Paper className='pagination' elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    )}

                </>

            )
    );
}

export default Campgrounds;