import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`, input);
            if (data.success) {
                localStorage.setItem("myBlogAppAccessToken", data.userId)
                localStorage.setItem("accessToken", data.accessToken);
                if (localStorage.getItem("accessToken")) {
                    dispatch(login(true));
                    navigate("/all-blogs");
                } else {
                    dispatch(login(false));
                    navigate("/login");
                }
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return <>
        <div className="card mx-auto p-5" style={{ width: '40rem', marginTop: "150px" }}>

            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Login</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} value={input.email} name="email" required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handleChange} name="password" value={input.password} required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <Link to={"/register"} style={{ marginTop: "20px", textDecoration: "none" }}>Do not have account ? Register here</Link>
        </div>

    </>
}

export default Login;