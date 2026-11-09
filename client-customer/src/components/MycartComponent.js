
import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
    static contextType = MyContext;

    render() {
        const mycart = this.context.mycart.map((item, index) => {
            return (
                <tr key={item.product._id}>
                    <td>{index + 1}</td>
                    <td className="mycart-id">{item.product._id}</td>
                    <td>{item.product.name}</td>
                    <td>{item.product.category?.name}</td>
                    <td>
                        <img
                            className="mycart-image"
                            src={'data:image/jpg;base64,' + item.product.image}
                            width="50px"
                            height="50px"
                            alt=""
                        />
                    </td>
                    <td>{item.product.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price * item.quantity}</td>
                    <td>
                        <span
                            className="link mycart-remove"
                            onClick={() => this.lnkRemoveClick(item.product._id)}
                        >
                            Remove
                        </span>
                    </td>
                </tr>
            );
        });

        return (
            <div className="align-center mycart-page">
                <h2 className="text-center mycart-title">ITEM LIST</h2>

                <table className="datatable mycart-table" border="1">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>{mycart}</tbody>

                    <tfoot>
                        <tr>
                            <td
                                colSpan="7"
                                align="right"
                                className="mycart-total-label"
                            >
                                Total
                            </td>
                            <td className="mycart-total">
                                {CartUtil.getTotal(this.context.mycart)}
                            </td>
                            <td>
                                {this.context.mycart.length > 0 && (
                                    <span
                                        className="link mycart-checkout"
                                        onClick={() => this.lnkCheckoutClick()}
                                    >
                                        CHECKOUT
                                    </span>
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }

    // event-handlers
    lnkRemoveClick(id) {
        const mycart = [...this.context.mycart];
        const index = mycart.findIndex(
            (item) => item.product._id === id
        );

        if (index !== -1) {
            mycart.splice(index, 1);
            this.context.setMycart(mycart);
        }
    }

    lnkCheckoutClick() {
        if (window.confirm('ARE YOU SURE?')) {
            if (this.context.mycart.length > 0) {
                const total = CartUtil.getTotal(this.context.mycart);
                const items = this.context.mycart;
                const customer = this.context.customer;

                if (customer) {
                    this.apiCheckout(total, items, customer);
                } else {
                    this.props.navigate('/login');
                }
            } else {
                alert('Your cart is empty');
            }
        }
    }

    // apis
    apiCheckout(total, items, customer) {
        const body = {
            total: total,
            items: items,
            customer: customer
        };

        const config = {
            headers: {
                'x-access-token': this.context.token
            }
        };

        axios.post('/api/customer/checkout', body, config)
            .then((res) => {
                const result = res.data;

                if (result) {
                    alert('OK BABY!');
                    this.context.setMycart([]);
                    this.props.navigate('/home');
                } else {
                    alert('SORRY BABY!');
                }
            })
            .catch((error) => {
                console.error('Checkout error:', error);
                alert('Checkout failed. Please check your login and try again.');
            });
    }
}

export default withRouter(Mycart);
