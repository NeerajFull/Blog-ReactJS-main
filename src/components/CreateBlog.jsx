import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAllBlogs, setMyBlogs, setUserBlogs, updateBlogs } from "../redux/blogsSlice";


const CreateBlog = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        title: "",
        description: "",
        image: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const myBlogs = useSelector((state) => state.blogs.myBlogs);
    const allBlogs = useSelector((state) => state.blogs.allBlogs);
    const userBlogs = useSelector((state) => state.blogs.userBlogs);

    useEffect(() => {
        if (location.state) {
            const l = location.state;
            setInput({
                title: l.title,
                description: l.description,
                image: l.image
            })
        } else {
            setInput({
                title: "",
                description: "",
                image: ""
            })
        }
    }, [location])

    const createBlog = async (payload) => {
        try {
            if (localStorage.getItem("myBlogAppAccessToken") && localStorage.getItem("accessToken")) {
                const userId = localStorage.getItem("myBlogAppAccessToken");
                const accessToken = localStorage.getItem("accessToken");
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/create-blog/${userId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (data.success) {
                    dispatch(updateBlogs(data.data.blog));
                    navigate("/my-blogs")
                    setInput({
                        title: "",
                        description: "",
                        image: ""
                    })
                } else {
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    const editBlog = async (payload) => {
        try {
            if (localStorage.getItem("accessToken")) {
                const accessToken = localStorage.getItem("accessToken");
                const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/update-blog/${location.state.blogId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if (data.success) {
                    const myBlog = [];
                    for (let i = 0; i < myBlogs.length; i++) {
                        if (myBlogs[i]._id == location.state.blogId) {
                            myBlog.push(data.data.blog);
                            break;
                        } else {
                            myBlog.push(myBlogs[i]);
                        }
                    }
                    dispatch(setMyBlogs(myBlog));

                    const allBlog = [];
                    for (let i = 0; i < allBlogs.length; i++) {
                        if (allBlogs[i]._id == location.state.blogId) {
                            allBlog.push(data.data.blog);
                            break;
                        } else {
                            allBlog.push(allBlogs[i]);
                        }
                    }
                    dispatch(setAllBlogs(allBlog));

                    const userBlog = [];
                    for (let i = 0; i < userBlogs.length; i++) {
                        if (userBlogs[i]._id == location.state.blogId) {
                            userBlog.push(data.data.blog);
                            break;
                        } else {
                            userBlog.push(userBlogs[i]);
                        }
                    }
                    dispatch(setUserBlogs(userBlog));
                    
                    navigate("/my-blogs");
                } else {
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }


        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.state === null)
            createBlog(input);
        else
            editBlog(input);
    }

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return <>
        <div className="card mx-auto p-5" style={{ width: '40rem', marginTop: "150px" }}>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input type="text" onChange={handleChange} name="title" className="form-control" value={input.title} maxLength="25" id="exampleFormControlInput1" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Picture URL</label>
                    <input type="text" onChange={handleChange} className="form-control" name="image" value={input.image} id="exampleFormControlInput2" placeholder="https://image/indiagate.jpg" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description <span style={{ fontSize: "10px", color: "red" }}>160 Chars allowed only.</span></label>
                    <textarea className="form-control" onChange={handleChange} name="description" value={input.description} id="exampleFormControlTextarea1" maxLength="160" rows={3} style={{ resize: "none" }} />
                </div>

                <button type="submit" className="btn btn-primary">{location.state === null ? "Create Blog" : "Edit Blog"}</button>
            </form>

        </div>
    </>
}

export default CreateBlog;