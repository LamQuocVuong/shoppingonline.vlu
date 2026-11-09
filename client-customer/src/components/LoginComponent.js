
import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';

class Login extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            txtUsername: 'sonkk',
            txtPassword: '123'
        };
    }

    render() {
        return (
            <div className="align-center">
                <h2 className="text-center">CUSTOMER LOGIN</h2>
                <form onSubmit={(e) => this.btnLoginClick(e)}>
                    <table className="align-center">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.txtUsername}
                                        onChange={(e) =>
                                            this.setState({
                                                txtUsername: e.target.value
                                            })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Password</td>
                                <td>
                                    <input
                                        type="password"
                                        value={this.state.txtPassword}
                                        onChange={(e) =>
                                            this.setState({
                                                txtPassword: e.target.value
                                            })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="submit"
                                        value="LOGIN"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

    btnLoginClick(e) {
        e.preventDefault();

        const username = this.state.txtUsername.trim();
        const password = this.state.txtPassword;

        if (username && password) {
            this.apiLogin({
                username: username,
                password: password
            });
        } else {
            alert('Please input username and password');
        }
    }

    async apiLogin(account) {
        try {
            const res = await axios.post(
                '/api/customer/login',
                account
            );

            const result = res.data;

            if (result.success === true) {
                this.context.setToken(result.token);
                this.context.setCustomer(result.customer);

                this.props.navigate('/home', {
                    replace: true
                });
            } else {
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                alert(
                    error.response.data.message ||
                    'Login failed. Please check your account.'
                );
            } else {
                alert(
                    'Cannot connect to server. Please try again.'
                );
            }
        }
    }
}

export default withRouter(Login);
