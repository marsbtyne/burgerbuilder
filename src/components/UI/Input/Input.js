import React from 'react';
import classes from './Input.css';

const input = (props) => {
  //check what the input type is
  //accept attributes set on input as props for input wrapper
  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
      break;
    case ('textArea'):
      inputElement = <textarea 
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
      break;
    case ('select'):
      inputElement = (
        <select
          className = {classes.InputElement}
          value={props.value}
          onChange={props.changed}>
            {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
        </select>
      );
      break;

    default:
      inputElement = <input 
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}/>
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;