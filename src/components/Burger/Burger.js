import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

  const burger = (props) => {
    // extracts keys of given object and returns array of keys
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]
      .map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey}/>;
      });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    //transform 'cheese' string (from Object.keys) into an arry that contains the number of cheese

    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>
        Please start building your burger
      </p>
    }
    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="top-bun"/>
        {transformedIngredients}
        <BurgerIngredient type="bottom-bun"/>
      </div>
    );
  };
export default (burger);