import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardMedia, Button, Typography, CardContent } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import './Campground.css';
import { useNavigate } from 'react-router-dom';

import { deleteCampground, likeCampground } from '../../../actions/campgrounds';


const Campground = ({ campground, setCurrentId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [likes, setLikes] = useState(campground?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));


    // const { user, token } = profile || {};
    console.log(user);
    // console.log(token)
    const userId = user?._id || user?.googleUser
    
    const hasLikedCampground = campground.likes.find((like) => like === userId);

    const handleLike = () => {
        dispatch(likeCampground(campground));

        if(hasLikedCampground) {
            setLikes(campground.likes.filter((id) => id !== userId))
            console.log(userId);
        } else {
            setLikes([ ...campground.likes, userId ]);
        }
    }

    const Likes = () => {
        //Checking if the current user likes a campground or not
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
              ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
              ) : (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
              );
          }
      
          return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
    const openPost = () => {
        navigate(`/campgrounds/${campground._id}`)
    }
    const handleEdit = (e) => {
        e.stopPropagation(); 

        setCurrentId(campground._id);

        navigate('/edit_campground');
    }

    return (
        <div className='card'>
            
                <div className='card-body'>
                    <CardMedia className='card-image' image={campground.selectedFile} title={campground.title} />
                    <div className='overlay'>
                        <Typography variant="h6">{campground.name}</Typography>
                        <Typography variant="body2">{moment(campground.createdAt).fromNow()}</Typography>
                    </div>
                    
                        <div className='overlay2'>
                            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(campground._id)}><MoreHorizIcon fontSize="medium" onClick={openPost}/></Button>
                        </div>
                   
                    <h2 className='card-title'>{campground.title}</h2>
                    <div className='card-location'>
                        <Typography variant="body2" color="textSecondary" component="h2">Location: {campground.location}</Typography>
                    </div>
                    <h5 className='card-price'>Price: {campground.campgroundPrice}</h5>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{campground.description}</Typography>
                    </CardContent>
            </div>
            
            <div className='btns'>
                <Button color='primary' className='card-btn' disabled={!user} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.name === campground?.name) && (
                    <Button color='secondary' className='card-btn2' onClick={() => dispatch(deleteCampground(campground._id))}><DeleteIcon fontSize="small" />Delete</Button>
                )} 
                {(user?.name === campground?.name) && (
                    <Button color='primary' className='cardAction' onClick={handleEdit}><EditIcon fontSize="small" />Edit</Button>
                )} 
            </div>
        </div>
    );
}


export default Campground;