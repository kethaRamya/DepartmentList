import React from 'react'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            login: false,
            store: null,
            Add: null,
            validation: false,
            errorMessage: '',

        }
        this.LoginClick = this.LoginClick.bind(this)
    }
    LoginClick() {
        let formData = { "username": this.state.email, "password": this.state.password }   //formdata objec
        console.log("new data", formData)
        if (this.state.email != "" && this.state.password != "") {
            this.setState({ validation: true })
        } else if (this.state.email == "" && this.state.password == "") {
            this.setState({ validation: false });
            this.setState({ errorMessage: 'Please fill in all fields' })
        }

        fetch("http://15.206.118.222:5000/admin/auth/login", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'

            }
        }).then((response) =>
            response.json().then((result) => {
                console.log("token", result.token)
                if (result.status == 200) {

                    localStorage.setItem("login", JSON.stringify({
                        login: true,
                        store: result.token

                    }))
                    localStorage.setItem("username", this.state.email)
                    this.props.history.push('/List')
                }
            })
        )
            .catch((error) => {
                console.log("error", error.message)
            })


    }
    render() {
        return (
            <div className="sty_wel">

                <div className="" style={{}}>

                    <p class="sty_wel">WELCOME</p>
                    <p class="sty_sign">Sign in to your account</p>
                    <p className="error_msg">{this.state.errorMessage}</p>

                    <p style={{ textAlign: 'center' }}>
                        <input type="text" placeholder="Enter Email" onChange={(event) => { this.setState({ email: event.target.value }) }} class="input_st" />
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        <input type="password" placeholder="Enter Password" onChange={(event) => { this.setState({ password: event.target.value }) }} class="input_st" />
                    </p>
                    <div class="div_st">
                        <button class="sty_log" onClick={this.LoginClick}>Login</button>
                    </div>
                    <p class="forgot">Forgot Password ?</p>
                </div>
            </div>
        )
    }
}

