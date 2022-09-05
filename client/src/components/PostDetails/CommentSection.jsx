import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentCampground } from '../../actions/campgrounds';

const CommentSection = ({ campground }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(campground?.comments);
    const [comment, setComment] = useState('');
    const profile = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const { user } = profile || {};

    const handleClick = async () => {
        const finalComment = `${user?.name}: ${comment}`;

        const newComments = await dispatch(commentCampground(finalComment, campground._id));
        // dispatch(commentCampground(finalComment, campground._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.name && (
                    <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField fullWidth minRows={4} variant='outlined' label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick}>Comment</Button>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default CommentSection;
