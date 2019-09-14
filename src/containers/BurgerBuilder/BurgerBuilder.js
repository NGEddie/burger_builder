import React, { Component } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('https://react-burger-builder-778f4.firebaseio.com/ingrediants.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurcaseState(ingredients) {
    const ingredientsSum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: ingredientsSum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;

    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurcaseState(updatedIngredients);
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
    this.updatePurcaseState(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue');
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Santa Claus',
        address: {
          street: 'Rudolf Way',
          postCode: '65432',
          country: 'Greenland'
        },
        email: 'santa@greenland.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then(response => this.setState({ isLoading: false, purchasing: false }))
      .catch(error => this.setState({ isLoading: false, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can not be found</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientDeleted={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          orderContinue={this.purchaseContinueHandler}
          orderCancel={this.purchaseCancelHandler}
        />
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
