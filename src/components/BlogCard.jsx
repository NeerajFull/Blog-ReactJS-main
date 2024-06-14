import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLikes } from "../redux/blogsSlice";


const BlogCard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = localStorage.getItem("myBlogAppAccessToken");
    const [likes, setLikes] = useState(props.likes);
    const [isLiked, setIsLiked] = useState(props.isLiked);

    const dateFormat = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let d = new Date(date);
        const dt = d.getDate();
        const month = monthNames[d.getMonth()];
        const year = d.getFullYear();

        return `${month}  ${dt} , ${year}`
    }

    const handleLike = async (payload) => {
        try {
            if (localStorage.getItem("accessToken")) {
                const accessToken = localStorage.getItem("accessToken");
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/like-dislike-user-blog/`, payload, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (data.success) {
                    dispatch(updateLikes({...payload, likedBy: data.data.likedBy}));
                    setIsLiked(data.data.likedBy.includes(userId));
                    setLikes(data.data.likedBy.length);
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


    return <>

        <div className="card mb-3" style={{ width: '32rem', margin: "auto", marginTop: "80px" }}>
            <div style={{ display: "flex" }}>
                <h5 style={{ borderRadius: "50%", backgroundColor: "pink", width: "35px", marginLeft: "10px", marginTop: "10px", textAlign: "center", padding: "5px" }}>{props.username[0]}</h5>
                <Link className="card-name mx-2 mt-2 ml-3 text-dark" to={`/blogs/${props.userId}/${props.username}`}>{props.username}</Link>
            </div>

            <p className="mr-5" style={{ fontSize: "12px", textAlign: "end" }}>{dateFormat(props.createdAt)}</p>
            <h5 className="card-title ml-4">{props.title}</h5>
            {props.userId && localStorage.getItem("myBlogAppAccessToken") && props.userId === localStorage.getItem("myBlogAppAccessToken") ?
                <div style={{ display: "flex", marginLeft: "420px", marginBottom: "10px" }} >
                    <EditIcon blogId={props.blogId} userId={props.userId} description={props.description} title={props.title} image={props.image} />
                    <DeleteIcon blogId={props.blogId} userId={props.userId} />
                </div>
                : ""
            }

            <div className="card-body">
                <img
                    className="card-img-top"
                    style={{ width: '29rem', height: "30rem" }}
                    src={props.image}
                    alt="Card cap"
                />
                <p className="card-text mt-2">{props.description}</p>
                <i className="fa-regular fa-thumbs-up h3 mr-3 like" style={isLiked ? { color: "red" } : { color: "black" }} onClick={() => handleLike({ postId: props.blogId, userId: userId })} ></i>

                <p className="text-muted">{likes}</p>
            </div>
        </div>


    </>
}

export default BlogCard;