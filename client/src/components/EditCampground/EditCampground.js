import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampground } from '../../actions/campgrounds';
import { useNavigate } from 'react-router-dom';

const EditCampground = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [campgroundData, setCampgroundData] = useState({ title: '', location: '', campgroundPrice: 0, description: '', selectedFile: '' });
    //Fetching a campground using redux
    const campground = useSelector((state) => currentId ? state.campgrounds.campgrounds.find((c) => c._id === currentId ) : null);
    const profile = JSON.parse(localStorage.getItem('profile'));

    const { user } = profile || {};


    useEffect(() => {
        if(campground) {
            setCampgroundData(campground)
        }
    }, [campground]);

    const clear = () => {
        // setCurrentId(null);
        setCampgroundData({ title: '', location: '', campgroundPrice: 0, description: '', selectedFile: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        
        dispatch(updateCampground(currentId, { ...campgroundData, name: user?.name }));
        clear();
        

        navigate('/campgrounds');
    }
    

    return (
        <div>
            <Card style={{maxWidth:450, margin:'30px auto', padding:'20px 20px'}}>
                <CardContent>
                    <Typography variant="h6" gutterBottom >Edit Campground</Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
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
                                <FileBase type="file" multiple={false}  onDone={({ base64 }) => setCampgroundData({ ...campgroundData, selectedFile: base64 })} required/>
                            </Grid>
                            <Grid xs={12} item >
                                <Button style={{marginBottom: 10}} variant='contained' color='primary' fullWidth type='submit'>Update</Button>
                                <Button variant='contained' color='secondary' fullWidth onClick={clear}>Clear</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCampground;
