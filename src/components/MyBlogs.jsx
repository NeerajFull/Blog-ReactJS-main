import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const MyBlogs = () => {
    const userId = localStorage.getItem("myBlogAppAccessToken");
    const myBlogs = useSelector(state => state.blogs.myBlogs);

    return <>
        {<h1 style={{ textAlign: "center", marginTop: "60px" }}>My Blogs</h1>}
        {
            myBlogs.length > 0 ? myBlogs.map((blog, id) => {
                return (
                    <BlogCard key={id} userId={blog.user._id} blogId={blog._id} username={blog.user.username} createdAt={blog.createdAt} title={blog.title} description={blog.description} image={blog.image} likes={blog.likedBy.length} isLiked={blog.likedBy.includes(userId)} />
                )
            }) : <h1 style={{ textAlign: "center", margin: "auto" }} >No Blog Found , please create <Link to={"/create-blog"} >Create Blog</Link> </h1>
        }
    </>
}

export default MyBlogs;