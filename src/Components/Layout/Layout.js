import React, { Component } from 'react';
import Aux from '../hoc/Fux';
import classes from '../Layout/Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';



class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    }

    render(){

            return(
                <Aux>
                    <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                    <SideDrawer  open ={this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                  
                    <main className = {classes.Content}>
                        {this.props.children}
                    </main>
                </Aux>

            );



    }



}
    




  
export default Layout;

