
import React, { Component } from 'react';

class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
            txtName: '',
            txtPhone: '',
            txtEmail: ''
        };
    }

    render() {
        return (
            <div className="align-center">
                <h2 className="text-center">SIGN-UP</h2>
                <form>
                    <table className="align-center">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.txtUsername}
                                        onChange={(e) => this.setState({
                                            txtUsername: e.target.value
                                        })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input
                                        type="password"
                                        value={this.state.txtPassword}
                                        onChange={(e) => this.setState({
                                            txtPassword: e.target.value
                                        })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.txtName}
                                        onChange={(e) => this.setState({
                                            txtName: e.target.value
                                        })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.txtPhone}
                                        onChange={(e) => this.setState({
                                            txtPhone: e.target.value
                                        })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input
                                        type="email"
                                        value={this.state.txtEmail}
                                        onChange={(e) => this.setState({
                                            txtEmail: e.target.value
                                        })}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="submit" value="SIGN-UP" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default SignupComponent;
