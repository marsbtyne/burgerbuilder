import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {


  state = {
    orders: [],
    loading: true //start loading
  }

  // Using didMount because you only want to fetch orders when the page is first loaded
  componentDidMount() {
    axios.get('/orders.json')
    .then(response => {
      const fetchedOrders = [];
      for (let key in response.data) {
        // push the data for a given key, where key is the firebase ID and the value is the order data we want. 
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }
      this.setState({loading: false, orders: fetchedOrders});
    })
    .catch(error => {
      this.setState({loading: false});
    });
  }
  render () {
    // List of orders
    return (
      <div>
        {this.state.orders.map(order => (
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }


}

export default withErrorHandler(Orders, axios);