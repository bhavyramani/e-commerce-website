import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';


const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const [selectedEditIndex, setselectedEditIndex] = useState(-1);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [showAddForm, setshowAddForm] = useState(false);

    const handleEdit = (data, index) => {
        const newUser = { ...user, addresses: [...user.addresses] };
        newUser.addresses[index] = data;
        dispatch(updateUserAsync(newUser));
        setselectedEditIndex(-1);
    };

    const handleRemove = (e, index) => {
        const newUser = { ...user, addresses: [...user.addresses] };
        newUser.addresses.splice(index, 1);
        dispatch(updateUserAsync(newUser));
    };

    const handleEditForm = (e, index) => {
        setselectedEditIndex(index);
        setshowAddForm(false);
        const address = user.addresses[index];
        setValue('name', address.name);
        setValue('email', address.email);
        setValue('phone', address.phone);
        setValue('street', address.street);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('pincode', address.pincode);
    };

    const handleAdd = () => {
        setshowAddForm(true);
        setselectedEditIndex(-1);
        setValue('name', '');
        setValue('email', '');
        setValue('phone', '');
        setValue('street', '');
        setValue('city', '');
        setValue('state', '');
        setValue('pincode',);
    };

    return (
        <div className=" bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">
                    Name {user.name ? user.name : 'User'}
                </h1>
                <h3 className="text-xl  tracking-tight text-red-900 mb-7">
                    Email : {user.email}
                </h3>
                {user.role == 'admin' && <h3 className="text-xl  tracking-tight text-red-900 mb-7">
                    Admin Panel
                </h3>}
                <button
                    onClick={e => handleAdd()}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Add New Address
                </button>
                {showAddForm && <form className='bg-white px-5 py-12 pb-10' noValidate onSubmit={
                    handleSubmit((data) => {
                        dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                        setshowAddForm(false);
                        reset();
                    })
                }>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('name', { required: 'Name is Required' })}
                                            id="name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            {...register('email', { required: 'Email is Required' })}
                                            type="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="tel"
                                            {...register('phone', { required: 'Phone is Required' })}
                                            id="phone-number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('street', { required: 'Street-Address is Required' })}
                                            id="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('city', { required: 'City is Required' })}
                                            id="city"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('state', { required: 'State is Required' })}
                                            id="region"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        Pincode
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('pincode', { required: 'pincode is Required' })}
                                            id="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                onClick={e => setshowAddForm(false)}
                                className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold  hover:bg-gray-200 text-gray-600 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Address
                            </button>
                        </div>

                    </div>
                </form >}
            </div>


            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

                Your Addresses:
                {
                    user.addresses?.map((address, index) => {
                        return (
                            <div key={`address-${index}`}>
                                {selectedEditIndex == index && <form className='bg-white px-5 py-12 pb-10' noValidate onSubmit={
                                    handleSubmit((data) => {
                                        handleEdit(data, index);
                                        reset();
                                    })
                                }>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('name', { required: 'Name is Required' })}
                                                            id="name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register('email', { required: 'Email is Required' })}
                                                            type="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Phone Number
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="tel"
                                                            {...register('phone', { required: 'Phone is Required' })}
                                                            id="phone-number"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Street address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('street', { required: 'Street-Address is Required' })}
                                                            id="street-address"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('city', { required: 'City is Required' })}
                                                            id="city"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('state', { required: 'State is Required' })}
                                                            id="region"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Pincode
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('pincode', { required: 'pincode is Required' })}
                                                            id="postal-code"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button
                                                onClick={e => setselectedEditIndex(-1)}
                                                className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold  hover:bg-gray-200 text-gray-600 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </form >}
                                <div key={'address' + index} className="flex mt-3 justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {address.name}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {address.street}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {address.city}
                                        </p>
                                    </div>
                                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">
                                            Phone : {address.phone}
                                        </p>
                                        <p className="text-sm leading-6 text-gray-900">
                                            {address.pincode}
                                        </p>
                                        <div className="shrink-0 flex flex-col sm:flex sm:flex-row sm:gap-5 sm:items-end">
                                            <button
                                                onClick={e => handleEditForm(e, index)}
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500  text-right"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={e => handleRemove(e, index)}
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500 text-right"
                                                disabled={selectedEditIndex == index}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default UserProfile;
