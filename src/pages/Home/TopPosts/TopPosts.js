
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Spinner from '../../Shared/Spinner';
import TopPost from './TopPost';

const TopPosts = () => {
	const { loading } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/post`)
			.then((res) => res.json())
			.then((data) => setPosts(data));
	}, []);
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="w-96 mx-auto">
			{posts.map((post) => (
				<TopPost key={post._id} post={post} />
			))}
		</div>
	);
};

export default TopPosts;