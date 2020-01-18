import React,{Component} from 'react';
import Aux from '../../Components/hoc/Fux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../Components/UI/spinner/Spinner';
import withErrorHandler  from '../../Components/hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad : 0.5,
  cheese : 0.4,
  meat: 1.3,
  bacon : 0.7
}
class BurgerBuilder extends Component{
  constructor(props){
    super(props);
    this.state = {
      ingredients :null,
      totalPrice : 4,
      purchaseable : false,
      purchasing: false,
      loading : false,
      error : false
    }
  }

  componentDidMount(){
    axios.get('https://react-my-burger-26c0d.firebaseio.com/ingredients.json')
    .then(response =>{
        this.setState({ingredients : response.data});
    }).catch(error=>{
      this.setState({error:true})
    })
  }

 
  updatePurchaseState(ingredients){
    
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum,el)=>{
      return sum + el;
    },0);
    this.setState({purchaseable : sum > 0})
  }


  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
   
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ingredients : updatedIngredients,totalPrice : newPrice});
    this.updatePurchaseState(updatedIngredients);

  }

  removeIngredientHandler = (type) => {
    let updatedCounted;
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
       updatedCounted = 0;
    }else{
       updatedCounted = oldCount - 1;
    }
    
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENTS_PRICES[type] 
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({ingredients : updatedIngredients,totalPrice : newPrice});
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () =>{
    this.setState({purchasing:true});
  }
  
  purchaseCancelHandler = () =>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () =>{
    this.setState({loading : true});
    const order = {
      ingredients : this.state.ingredients,
      price : this.state.totalPrice,
      customer : {
        name : 'Achay Uche',
        address : {
          street : 'TestStreet 1',
          zipCode: '41351',
          country : 'Germany'
        },
        email: 'test@test.com',
        deliveryMethod : 'fastest'
      }
    }
    axios.post('/orders.json',order)
    .then((response) => {
      this.setState({loading : false, purchasing: false});
      console.log(response)
    })
    .catch(err => {
      this.setState({loading : false, purchasing: false});
      console.log(err)
    })
  }
  
  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0;
    }


    let orderSummary = null

    let burger = this.state.error ? <p>Oops something went wrong</p> : <Spinner/>

    if(this.state.ingredients){
      burger =  <Aux>
                  <Burger ingredients = {this.state.ingredients}/>                                    
                  <BuildControls 
                  ingredientAdded = {this.addIngredientHandler} 
                  ingredientRemoved = {this.removeIngredientHandler}
                  disabled = {disabledInfo}
                  price = {this.state.totalPrice}
                  ordered = {this.purchaseHandler}
                  purchaseable = {this.state.purchaseable}/>
                </Aux>
      orderSummary = <OrderSummary 
                    ingredients = {this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    totalPrice = {this.state.totalPrice}/>
    }

      

    if(this.state.loading){
      orderSummary = <Spinner/>
    }
   


    return(
        <Aux>
            <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
      
        </Aux>

    );
  }  

}

export default withErrorHandler(BurgerBuilder,axios); 