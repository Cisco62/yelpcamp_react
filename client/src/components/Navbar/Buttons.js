import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export const Buttons = () => {
  return (
    <Link to='sign_up'>
      <button className='btn'>Sign Up</button>
    </Link>
  );
}