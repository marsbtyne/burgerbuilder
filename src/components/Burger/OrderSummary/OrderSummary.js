import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }
  
  
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      ingredientKey => {
        return (
          <li key = {ingredientKey}>
            <span style={{textTransform: 'capitalize'}}>
              {ingredientKey}: 
            </span>  
             {this.props.ingredients[ingredientKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Your burger has the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Your total is: ${this.props.price.toFixed(2)}</strong></p>
        <Button
          clicked={this.props.purchaseCanceled}
          btnType="Danger"
        >CANCEL
        </Button>
        <Button
          clicked={this.props.continueCheckout}
          btnType="Success"
        >Continue to Checkout
        </Button>
      </Aux>
    );
  };
}

export default OrderSummary;
