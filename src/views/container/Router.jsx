import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import Product from '../pages/Product';
import Dashboard from '../pages/Dashboard';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import VerifyEmail from '../pages/VerifyEmail';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/verify-email' element={<VerifyEmail />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/change-password' element={<ChangePassword />} />
				<Route path='/dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='profile' element={<Profile />} />
					<Route path='categories' element={<Categories />} />
					<Route path='category/:id' element={<Category />} />
					<Route path='products/:categoryId' element={<Product />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
