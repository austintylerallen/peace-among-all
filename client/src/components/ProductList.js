import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/styles.css';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await axios.get('/api/products', config);
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            await axios.delete(`/api/products/${id}`, config);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory : true)
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const categoryOptions = [
        'Electronics',
        'Sportswear',
        'Home Appliances'
    ];

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                >
                    <option value="">Filter by category</option>
                    {categoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button onClick={() => setShowForm(!showForm)} className="create-product-button">
                    {showForm ? 'Close Form' : 'Create Product'}
                </button>
            </div>
            {showForm && <ProductForm />}
            <div className="product-grid">
                {currentProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${(product.price / 100).toFixed(2)}</p>
                            <button onClick={() => deleteProduct(product._id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                paginate={paginate}
            />
        </div>
    );
};

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default ProductList;
