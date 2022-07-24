import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    function addProduct() {
        setProducts(prevState => [
        ...prevState,
        {
            id: prevState.length + 101,
            name: "product" + (prevState.length + 1),
            price: (prevState.length + 1) * 100,
            brand: 'some brand',
            description: 'some description',
            pictureUrl: 'http://picsum.photos/201'
        }])
    }

    return (
        <>
            <ProductList products={products} /> 
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
        </>
    )
}