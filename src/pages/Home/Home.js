import React, { useState } from 'react';
import CreatePost from './CreatePost';
import TopPosts from './TopPosts/TopPosts';

const Home = () => {
    const {refetch, setRefetch}= useState(true)
    return (
			<div>
				<CreatePost refetch={refetch} setRefetch={setRefetch} />
				<TopPosts refetch={refetch} setRefetch={setRefetch} />
			</div>
		);
};

export default Home;