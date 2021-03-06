import React, { Component } from 'react';
import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: '',
    department: ''
}

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: { ...initialUser},
            message: ''
        }
    }
    
    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios
        .post(`${url}/api/register`, this.state.user)
        .then(response => {
            if(response.status === 201){
                this.setState({
                    message: 'Registration successful',
                    user: {...initialUser}
                })
            }else{
                throw new Error();
            }
        })
        .catch(error => {
            this.setState({
                message: 'Registration failed',
                user: {...initialUser}
            })
        })
    }

    render(){
        return(
            <section>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={this.state.user.username} 
                        onChange={this.inputHandler}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    />

                    <label htmlFor='department'>Department</label>
                    <input
                        type='text'
                        id='department'
                        name='department'
                        value={this.state.user.department}
                        onChange={this.inputHandler}
                    />
                    <button type="submit">Register</button>
                </form>
                {this.state.message ? (<h4>{this.state.message}</h4>) : undefined}
            </section>
        );
    }
}

export default Register;