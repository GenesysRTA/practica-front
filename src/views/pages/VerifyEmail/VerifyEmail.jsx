import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';

const VerifyEmail = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');

	const [errors, setErrors] = useState({
		email: '',
		code: '',
	});

	const _handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'email') {
			setEmail(value);
		}

		if (name === 'code') {
			setCode(value);
		}

		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!email.length) {
			tmpErrors.email = 'Email cannot be empty!';
			isValid = false;
		}

		if (!code.length) {
			tmpErrors.code = 'Code cannot be empty!';
			isValid = false;
		}

		setErrors(tmpErrors);

		return isValid;
	};

	const _verify = async () => {
		const isValid = _validate();

		if (!isValid) {
			return;
		}

		// make API REQUEST
		const payload = {
			email,
			code,
		};

		const res = await FetchApi.create('/verify-email', payload);

		if (!res.isError) {
			navigate('/');
		}
	};

	return (
		<div>
			<div>
				<Form.Group className='mb-3'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name='email'
						type='email'
						placeholder='Enter email'
						value={email}
						isInvalid={errors.email.length}
						onChange={_handleChange}
					/>
					{!!errors.email.length && <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>}
				</Form.Group>
			</div>
			<div>
				<Form.Group className='mb-3'>
					<Form.Label>Code</Form.Label>
					<Form.Control
						name='code'
						type='input'
						placeholder='Enter Input'
						value={code}
						isInvalid={errors.code.length}
						onChange={_handleChange}
					/>
					{!!errors.code.length && <Form.Control.Feedback type='invalid'>{errors.code}</Form.Control.Feedback>}
				</Form.Group>
			</div>
			<div>
				<Button onClick={_verify}>Verify Email</Button>
			</div>
		</div>
	);
};

export default VerifyEmail;
