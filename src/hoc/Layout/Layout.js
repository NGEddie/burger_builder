import React, { Component } from 'react';

import classes from './Layout.css';
import Aux from './../Aux/Aux';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <div>
          <Toolbar
            toggleVisible={this.state.showSideDrawer}
            toggleSideDrawer={this.toggleSideDrawerHandler}
          />
          <SideDrawer
            isOpen={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
        </div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
