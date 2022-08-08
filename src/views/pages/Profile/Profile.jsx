import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import FetchApi from '../../../libs/FetchApi';
import classes from './Profile.module.scss';
import ProfileImage from './profile.png';

const Profile = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			setLoading(true);
			const res = await FetchApi.get('/user');

			if (!res.isError) {
				setUser(res);
			}
			setLoading(false);
		};
		getUser();
	}, []);

	console.log(user);

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<div className={classes.action}>
			<div className={classes.profile}>
				<img src={ProfileImage} alt='Profile' />
				<div className={classes.menu}>
					<h3>
						Name
						<br />
						<span>Customer</span>
					</h3>
					<ul>
						<li>Email:---</li>
						<li>
							<div className={classes.center}>
								<a href='/change-password'>Change Password</a>
							</div>
						</li>
						<li>
							<div className={classes.center}>
								<a href='#'>Log Out</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Profile;
