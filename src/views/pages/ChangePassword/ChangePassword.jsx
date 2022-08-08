import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';
import classes from './ChangePassword.module.scss';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Link } from '@material-ui/core';
import Logo from '../roweb_logo.png';

const ChangePassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [errors, setErrors] = useState({
		email: '',
		code: '',
		password: '',
	});

	const _handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'email') {
			setEmail(value);
		}
		if (name === 'password') {
			setPassword(value);
		}
		if (name === 'code') {
			setCode(value);
		}
		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _changePassword = async () => {
		const isValid = _validate();

		if (isValid) {
			//API Request
			const payload = {
				email,
				code,
				password,
			};
			const res = await FetchApi.create('/change-password', payload);

			if (!res.isError) {
				navigate('/');
			}
		}
	};

	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!email.length) {
			tmpErrors.email = 'Email cannot be empty!';
			isValid = false;
		}

		if (!password.length) {
			tmpErrors.password = 'Password cannot be empty!';
			isValid = false;
		}

		if (!code.length) {
			tmpErrors.code = 'Code cannot be empty!';
			isValid = false;
		}

		setErrors(tmpErrors);

		return isValid;
	};

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid className={classes.size} item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<img src={Logo} alt='Logo' className={classes.logo}></img>
					</Avatar>
					<Typography component='h1' variant='h5'>
						Change Password
					</Typography>
					<form className={classes.form}>
						<TextField
							onChange={_handleChange}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							value={email}
							label='Email address'
							name='email'
							type='email'
						/>
						<TextField
							onChange={_handleChange}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							value={code}
							label='Code'
							name='code'
							type='input'
						/>
						<TextField
							onChange={_handleChange}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							value={password}
							label='New Password'
							name='password'
							type='password'
						/>
						<Button onClick={_changePassword} type='submit' fullWidth variant='contained' color='primary' className={classes.space}>
							Sign In
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default ChangePassword;
