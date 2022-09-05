import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, CardContent, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createCampground } from '../../actions/campgrounds';
import { useNavigate } from 'react-router-dom';


const NewCampground = ({ currentId }) => {
    const [campgroundData, setCampgroundData] = useState({ title: '', location: '', campgroundPrice: 0, description: '', selectedFile: '' });
    const campground = useSelector((state) => (currentId ? state.campgrounds.campgrounds.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem('profile'));

    const { user } = profile || {};


    const clear = () => {
        setCampgroundData({ title: '', location: '', campgroundPrice: 0, description: '', selectedFile: '' });
    }

    useEffect(() => {
        if (!campground?.title) clear();
        if (campground) setCampgroundData(campground);
      }, [campground]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createCampground({ ...campgroundData, name: user?.name }));
        clear();
        
        navigate('/campgrounds');
    }
    
    if(!user?.name) {
        return (
            <Paper className='paper'>
                <Typography variant='h6' align='center'>
                    Please sign in to create a campground and like other campgrounds
                </Typography>
            </Paper>
        )
    }

    return (
        <div>
            <Paper style={{maxWidth:450, margin:'50px auto', padding:'20px 20px'}} elevation={6}>
                <CardContent>
                    <Typography variant="h6" gutterBottom >Create New Campground</Typography>
                    <Typography style={{marginBottom: 10}} variant='body2' component='p' color='textSecondary'>Fill out the form to create a new campground</Typography>
                    <form autoComplete="off"  onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <TextField label='Title' placeholder='Enter Campground Title' variant='outlined' fullWidth value={campgroundData.title} onChange={(e) => setCampgroundData({ ...campgroundData, title: e.target.value })} required/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField label='Location' placeholder='Enter Campground Location' variant='outlined' fullWidth value={campgroundData.location} onChange={(e) => setCampgroundData({ ...campgroundData, location: e.target.value })} required/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField type='number' label='Campground Price' placeholder='Enter Campground Price' variant='outlined' fullWidth value={campgroundData.campgroundPrice} onChange={(e) => setCampgroundData({ ...campgroundData, campgroundPrice: e.target.value })} required/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField label='Description' multiline minRows={4} placeholder='Enter Campground Description' variant='outlined' fullWidth value={campgroundData.description} onChange={(e) => setCampgroundData({ ...campgroundData, description: e.target.value })} required/>
                            </Grid>
                            <Grid xs={12} item>
                                <FileBase type="file" multiple={false}  onDone={({ base64 }) => setCampgroundData({ ...campgroundData, selectedFile: base64 })} required />
                            </Grid>
                            <Grid xs={12} item >
                                <Button style={{marginBottom: 10}} variant='contained' color='primary' fullWidth type='submit'>Submit</Button>
                                <Button variant='contained' color='secondary' fullWidth onClick={clear}>Clear</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Paper>
        </div>
    );
}

export default NewCampground;