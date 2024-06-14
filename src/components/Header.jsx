import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/authSlice";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.auth.isLogin);
    const userId = localStorage.getItem("myBlogAppAccessToken");

    const handleLogout = () => {
        try {

            dispatch(login(false));
            navigate("/login")
            localStorage.removeItem("myBlogAppAccessToken");
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }
    

    return (
        <>
            <nav className="navbar navbar-light bg-light justify-content-between" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1 }}>
                <Link to={"/"} className="navbar-brand">Social Circle</Link>
                <div className="form-inline">
                    {isLogin && <>
                        <NavLink to={"/all-blogs"}><button className="btn btn-outline-info mr-sm-2 my-2 my-sm-0" >ALL BLOGS</button> </NavLink>
                        <NavLink to={"/create-blog"}><button className="btn btn-outline-secondary mr-sm-2 my-2 my-sm-0" >CREATE BLOG</button></NavLink>
                        <NavLink to={`/my-blogs`}> <button className="btn btn-outline-warning mr-sm-2 my-2 my-sm-0" >MY BLOGS</button></NavLink>
                        <NavLink to={"/login"}><button onClick={handleLogout} className="btn btn-outline-danger mr-sm-2 my-2 my-sm-0" >LOGOUT</button></NavLink>
                    </>}

                    {!isLogin && <>
                        <NavLink to={"/login"}><button className="btn btn-outline-primary mr-sm-2 my-2 my-sm-0" > LOGIN</button></NavLink>
                        <NavLink to={"/register"}><button className="btn btn-outline-success mr-sm-2 my-2 my-sm-0" > REGISTER</button></NavLink>
                    </>}
                </div>
            </nav>
        </>
    )
}

export default Header;