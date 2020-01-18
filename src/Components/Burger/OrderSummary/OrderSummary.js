
import Aux from '../../hoc/Fux';
import Button from '../../UI/Button/Button'
import React, { Component } from 'react';



class OrderSummary extends Component {
    // constructor(props) {
    //     super(props);
        
    // }

    componentDidUpdate(){
        console.log('[OrderSummary]  Will Update');
    }
    
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key={igKey}><span style={{textTransform : 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><b>Total Price</b> : $ {this.props.totalPrice.toFixed(2)}</p>
                <p> Continue to checkout?</p>
                <Button btnType='Danger' clicked = {this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success'clicked = {this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    };
}

export default OrderSummary;