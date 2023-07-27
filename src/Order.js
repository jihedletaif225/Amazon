import moment from 'moment'
import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import { NumberFormatBase } from 'react-number-format'
   
import { getBasketTotal } from './reducer'

import { useStateValue } from './StateProvider'
import  "./order.css"
const Order = ({order}) => {

    const [{ basket, user }, dispatch] = useStateValue();

    
  return (
    <div className='order'><h2>order</h2>
    <p>{moment.unix(order.data.created)}</p>
    <p className='order__id'>
    <small>{order.id}</small></p>
    
    {order.data.basket.map(item=>(
        <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton
            />
    )) }
    
    <NumberFormatBase
        renderText={(value) => (
          
           <h3 className='rder__total'>Order Total :{value}</h3>
            
         
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
    
    </div>
  )
}

export default Order