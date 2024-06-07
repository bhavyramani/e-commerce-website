import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserInfo,
    selectUserOrders,
} from '../userSlice';
import { fetchLoggedInUserOrdersAsync } from '../userSlice';
import { Navigate } from 'react-router-dom';
import { discountedPrice } from '../../../app/constants';

export default function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);
    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync());
    }, [dispatch]);

    return (
        <div>
            {orders &&
                orders.map((order, i) => {
                    return (
                        <div key={'order' + i} className=" bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {!order.items.length && <Navigate to='/' />}
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 text-left">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">Order #{order.id}</h1>
                                <h3 className="text-xl  tracking-tight text-gray-900 mb-7">
                                    Order Status : {order.status}
                                </h3>
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {order.items?.map((product, index) => (
                                            <li key={product.product.id + '-' + index} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={product.product.thumbnail}
                                                        alt={product.product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.product.href}>{product.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${discountedPrice(product.product)}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500" style={{ "textAlign": "left" }}>{product.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900" style={{ "textAlign": "left" }}>
                                                                Qty {product.quantity}
                                                            </label>
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
                                    <p>Total Items</p>
                                    <p>{order.totalItems}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Amount</p>
                                    <p>${order.totalAmount}</p>
                                </div>
                                Shipping Address:
                                <div className="flex mt-3 justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5 text-left">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {order.selectedAddress.name}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {order.selectedAddress.street}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {order.selectedAddress.city}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">Phone: {order.selectedAddress.phone}</p>
                                        <p className="text-sm leading-6 text-gray-900">{order.selectedAddress.pincode}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}
