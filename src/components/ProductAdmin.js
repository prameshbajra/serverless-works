import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newproduct: { 
      "productname": "", 
      "id": ""
    },
    products: []
  }

  handleAddProduct = (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    this.setState({ products: [...this.state.products, this.state.newproduct] })
    this.setState({ newproduct: { "productname": "", "id": ""}});
  }

  handleUpdateProduct = (id, name) => {
    // add call to AWS API Gateway update product endpoint here
    const productToUpdate = [...this.state.products].find(product => product.id === id);
    const updatedProducts = [...this.state.products].filter(product => product.id !== id);
    productToUpdate.productname = name;
    updatedProducts.push(productToUpdate);
    this.setState({products: updatedProducts});
  }

  handleDeleteProduct = (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    const updatedProducts = [...this.state.products].filter(product => product.id !== id);
    this.setState({products: updatedProducts});
  }

  fetchProducts = () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
  }

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "productname": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Product Admin</h1>
            <p className="subtitle is-5">Add and remove products using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newproduct.productname}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newproduct.id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products.map((product, index) => 
                        <Product 
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct} 
                          name={product.productname} 
                          id={product.id}
                          key={product.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
