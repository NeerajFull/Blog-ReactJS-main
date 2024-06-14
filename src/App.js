import './App.css';
import Header from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import MyBlogs from './components/MyBlogs';
import CreateBlog from './components/CreateBlog';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/authSlice';
import { useEffect } from 'react';
import axios from 'axios';
import { setAllBlogs, setMyBlogs } from './redux/blogsSlice';
import AllBlogs from './components/AllBlogs';
import UserBlogs from './components/UserBlogs';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  if (localStorage.getItem("accessToken")) {
    dispatch(login(true));
  } else {
    dispatch(login(false));
  }
  const isLogin = useSelector(state => state.auth.isLogin);
  const userId = localStorage.getItem("myBlogAppAccessToken");

  useEffect(() => {
    const getBlogs = async () => {
      try {
        if (localStorage.getItem("accessToken")) {

          const accessToken = localStorage.getItem("accessToken");
          const [allBlogsResponse, myBlogsResponse] = await Promise.allSettled([
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/all-blogs`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }),
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/user-blog/${userId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
          ]);

          if (allBlogsResponse.status === "fulfilled" && myBlogsResponse.status === "fulfilled") {
            dispatch(setAllBlogs(allBlogsResponse.value.data.blogs));
            dispatch(setMyBlogs(myBlogsResponse.value.data.data.blogs));
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
    getBlogs()
  }, [isLogin]);

  return (
    <div>
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        {isLogin && <>
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/blogs/:id/:name" element={<UserBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </>}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
