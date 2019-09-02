import React from 'react';

import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = props => {
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="Burger Builder Logo" />
    </div>
  );
};

export default logo;
