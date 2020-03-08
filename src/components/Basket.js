import React from 'react';
import utils from '../utils';

const Basket =({cartItems, handleRemoveFromCart})=>{
    return(
        <div>
            {cartItems.length === 0
                ? <div className="alert alert-danger">Basket is empty </div>:
                <div>You have {cartItems.length} items in the basket. <hr /></div>
            }
            {
            cartItems.length > 0 &&
            <div>
                <ul className="list-group">
                    {
                        cartItems.map(item=>
                            <li className="list-group-item" key={item.id}>
                                <h6 className="card-title">{item.title}</h6>
                                <div className="d-flex justify-content-between  align-items-center">
                                {item.count} * {utils.formatCurrency(item.price)}
                                <button className="btn btn-danger" onClick={ (e)=>handleRemoveFromCart(e, item)}>X</button>
                                </div>
                            </li>
                        )
                    }
                    <li className="list-group-item" ><b>Total: {utils.formatCurrency(cartItems.reduce((a,b)=>(a+b.price*b.count),0))}</b> </li>
                  
               
                </ul>
             
                <button onClick={() => alert('Todo: Implement checkout page.')} className="btn btn-success btn-block my-3">checkout</button>

            </div>
            }
        </div>
    )
}

export default Basket;