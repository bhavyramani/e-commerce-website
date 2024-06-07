import React, { useEffect, useState } from 'react'
import { ITEMS_PER_PAGE } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/OrderSlice';
import { EyeIcon, PencilIcon } from '@heroicons/react/16/solid';
import Pagination from '../../common/Pagination';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const [editableOrderId, seteditableOrderId] = useState(-1);
    
    useEffect(() => {
        handlePage();
    }, [dispatch]);

    const handleShow = (order) => {
        
    };

    const handleEdit = (order) => {
        seteditableOrderId(order.id);
    };

    const handleUpdate = (e, order) => {
        dispatch(updateOrderAsync({ ...order, status: e.target.value }));
        seteditableOrderId(-1);
    };

    const handlePage = (e, page) => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE*20};
        dispatch(fetchAllOrdersAsync(pagination));
    };

    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-blue-200 text-blue-600';
            case 'canceled':
                return 'bg-red-200 text-red-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">#</th>
                                    <th className="py-3 px-6 text-left">Items</th>
                                    <th className="py-3 px-6 text-center">Total</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Address</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {orders && orders.map((order, i) => 
                                <tr key={'order'+i} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">

                                            </div>
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {order.items.map((item, index) => {
                                            return (
                                                <div key={'item'+index} className="flex items-center">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.product.images[0]}
                                                        />
                                                    </div>
                                                    <span>{item.product.title} - #{item.quantity}</span>
                                                </div>
                                            )
                                        })}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            ${order.totalAmount}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {editableOrderId == order.id ?
                                            <select
                                                onChange={e => handleUpdate(e, order)}
                                                className="py-1 px-3 rounded-full text-xs">
                                                <option value="pending">Pending</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="canceled">Canceled</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                            :
                                            <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                                                {order.status}
                                            </span>}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="">
                                            <strong className='block'>{order.selectedAddress.name}</strong>
                                            <div>{order.selectedAddress.phone}</div>
                                            <div>{order.selectedAddress.city}</div>
                                            <div>{order.selectedAddress.pincode}</div>
                                            <div>{order.selectedAddress.state}</div>

                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <EyeIcon onClick={e => handleShow(order)} className='w-7 h-5'></EyeIcon>
                                            </div>
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">

                                                <PencilIcon onClick={e => handleEdit(order)} className='w-7 h-5'></PencilIcon>

                                            </div>

                                        </div>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminOrders;