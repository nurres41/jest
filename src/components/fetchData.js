import React from 'react'
import {useFetch} from '../hooks/useFetch'

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
        <ul key={post.id}>
          <li key={post.id}>
              {post.title}
          </li>
        </ul>
      ))}
    </div>
  )
}

export default FetchData
