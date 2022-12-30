import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
	const { createUser, updateUser } = useContext(AuthContext);
	console.log(createUser);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const navigate = useNavigate();

	const [signUError, setSignUpError] = useState(true);
	const handleSignUp = (data) => {

		console.log(data);
		setSignUpError("");
		
		
		createUser(data.email, data.password, data.photoURL)
			.then((result) => {
				const user = result.user;
				console.log(user);
				toast("User Created Successfully");
				const userInfo = {
					displayName: data.name,
					photoURL: data.photoURL,
				};
				updateUser(userInfo)
					.then(() => {
						savedUser(data.name, data.email);
					})
					.catch((err) => console.error(err));
				setTimeout(() => {}, 100);
			})
			.catch((err) => {
				setSignUpError(err.message);
			});
	};

	const savedUser = (name, email, photoURL) => {
		const user = { name, email, photoURL };
		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				navigate("/");
			});
	};

	return (
		<div className="h-[800px] flex justify-center items-center ">
			<div className="w-96 p-7 shadow-2xl">
				<span className="flex justify-center">
					<BiUserCircle className="text-8xl text-slate-400" />
				</span>
				<h2 className="text-xl font-bold text-center text-slate-400">
					Sign Up
				</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="text"
							{...register("name", {
								required: "Name Address is required",
							})}
						/>
						{errors.name && (
							<p className="text-red-600">{errors.name?.message}</p>
						)}
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="text"
							{...register("email", {
								required: "Email Address is required",
							})}
						/>
						{errors.email && (
							<p className="text-red-600">{errors.email?.message}</p>
						)}
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be six character or longer",
								},
							})}
						/>
						{errors.password && (
							<p className="text-red-600">{errors.password?.message}</p>
						)}
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Photo</span>
						</label>
						<input
							className="file-input file-input-bordered w-full max-w-xs"
							type="text"
							{...register("photoURL", {
								required: "Photo is required",
							})}
						/>
						{errors.img && (
							<p className="text-red-600">{errors.img?.message}</p>
						)}
					</div>
					<input
						className="btn btn-active hover:btn-outline w-full mt-3"
						value="Sign Up"
						type="submit"
					/>
					{signUError && <p>{signUError}</p>}
				</form>
				<p className="mt-3 text-center">
					Already have an account?{" "}
					<Link className="text-secondary " to="/login">
						Please login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
