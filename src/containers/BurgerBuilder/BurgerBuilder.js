import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;

    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  removeIngredientHandler = type => {
    const prevCount = this.state.ingredients[type];
    const prevPrice = this.state.totalPrice;

    if (prevCount <= 0) return;

    const updatedCount = prevCount - 1;
    const newPrice = prevPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientDeleted={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
