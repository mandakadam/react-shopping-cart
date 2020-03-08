import React, { Component } from 'react';
import Products from  './components/Products';
import Filter from  './components/Filter';
import 'bootstrap/dist/css/bootstrap.min.css'
import Basket from './components/Basket';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products:[],
      filteredProducts: [],
      cartItems:[],
      size:'',
      sort:'lowestprice'
    }
  }

  componentDidMount(){

    fetch('http://localhost:9000/products')
    .then(res => {
      return res.json()
    })
    .catch(err=>{
      console.log(err)
      fetch("db.json")
      .then(res => res.json())
      .then(data => data.products)
    })
    .then(data=>{
      console.log(data)
      this.setState({ products: data });
      this.listProducts();

    });

    
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
    

  }
  listProducts = () =>{
      this.setState(state=>{
        if(state.sort ==="lowestprice"){
            state.products.sort((a,b) => (a.price > b.price ? 1 : -1))
        }
        else if(state.sort ==="highestprice"){
          state.products.sort((a,b) => (a.price < b.price  ?   1 : -1))
        }
        else{
          state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
        if(state.size !== ""){
          return{
            filteredProducts: state.products.filter(a=>{
                return a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
            })
          }
        }
       
        return{
          filteredProducts: state.products
        }
      });

  }
  handleAddToCart = (e, item) =>{
    const cartItems = this.state.cartItems;
    let productAlreadyInCart = false

    cartItems.forEach(cp=>{
      if(cp.id === item.id){
        cp.count += 1;
        productAlreadyInCart = true
      }
    })
    if(!productAlreadyInCart){
      cartItems.push({...item, count:1})
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    this.setState({
      cartItems : cartItems
    })
  }
  handleRemoveFromCart = (e, item) =>{
    const cartItems = this.state.cartItems.filter(a=>{
      return a.id !== item.id;
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    this.setState({cartItems: cartItems})
  }
  handleSortChange =  (e) => {
    console.log(e.target.value)
    this.setState({ sort:e.target.value })
    this.listProducts();
  }
  handleSizeChange =  (e) => {
    console.log(e.target.value)
    this.setState({ size:e.target.value })
    this.listProducts();
  }
  render(){
    return(
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-brand">Shopping Cart</div>
        </nav>
        <div className="container-fluid">
        <div className="row pt-3">
          
          <div className="col-lg-9 order-2 order-lg-1">
            <Filter 
            count={this.state.filteredProducts.length}  
            sort={this.state.sort} 
            size={this.state.size} 
            handleSortChange={this.handleSortChange}
            handleSizeChange={this.handleSizeChange}
            />
            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
          </div>
          <div className="col-lg-3 order-1 order-lg-2">
              <h5 className="mb-4">Your Shopping Cart</h5>
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default App;