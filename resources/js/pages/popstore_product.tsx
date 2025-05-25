import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}

const PopstorePage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/popstore-products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">POPSTORE Products</h1>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Stock</th>
                        <th className="p-2 border">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className="text-center">
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{product.name}</td>
                            <td className="p-2 border">{product.description}</td>
                            <td className="p-2 border">{product.price.toFixed(2)} ฿</td>
                            <td className="p-2 border">{product.stock}</td>
                            <td className="p-2 border">{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PopstorePage;
