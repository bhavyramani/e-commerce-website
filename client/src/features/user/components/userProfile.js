import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserInfo,
    selectUserOrders,
    updateUserAsync,
} from '../userSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);

    
    const handleRemove = (e, index) => {
        const newUser = {...user, addresses: [...user.addresses]};
        newUser.addresses.splice(index, 1);
        dispatch(updateUserAsync(newUser));
    };

    const handleEdit = (e, addressId) => {
        console.log(addressId);
    };
    return (
        <div>
            <div className=" bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">
                        Name : {user.name ? user.name : "New User"}
                    </h1>
                    <h3 className="text-xl  tracking-tight text-gray-900 mb-7">
                        Email : {user.email}
                    </h3>

                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

                    Your Addresses:
                    {
                        user.addresses.map((address, index) => {
                            return (
                                <div key={'add' + index} className="flex mt-3 justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {address.name}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {address.street}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {address.pincode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">
                                            Phone : {address.phone}
                                        </p>
                                        <p className="text-sm leading-6 text-gray-900">
                                            {address.city}
                                        </p>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <button
                                            onClick={e => handleEdit(e, index)}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={e => handleRemove(e, index)}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Remove
                                        </button>

                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default UserProfile;