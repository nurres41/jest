import React from 'react'
import useFetch from '../hooks/useFetch'

const FetchData = () => {
    const { data, isLoading } = useFetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
            {post.title}
        </div>
      ))}
    </div>
  )
}

export default FetchData
