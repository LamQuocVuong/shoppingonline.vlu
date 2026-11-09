
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';

class Main extends Component {
    static contextType = MyContext;

    render() {
        if (this.context.token !== '') {
            return (
                <div className="body-admin">
                    <BrowserRouter>
                        <Menu />

                        <Routes>
                            <Route
                                path="/admin/home"
                                element={<Home />}
                            />

                            <Route
                                path="/admin/category"
                                element={<Category />}
                            />

                            <Route
                                path="/admin/product"
                                element={<Product />}
                            />

                            <Route
                                path="/admin/order"
                                element={<Order />}
                            />

                            <Route
                                path="/admin/customer"
                                element={<Customer />}
                            />

                            <Route
                                path="*"
                                element={<Navigate to="/admin/home" />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            );
        }

        return <div />;
    }
}

export default Main;
