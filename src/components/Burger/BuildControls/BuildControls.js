import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Lettuce', type: 'lettuce'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Meat', type: 'meat'},
  { label: 'Cheese', type: 'cheese'}
];


const buildControls = (props) => (
  // loop through all the controls and render a buildControl for each of them
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        key={ctrl.label}
        ingredientLabel={ctrl.label}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      onClick={props.checkout}
      disabled={!props.available}
    >
      Order Now
    </button>
  </div>
);

export default buildControls;