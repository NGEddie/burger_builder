import React from 'react';
import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.isOpen) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.isOpen} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationsItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
