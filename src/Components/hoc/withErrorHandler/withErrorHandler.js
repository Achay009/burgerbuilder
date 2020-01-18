import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal'
import Aux from '../Fux'


const withErrorHandler = (WrappedComponent,axios) => {
  return class extends Component  {
    constructor(props){
        super(props);
        this.state = {
            error : null
        }
    }
    //Component will mount is for funtionality on if the component is going to mount not when it is mounted
      componentWillMount(){
          this.requestInterceptors = axios.interceptors.request.use(req =>{
            this.setState({error : null});
            return req;
          })
          this.responseInterceptors = axios.interceptors.response.use(res => res,error =>{
                this.setState({error : error});
          })
      }
      //Called immedaiately a component is destroyed
      componentWillUnmount(){
        axios.interceptors.request.eject(this.requestInterceptors)
        axios.interceptors.response.eject(this.responseInterceptors)
      }
      errorConfirmedHandler = () => {
        this.setState({error : null});
      }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed ={this.errorConfirmedHandler}>
                       {this.state.error ? this.state.error.message : null }
                    </Modal> 
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;