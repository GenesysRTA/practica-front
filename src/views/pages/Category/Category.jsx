import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Spinner, Table } from 'react-bootstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FetchApi from '../../../libs/FetchApi';

const Category = () => {
	const { id } = useParams();
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getInfo = async () => {
			setLoading(true);
			const res = await FetchApi.get(`/category/${id}`);
			const resProducts = await FetchApi.get(`/products/${id}`);

			if (!res.isError) {
				setCategory(res.data);
			}
			if (!resProducts.isError) {
				setProducts(resProducts.data);
			}

			setLoading(false);
		};
		getInfo();
	}, [id]);

	console.log('1', category);
	console.log('2', products);

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Parent Category</th>
					</tr>
				</thead>
				<tbody>
					<tr key={category.id}>
						<td>{category.name}</td>
						<td>{category.parent_id || '-'}</td>
					</tr>
				</tbody>
			</Table>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>
								<Link to={`/dashboard/product/${product.id}`}>{product.name}</Link>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Category;
