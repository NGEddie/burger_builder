import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>£{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(el => (
        <BuildControl
          key={el.label}
          label={el.label}
          added={() => props.ingredientAdded(el.type)}
          deleted={() => props.ingredientDeleted(el.type)}
          disabled={props.disabled[el.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
