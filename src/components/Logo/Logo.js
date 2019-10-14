import React from 'react';
// make webpack aware of the fact that we're using the image
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="BuildBurger" />
  </div>
);

export default logo;