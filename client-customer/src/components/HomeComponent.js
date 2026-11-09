
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newprods: [],
            hotprods: []
        };
    }

    render() {
        const newprods = this.state.newprods
            .filter((item) => item !== null && item !== undefined)
            .map((item, index) => {
                return (
                    <div key={item._id || index} className="inline">
                        <figure>
                            <Link to={'/product/' + item._id}>
                                <img
                                    src={"data:image/jpg;base64," + (item.image || '')}
                                    width="300px"
                                    height="300px"
                                    alt={item.name || ''}
                                />
                            </Link>
                            <figcaption className="text-center">
                                {item.name || ''} <br /> Price: {item.price ?? ''}
                            </figcaption>
                        </figure>
                    </div>
                );
            });

        const hotprods = this.state.hotprods
            .filter((item) => item !== null && item !== undefined)
            .map((item, index) => {
                return (
                    <div key={item._id || index} className="inline">
                        <figure>
                            <Link to={'/product/' + item._id}>
                                <img
                                    src={"data:image/jpg;base64," + (item.image || '')}
                                    width="300px"
                                    height="300px"
                                    alt={item.name || ''}
                                />
                            </Link>
                            <figcaption className="text-center">
                                {item.name || ''} <br /> Price: {item.price ?? ''}
                            </figcaption>
                        </figure>
                    </div>
                );
            });

        return (
            <div>
                <div className="align-center">
                    <h2 className="text-center">NEW PRODUCTS</h2>
                    {newprods}
                </div>

                {hotprods.length > 0 ? (
                    <div className="align-center">
                        <h2 className="text-center">HOT PRODUCTS</h2>
                        {hotprods}
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }

    componentDidMount() {
        this.apiGetNewProducts();
        this.apiGetHotProducts();
    }

    apiGetNewProducts() {
        axios.get('/api/customer/products/new')
            .then((res) => {
                const result = Array.isArray(res.data) ? res.data : [];
                this.setState({
                    newprods: result.filter(
                        (item) => item !== null && item !== undefined
                    )
                });
            })
            .catch((error) => {
                console.error('Get new products error:', error);
                this.setState({ newprods: [] });
            });
    }

    apiGetHotProducts() {
        axios.get('/api/customer/products/hot')
            .then((res) => {
                const result = Array.isArray(res.data) ? res.data : [];
                this.setState({
                    hotprods: result.filter(
                        (item) => item !== null && item !== undefined
                    )
                });
            })
            .catch((error) => {
                console.error('Get hot products error:', error);
                this.setState({ hotprods: [] });
            });
    }
}

export default Home;
