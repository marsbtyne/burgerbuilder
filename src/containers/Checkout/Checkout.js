import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: null,
    price: 0,
  }

  // Changing to Will Mount means it gets run before render child component so we have access to props 
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }


  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients = {this.state.ingredients} 
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* Nested route - load ContactData below checkout summary
         load something for a path, which depends on the path we're currently on */}
        <Route
          path={this.props.match.path + '/contact-data'}
          // Use render prop, which takes method where you output JSX
          // pass props on since you get them in the render method, then distribute to Contact Data
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }

}


export default Checkout;