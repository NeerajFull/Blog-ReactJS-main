import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`, input);
            if (data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return <>
        <div className="card mx-auto p-5" style={{ width: '40rem', marginTop: "150px"  }}>


            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center", marginBottom:"40px"}}>Register </h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input onChange={handleChange} value={input.username} name="username" required type="text" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} value={input.email} name="email" required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handleChange} value={input.password} name="password" required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            <Link to={"/login"} style={{ marginTop: "20px", textDecoration: "none" }}>Already have an account ? Login here</Link>
        </div>

    </>
}

export default Register;