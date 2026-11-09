import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            txtKeyword: ''
        };
    }

    render() {
        const categoryNames = ['iPhone', 'iPad', 'Macbook'];

        const cates = categoryNames.map((name) => {
            const item = this.state.categories.find(
                (category) => category.name.toLowerCase() === name.toLowerCase()
            );

            if (!item) {
                return null;
            }

            return (
                <li key={item._id} className="menu">
                    <Link to={'/product/category/' + item._id}>
                        {item.name.toUpperCase()}
                    </Link>
                </li>
            );
        });

        return (
            <div className="border-bottom">
                <div className="float-left">
                    <ul className="menu">
                        <li className="menu">
                            <Link to="/">HOME</Link>
                        </li>

                        {cates}
                    </ul>
                </div>

                <div className="float-right">
                    <form className="search">
                        <input
                            type="search"
                            placeholder="Enter keyword"
                            className="keyword"
                            value={this.state.txtKeyword}
                            onChange={(e) => {
                                this.setState({
                                    txtKeyword: e.target.value
                                });
                            }}
                        />

                        <input
                            type="submit"
                            value="SEARCH"
                            onClick={(e) => this.btnSearchClick(e)}
                        />
                    </form>
                </div>

                <div className="float-clear" />
            </div>
        );
    }

    componentDidMount() {
        this.apiGetCategories();
    }

    apiGetCategories() {
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;

            this.setState({
                categories: result
            });
        });
    }

    btnSearchClick(e) {
        e.preventDefault();

        this.props.navigate(
            '/product/search/' + this.state.txtKeyword
        );
    }
}

export default withRouter(Menu);