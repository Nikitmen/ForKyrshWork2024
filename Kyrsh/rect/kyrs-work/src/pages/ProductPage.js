import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost/get_page.php?action=getProduct&id=${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="product-page">
                <div className="product-container">
                    <div className="product-image-container">
                        <img src={product.main_image_url} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-details">
                        <h1>{product.name}</h1>
                        <p>{product.full_description}</p>
                        <p>{product.price} руб.</p>
                        <p><span>Дата публикации:</span> {new Date(product.created_at).toLocaleString('ru-RU')}</p>
                        <p><span>Адрес:</span> {product.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
