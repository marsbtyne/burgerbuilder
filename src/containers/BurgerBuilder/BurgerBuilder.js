import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


import axiosInstance from '../../axios-orders';


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
    ingredients: null,
    totalPrice: 3,
    available: false,
    checkout: false,
    loading: false,
    error: false,
  }

  componentDidMount (){
    axiosInstance.get('/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {this.setState({error: true})});
  }
  updateAvailableState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({
      available: sum > 0,
    });
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
    this.updateAvailableState(updatedIngredients);
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
    this.updateAvailableState(updatedIngredients);
  }

  checkoutButtonHandler = () => {
    this.setState({
      checkout: true
    });
  }

  modalClosedHandler = () => {
    this.setState({
      checkout: false
    });
  }

  checkoutHandler = () => {
    // 
    // Go to checkout component instead
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });

  }

  

  render () {
    const disabledState = {
      ...this.state.ingredients
    }
    for (let key in disabledState) {
      disabledState[key] = (disabledState[key] <= 0)
    }
    let orderSummary = null;

    let burger = this.state.error ? 
      <p>The application is not available. Please try again later. </p> :
      <Spinner />
    if (this.state.ingredients) {
      orderSummary = 
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.modalClosedHandler}
          continueCheckout={this.checkoutHandler}
          price={this.state.totalPrice}
        />;
      burger = 
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            checkout={this.checkoutButtonHandler}
            disabled={disabledState}
            price={this.state.totalPrice}
            available={this.state.available}
          />
        </Aux>
    }
    if (this.state.loading){
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal
          display={this.state.checkout}
          modalClosed={this.modalClosedHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

// Wrap the burgerBuilder with the error handler hoc, which is a function that returns the wrapped component with an error modal

export default withErrorHandler(BurgerBuilder, axiosInstance);