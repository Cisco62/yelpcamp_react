import React, { useState } from 'react';
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleAuth, signin, signup } from '../../actions/auth';


const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const onSuccess = (res) => {

        try {
            let userObject = jwt_decode(res.credential)

            const user = {
                email: userObject.email,
                family_name: userObject.family_name,
                given_name: userObject.given_name,
                sub: userObject.sub,
                picture: userObject.picture,
                name: userObject.name,
            }

            dispatch(googleAuth(user, navigate));

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastname' label='Last Name' handleChange={handleChange} half />
                                </>

                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' variant='contained' fullWidth color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin onSuccess={onSuccess} onError={() => { console.log('Login Failed') }} />
                    <Grid container justifyContent='flex-end'>
                        <Grid style={{ marginTop: '10px' }} item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;