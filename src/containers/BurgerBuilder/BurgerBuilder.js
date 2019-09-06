import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const PRICES = {
  lettuce: 0.25,
  cheese: 0.50,
  meat: 1,
  bacon: 0.75
}
class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}; // use 'this' because you're inside a method
  // }
  state = {
    // keys are the names of the ingredients and values are amounts
    ingredients: {
      lettuce: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
    },
    totalPrice: 3
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;

    const priceAddition = PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      alert('No '+ type + ' left to remove!');
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;

    const priceDeduction= PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
  }

  render () {
    const disabledState = {
      ...this.state.ingredients
    }
    for (let key in disabledState) {
      disabledState[key] = (disabledState[key] <= 0)
    }
    return (
      <Aux>
        <Burger
          ingredients={this.state.ingredients}
        />
        <div>Build controls - add / remove ingredients</div>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledState}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;