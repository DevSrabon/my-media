import React, { useContext,  useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { BiUserCircle } from "react-icons/bi";
const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const { signIn, googleLogin, setLoading } = useContext(AuthContext);
	const [loginError, setLoginError] = useState("");
	
	
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || "/";
	

	const handleLogin = (data) => {
		setLoginError("");
		signIn(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
                setLoading(false);
                toast.success("Login Success");
                navigate(from, { replace: true });
			})
			.catch((error) => {
				setLoginError(error.message);
			});
	};
	const handleGoogleSignIn = () => {
		setLoginError("");
		googleLogin()
			.then((result) => {
				const user = result.user;
				console.log(user);

				savedUser(user.displayName, user.photoURL, user.email,);
                toast.success("Login Success");
                navigate(from, { replace: true });
                
			})
			.catch((error) => setLoginError(error.message));
	};
	const savedUser = (name, email) => {
		const user = { name, email};
		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				
			});
	};

	return (
		<div className="h-[800px] flex justify-center items-center ">
			<div className="w-96 p-7 shadow-2xl">
				<span className="flex justify-center">
					<BiUserCircle className="text-8xl text-slate-400" />
				</span>
				<h2 className="text-xl font-bold text-center text-slate-400">Login</h2>
				<form onSubmit={handleSubmit(handleLogin)}>
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
						<label className="label">
							<span className="label-text">Forget password</span>
						</label>
					</div>
					<input
						className="btn btn-active hover:btn-outline w-full"
						value="Login"
						type="submit"
					/>
					<div>
						{loginError && <p className="text-red-600">{loginError}</p>}
					</div>
				</form>
				<p className="mt-3 text-center">
					New to Doctors Portal{" "}
					<Link className="text-secondary" to="/signup">
						Create new account
					</Link>
				</p>
				<div className="divider text-stone-400">OR</div>
				<button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
					CONTINUE WITH GOOGLE
				</button>
			</div>
		</div>
	);
};

export default Login;
