
import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
    static contextType = MyContext;

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
        if (!this.context.token) {
            return <Navigate replace to="/login" />;
        }

        return (
            <div className="align-center">
                <h2 className="text-center">MY PROFILE</h2>

                <form onSubmit={(e) => this.btnUpdateClick(e)}>
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
                                <td>Name</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.txtName}
                                        onChange={(e) =>
                                            this.setState({
                                                txtName: e.target.value
                                            })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Phone</td>
                                <td>
                                    <input
                                        type="tel"
                                        value={this.state.txtPhone}
                                        onChange={(e) =>
                                            this.setState({
                                                txtPhone: e.target.value
                                            })
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>
                                    <input
                                        type="email"
                                        value={this.state.txtEmail}
                                        onChange={(e) =>
                                            this.setState({
                                                txtEmail: e.target.value
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
                                        value="UPDATE"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

    componentDidMount() {
        const customer = this.context.customer;

        if (customer) {
            this.setState({
                txtUsername: customer.username || '',
                txtPassword: customer.password || '',
                txtName: customer.name || '',
                txtPhone: customer.phone || '',
                txtEmail: customer.email || ''
            });
        }
    }

    btnUpdateClick(e) {
        e.preventDefault();

        const {
            txtUsername,
            txtPassword,
            txtName,
            txtPhone,
            txtEmail
        } = this.state;

        if (
            txtUsername &&
            txtPassword &&
            txtName &&
            txtPhone &&
            txtEmail
        ) {
            const customer = {
                username: txtUsername,
                password: txtPassword,
                name: txtName,
                phone: txtPhone,
                email: txtEmail
            };

            if (this.context.customer && this.context.customer._id) {
                this.apiPutCustomer(
                    this.context.customer._id,
                    customer
                );
            } else {
                alert('Customer information not found. Please login again.');
            }
        } else {
            alert(
                'Please input username and password and name and phone and email'
            );
        }
    }

    async apiPutCustomer(id, customer) {
        const config = {
            headers: {
                'x-access-token': this.context.token
            }
        };

        try {
            const res = await axios.put(
                '/api/customer/customers/' + id,
                customer,
                config
            );

            const result = res.data;

            if (result) {
                alert('Profile updated successfully');
                this.context.setCustomer(result);
            } else {
                alert('Could not update profile');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            alert('Failed to update profile. Please try again.');
        }
    }
}

export default Myprofile;
