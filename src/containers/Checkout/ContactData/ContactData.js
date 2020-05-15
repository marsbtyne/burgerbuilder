import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

  state = {
    orderForm: {
      firstName: {
        elementType: 'input', // html tag
        elementConfig: {
          // attributes for html tag, can set up type, placeholder, etc
          // Will distribute over the created input element
          type: 'text',
          placeholder: 'First Name'
        },
        value: ''
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: ''
      },
      streetNumber: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address #'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Name'
        },
        value: ''
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: ''
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: ''
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fast', displayValue: 'Fastest'},
            {value: 'cheap', displayValue: 'Cheapest'},
            {value: 'numtot', displayValue: 'NUMTOT-Approved'},
            {value: 'premium', displayValue: 'Premium'}
          ]
        }
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Mars Ballantyne',
        address: '252 Broadway',
        email: 'mars.ballantyne'
      },
      deliveryMethod: 'fastest'
    }
    axiosInstance.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false})
      });
  }

  // gets event object since the method is attached to event listener (onChange)
  inputChangedHandler = (event) => {
    console.log(event.target.value);
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) { // key is property names of form elements
      // accessing orderForm for a given key will get us the value
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });

    }
    let form = (
      <form>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={this.inputChangedHandler}
            />
          ))}
          <Button btnType="Success" clicked={this.orderHandler}>Place Order</Button>
        </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      // Wrapper for contact data form
      <div className={classes.ContactData}>
        <h4>Enter your contact information.</h4>
        {form}
      </div>
    );
  }

}


export default ContactData;