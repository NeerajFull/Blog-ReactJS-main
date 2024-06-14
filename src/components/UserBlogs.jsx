import BlogCard from "./BlogCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserBlogs } from "../redux/blogsSlice";


const UserBlogs = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = location.pathname.replace("/blogs/", "");
    const personName = path.slice(path.indexOf("/")).replace("/", "");
    const userId = path.slice(0, path.indexOf("/"));
    const userBlogs = useSelector(state => state.blogs.userBlogs);
    const myOwnId = localStorage.getItem("myBlogAppAccessToken");

    const getUserPosts = async () => {
        try {
            if (localStorage.getItem("accessToken")) {

                const accessToken = localStorage.getItem("accessToken");

                const [userBlogsResponse] = await Promise.allSettled([
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/user-blog/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                ]);

                if (userBlogsResponse.status === "fulfilled") {
                    dispatch(setUserBlogs(userBlogsResponse.value.data.data.blogs));
                }
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data.message)
            navigate("/login")
        }

    }

    useEffect(() => {
        getUserPosts();
    }, [userBlogs]);


    return <>
        {<h1 style={{ textAlign: "center", marginTop: "60px" }}>{personName} Blogs</h1>}
        {
            userBlogs.length > 0 ? userBlogs.map((blog, id) => {
                return (
                    <BlogCard key={id} userId={blog.user._id} blogId={blog._id} username={blog.user.username} createdAt={blog.createdAt} title={blog.title} description={blog.description} image={blog.image} likes={blog.likedBy.length} isLiked={blog.likedBy.includes(myOwnId)} />
                )
            }) : <h1 style={{ textAlign: "center", margin: "auto" }} >No Blog Found , please create <Link to={"/create-blog"} >Create Blog</Link> </h1>
        }
    </>
}

export default UserBlogs;