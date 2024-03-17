const getPosts = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(res => res.data);
};

const getPost = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(res => res.data);
};

const postService = {
  getPost,
  getPosts,
};

export default postService;
