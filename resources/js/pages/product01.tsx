import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

export default function Product01Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/product01")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">รายการสินค้า (Product01)</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">ชื่อสินค้า</th>
            <th className="border p-2">หมวดหมู่</th>
            <th className="border p-2">ราคา</th>
            <th className="border p-2">คงเหลือ</th>
            <th className="border p-2">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.price} บาท</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
