import React, { useState } from 'react';
import classes from './ForgotPassword.module.scss';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Link } from '@material-ui/core';
import Logo from '../roweb_logo.png';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState({
		email: '',
	});

	const _handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'email') {
			setEmail(value);
		}
		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _sendCode = async () => {
		const isValid = _validate();

		if (isValid) {
			//API Request
			const payload = {
				email,
			};

			const res = await FetchApi.create('/forgot-password', payload);

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
						Forgot Password
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
						<Button onClick={_sendCode} type='submit' fullWidth variant='contained' color='primary' className={classes.space}>
							Send Code
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
