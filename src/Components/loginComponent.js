import React, { Component } from "react";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers:{},
            loginData: {
                email: "",
                password: "",
                loginType: ""
            }
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    onChangeInput= (e) => {

        const { loginData } = { ...this.state };
        const currentState = loginData;
        const { name, value } = e.target;
        currentState[name] = value;
      
        this.setState({ loginData: currentState });

    }
    updateState(dt) {
        this.setState({ loginData: dt });
    }
    handleLogin() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.loginData)
        };
        fetch('login', requestOptions)
            .then((resp) => resp.json())
            .then(function(data) {
             this.updateState(data);
                
            }).catch(function(error) {
                console.log(error);
            }); 
    }

    render() {
        const {loginData} = this.state;
        console.log(loginData);
        return (
            <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" value={this.state.loginData.email}  onChange={this.onChangeInput}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={this.onChangeInput}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={this.handleLogin}>Submit</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
        );
    }
}