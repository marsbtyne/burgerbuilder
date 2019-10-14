import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {

  let attClass = [classes.SideDrawer, classes.Close];
  if (props.show){
    attClass = [classes.SideDrawer, classes.Open];
  } 

  return (
    <Aux>
      <Backdrop display={props.show} clicked={props.closed}/>
      <div className={attClass.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav><NavItems /></nav>
      </div>
    </Aux>
  );

}

export default sideDrawer;