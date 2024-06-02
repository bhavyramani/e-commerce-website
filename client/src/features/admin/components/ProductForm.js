import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product-list/ProductSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../product-list/ProductAPI';

const ProductForm = () => {
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const params = useParams();
    const selectedProduct = useSelector(selectProductById);

    const handleDelete = ()=>{
        const product = {...selectedProduct[0]};
        product.deleted = true;
        dispatch(updateProductAsync(product));
    };

    useEffect(() => {
        if (params.id)
            dispatch(fetchProductByIdAsync(params.id));
        else
            dispatch(clearSelectedProduct());
    }, [params.id, dispatch]);

    useEffect(() => {
        if (!selectedProduct || !params.id)
            return;
        setValue('title', selectedProduct[0].title);
        setValue('description', selectedProduct[0].description);
        setValue('price', selectedProduct[0].price);
        setValue('discountPercentage', selectedProduct[0].discountPercentage);
        setValue('stock', selectedProduct[0].stock);
        setValue('thumbnail', selectedProduct[0].images[0]);
        if (selectedProduct[0].images.length > 1)
            setValue('image1', selectedProduct[0].images[1]);
        if (selectedProduct[0].images.length > 2)
            setValue('image2', selectedProduct[0].images[2]);
        if (selectedProduct[0].images.length > 3)
            setValue('image3', selectedProduct[0].images[3]);
    }, [selectedProduct, params.id, dispatch]);
    return (
        <div>
            <form noValidate
                onSubmit={handleSubmit((data) => {
                    const product = { ...data }
                    if(product.images)
                        delete product.images;
                    product.images = [product.thumbnail];
                    delete product.thumbnail;
                    for (let i = 1; i <= 3; i++) {
                        product.images.push(product[`image${i}`]);
                        delete product[`image${i}`];
                    }
                    product.price = +product.price;
                    product.discountPercentage = +product.discountPercentage;
                    product.stock = +product.stock;
                    if (params.id){
                        product.id = params.id;
                        dispatch(updateProductAsync(product));
                    }
                    else{
                        dispatch(createProductAsync(product));
                        reset();
                    }
                })}
            >
                <div className="space-y-12 bg-white p-12 text-left">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
                            Add Product
                        </h2>


                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:px-16 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="text"
                                            {...register('title', {
                                                required: 'Product Name is Required'
                                            })}
                                            id="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register('description', {
                                            required: 'Description is Required'
                                        })}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="number"
                                            {...register('price', {
                                                required: 'Price is Required',
                                                min: 1
                                            })}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="number"
                                            {...register('discountPercentage', {
                                                required: 'Discount is Required',
                                                min: 0,
                                                max: 100
                                            })}
                                            id="discount"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="number"
                                            {...register('stock', {
                                                required: 'Stock is Required',
                                                min: 0
                                            })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="text"
                                            {...register('thumbnail', {
                                                required: 'Thumbnal is Required'
                                            })}
                                            id="thumbnail"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="text"
                                            {...register('image1')}
                                            id="image1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="text"
                                            {...register('image2')}
                                            id="image2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                        <input
                                            type="text"
                                            {...register('image3')}
                                            id="image3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select {...register('brand', {
                                        required: 'Brand is Required'
                                    })}>
                                        <option>Choose Brand</option>
                                        {
                                            brands.map((brand) => {
                                                return (
                                                    <option value={brand.vlaue}>{brand.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select {...register('category', {
                                        required: 'Category is Required'
                                    })}>
                                        <option>Choose Category</option>
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <option value={category.vlaue}>{category.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    {params?.id && <button
                        onClick={handleDelete}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete
                    </button>}
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm;
