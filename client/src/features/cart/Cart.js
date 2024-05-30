import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectItems, fetchItemsByUserIdAsync, updateCartAsync, deleteFromCartAsync } from './CartSlice';
import { Link, Navigate } from 'react-router-dom';

export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const totalAmount = items.reduce((amount, item) => amount + item[0].price*item.quantity, 0);
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);
  const handleQuantity = (e, item)=>{
    dispatch(updateCartAsync({...item, quantity: +e.target.value}))
  };

  const handleRemove = (itemId)=>{
    dispatch(deleteFromCartAsync(itemId));
  };

  useEffect(() => { 
    dispatch(fetchItemsByUserIdAsync(user.id));
  }, [dispatch, user?.id]);

  return (
    <div className=" bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {!items.length && <Navigate to='/' />}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">Cart</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((product, index) => (
              <li key={product[0].id+'-'+index} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product[0].thumbnail}
                    alt={product[0].title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product[0].href}>{product[0].title}</a>
                      </h3>
                      <p className="ml-4">${product[0].price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500" style={{ "textAlign": "left" }}>{product[0].brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900" style={{ "textAlign": "left" }}>
                        Qty
                      </label>
                      <select onChange={e=>handleQuantity(e, product)} value={product.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={e=>handleRemove(product.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>{totalItems}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Amount</p>
          <p>${totalAmount}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            to='/checkout'
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              <Link to='/'>
                Continue Shopping
              </Link>
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
