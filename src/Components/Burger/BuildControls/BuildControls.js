import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';



const controls = [
    {label:'Salad',type: 'salad'},
    {label:'Bacon',type: 'bacon'},
    {label:'Cheese',type: 'cheese'},
    {label:'Meat',type: 'meat'},
];

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p><b> Current Price</b> : <span><strong>$ {props.price.toFixed(2)}</strong></span></p>
        {controls.map(ctrl =>(
            <BuildControl
            remove = {()=> props.ingredientRemoved(ctrl.type)} 
            added={()=>props.ingredientAdded(ctrl.type)}
             key = {ctrl.label} 
             label = {ctrl.label}
             disabled = {props.disabled[ctrl.type]}/>
        ))}
        <button
         className = {classes.OrderButton} 
         disabled = {!props.purchaseable} onClick={props.ordered}>ORDER NOW!!
         </button>
    </div>

);


export default buildControls;