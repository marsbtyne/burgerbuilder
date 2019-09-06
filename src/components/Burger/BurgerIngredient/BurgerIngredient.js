import React, { Component } from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

// Function - stateless component
// get information about which ingredients to render via props
class BurgerIngredient extends Component {
  render () {
    let ingredient = null;

    switch (this.props.type) {
      case ('bottom-bun'):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case ('top-bun'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case ('meat'):
        ingredient = <div className={classes.Meat}></div>
        break;
      case ('cheese'):
        ingredient = <div className={classes.Cheese}></div>
        break;
      case ('lettuce'):
        ingredient = <div className={classes.Salad}></div>
        break;
      case ('bacon'):
        ingredient = <div className={classes.Bacon}></div>
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;