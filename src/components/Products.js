import React from 'react';
import utils from '../utils';
const Products = ({products, handleAddToCart}) =>{
    const list = products.map(item=>{
        return (
        <div className="col-lg-4 mb-3 text-center" key={item.id}>
            <div className="card">
                <div className="card-body">
                    {item.title}
                </div>
                <div className="card-body">
                <img src={require(`./../products/${item.sku}_2.jpg`)} alt={item.title} />

                    <p>{item.description}
                    </p>
                    {utils.formatCurrency(item.price)}
                   
                </div>
                <div className="card-footer ">
                    <button className="btn btn-primary" onClick={(e)=>handleAddToCart(e, item)}>Add To Cart</button>
                </div>
            </div>
        </div>
        )
    })
    return(
        <div className="row">
             {list}
        </div>
    )
}

export default Products;
