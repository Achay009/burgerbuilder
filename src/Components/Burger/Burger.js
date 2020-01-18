import  React  from "react";
import  classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";


const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey  => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            
            // console.log(igKey + i  +" Has been added" );
            
           return <BurgerIngredient key={igKey+i} type={igKey}/>; 
        });
     }).reduce((arr,el)=>{
        return arr.concat(el);
     },[])
    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please add ingredients!!</p>
    }
    
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;