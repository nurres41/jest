import axios from 'axios'

const getPosts = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts").then((resp) => resp.data)
}

const getPost = (id) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((resp) => resp.data)
}

const postService = {
    getPost,
    getPosts
}

export default postService