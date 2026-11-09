
import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          onClick={() => this.trItemClick(item)}
          style={{ cursor: 'pointer' }}
        >
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer?.name || ''}</td>
          <td>{item.customer?.phone || ''}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ? (
              <div>
                <span
                  className="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.lnkApproveClick(item._id);
                  }}
                >
                  APPROVE
                </span>
                {' | '}
                <span
                  className="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.lnkCancelClick(item._id);
                  }}
                >
                  CANCEL
                </span>
              </div>
            ) : (
              <div />
            )}
          </td>
        </tr>
      );
    });

    let items = [];

    if (this.state.order && Array.isArray(this.state.order.items)) {
      items = this.state.order.items.map((item, index) => {
        const product = item.product || {};

        return (
          <tr key={product._id || index}>
            <td>{index + 1}</td>
            <td>{product._id || ''}</td>
            <td>{product.name || ''}</td>
            <td>
              {product.image ? (
                <img
                  src={'data:image/jpg;base64,' + product.image}
                  width="35px"
                  height="35px"
                  alt={product.name || ''}
                />
              ) : null}
            </td>
            <td>{product.price ?? ''}</td>
            <td>{item.quantity}</td>
            <td>
              {product.price != null
                ? product.price * item.quantity
                : ''}
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">ORDER LIST</h2>

          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust. name</th>
                <th>Cust. phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

              {orders}
            </tbody>
          </table>
        </div>

        {this.state.order && (
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>

            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>

                {items}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  // Select order to view details
  trItemClick(item) {
    this.setState({ order: item });
  }

  // Approve order
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  // Cancel order
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  // APIs
  apiGetOrders() {
    const config = {
      headers: {
        'x-access-token': this.context.token
      }
    };

    axios
      .get('/api/admin/orders', config)
      .then((res) => {
        const result = Array.isArray(res.data) ? res.data : [];

        this.setState((prevState) => {
          const selectedOrder = result.find(
            (item) =>
              prevState.order &&
              item._id === prevState.order._id
          );

          return {
            orders: result,
            order: selectedOrder || (result.length > 0 ? result[0] : null)
          };
        });
      })
      .catch((error) => {
        console.error('Get orders error:', error);
      });
  }

  // Update order status
  apiPutOrderStatus(id, status) {
    const body = {
      status: status
    };

    const config = {
      headers: {
        'x-access-token': this.context.token
      }
    };

    axios
      .put('/api/admin/orders/status/' + id, body, config)
      .then((res) => {
        if (res.data) {
          this.apiGetOrders();
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('Update order status error:', error);
        alert('Cannot update order status!');
      });
  }
}

export default Order;
