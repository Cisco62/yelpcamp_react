import React, { useEffect } from 'react';

import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampground, getCampgroundsBySearch } from '../../actions/campgrounds';
import CommentSection from './CommentSection';

import useStyles from './styles';

const PostDetails = () => {
    const { campground, campgrounds, isLoading } = useSelector((state) => state.campgrounds);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();


    useEffect(() => {
        dispatch(getCampground(id));
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getCampgroundsBySearch({ search: campground?.title }));
    }, [campground, dispatch])

    if(!campground) {
        return null;
    }
    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size='7em' />
            </Paper>
        );
    }

    const recommendedCampgrounds = campgrounds.filter(({ _id }) => _id === campground._id);

    const openPost = (_id) => {
        navigate(`/campgrounds/${_id}`);
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.imageSection} >
                    <img className={classes.media} src={campground.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={campground.title} />
                </div>
                <div className={classes.section}>
                <Typography variant="h3" component="h2">{campground.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2"> Location: {campground.location}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{campground.price}</Typography>
                <Typography gutterBottom variant="body1" component="p">{campground.description}</Typography>
                <Typography variant="h6">Created by: {campground.name}</Typography>
                <Typography variant="body1">{moment(campground.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection campground={campground} />
                <Divider style={{ margin: '20px 0' }} />
                </div>    
            </div>
            {recommendedCampgrounds.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedCampgrounds}>
                        {recommendedCampgrounds.map(({ title, name, location, price, description, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant='h6'>{title}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{location}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{price}</Typography>
                                <Typography gutterBottom variant='subtitle2'>{description}</Typography>
                                <Typography gutterBottom variant='subtitle2'>Likes: {likes.length}</Typography>
                                <img src={selectedFile} width='200px' alt={name}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    );
}

export default PostDetails;