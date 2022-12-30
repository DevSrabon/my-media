import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const CreatePost = () => {
	const { user } = useContext(AuthContext);

	console.log(user);
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const imageHostKey = process.env.REACT_APP_imgbb_key;

	const date = new Date();

	const handleAddPost = (data) => {
		const image = data.img[0];
		console.log(image);
		const formData = new FormData();
		formData.append("image", image);
		const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((imgData) => {
				if (imgData.success) {
					
					// save post information into the database
					fetch(`${process.env.REACT_APP_API_URL}/post`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify({
							description: data.description,
							image: imgData.data.url,
							date,
							userEmail: user.email,
							displayName: user.displayName,
							photoURL: user.photoURL,
						}),
					})
						.then((res) => res.json())
						.then((result) => {
								toast.success("Post success");

							reset();
						});
				}
			});
	};
	return (
		<div className="w-full mx-auto p-7 my-10 shadow-2xl rounded-lg">
			<h3 className="text-3xl font-semibold mb-5  text-center text-slate-400">
				{" "}
				Add a post
			</h3>
			<form onSubmit={handleSubmit(handleAddPost)} className="before:">
				<div className="form-control w-full">
					<textarea
						className="input input-bordered h-32 w-full"
						type="text"
						placeholder="Write something"
						{...register("description", {
							required: "Description Required",
						})}
					/>
					{errors.description && (
						<p className="text-red-600">{errors.description?.message}</p>
					)}
				</div>

				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Photo</span>
					</label>
					<input
						className="file-input file-input-bordered w-full max-w-xs"
						type="file"
						{...register("img", {
							required: "Photo is required",
						})}
					/>
					{errors.img && <p className="text-red-600">{errors.img?.message}</p>}
				</div>
				<input
					className="btn btn-sm btn-active hover:btn-outline  mt-3"
					value="Post"
					type="submit"
				/>
			</form>
		</div>
	);
};

export default CreatePost;