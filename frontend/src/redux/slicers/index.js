import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem("social-app-theme", action.payload);
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: state => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("social-app");
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatePosts = state.posts.map(post => {
                if (post._id === action.payload.post_id)
                    return action.payload.post;

                return post;
            });
            state.posts = updatePosts;
        },
    },
});

export const { setMode, setFriends, setLogin, setLogout, setPost, setPosts } =
    authSlice.actions;
export default authSlice.reducer;
