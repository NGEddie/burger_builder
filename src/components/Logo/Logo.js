import React from 'react';

import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => {
  return (
    <div className={styles.Logo}>
      <img src={burgerLogo} alt="Burger Builder Logo" />
    </div>
  );
};

export default logo;
