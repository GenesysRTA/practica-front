import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FetchApi from '../../../libs/FetchApi';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 20,
	});

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const res = await FetchApi.get('/categories', { page: pagination.currentPage, perPage: pagination.perPage });

			if (!res.isError) {
				const { data: tmpCategories, ...tmpPagination } = res.data;
				setCategories(tmpCategories);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getCategories();
	}, [pagination.currentPage]);

	const changePerPage = async (event) => {
		setLoading(true);
		const res = await FetchApi.get('/categories', { page: pagination.currentPage, perPage: event.target.value });
		if (!res.isError) {
			const { data: tmpCategories, ...tmpPagination } = res.data;
			setCategories(tmpCategories);
			setPagination(tmpPagination);
		}
		setLoading(false);
	};

	const goToPreviousPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
	};

	const goToNextPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
	};

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<div>
			<div>
				{pagination.currentPage > 1 && <Button onClick={goToPreviousPage}>Prev</Button>}
				<div>{pagination.currentPage}</div>
				<Button onClick={goToNextPage}>Next</Button>
				<Box sx={{ minWidth: 120, marginTop: 2 }}>
					<FormControl fullWidth>
						<InputLabel>Categories per page</InputLabel>
						<Select value={pagination.perPage} onChange={changePerPage}>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
							<MenuItem value={75}>75</MenuItem>
							<MenuItem value={100}>100</MenuItem>
							<MenuItem value={150}>150</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Parent Id</th>
					</tr>
				</thead>
				<tbody>
					{categories?.map((category) => (
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>
								<Link to={`/dashboard/category/${category.id}`}>{category.name}</Link>
							</td>
							<td>{category.parent_id || '-'}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Categories;
