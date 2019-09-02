import React from 'react';
import classes from './ToggleButton.css';

const toggleButton = props => {
  return (
    <div className={classes.ToggleButton} onClick={props.toggle}>
      {props.children}
    </div>
  );
};

export default toggleButton;
