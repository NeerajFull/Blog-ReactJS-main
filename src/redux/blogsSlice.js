import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        myBlogs: [],
        userBlogs: [],
        allBlogs: []
    },
    reducers: {
        setMyBlogs(state, action) {
            state.myBlogs = action.payload;
        },
        setUserBlogs(state, action) {
            state.userBlogs = action.payload;
        },
        setAllBlogs(state, action) {
            state.allBlogs = action.payload;
        },
        updateLikes(state, action) {
            state.allBlogs.forEach(blog => {
                if (blog._id == action.payload.postId) {
                    blog.likedBy = action.payload.likedBy;
                }
            })
            state.myBlogs.forEach(blog => {
                if (blog._id == action.payload.postId) {
                    blog.likedBy = action.payload.likedBy;
                }
            })
            state.userBlogs.forEach(blog => {
                if (blog._id == action.payload.postId) {
                    blog.likedBy = action.payload.likedBy;
                }
            })
        },
        updateBlogs(state, action) {
            state.myBlogs.push(action.payload);
            state.allBlogs.push(action.payload);
            state.userBlogs.push(action.payload);
        },
        editBlog(state, action) {
            
        }
    }
})

export const { setMyBlogs, setUserBlogs, setAllBlogs, updateLikes, updateBlogs, editBlog } = blogSlice.actions;
export default blogSlice.reducer;