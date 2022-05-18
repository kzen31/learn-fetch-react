import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

function App() {
  // jangan lupa untuk membuat data dan setter
  let [hits, setHits] = useState([]);
  let [user, setUser] = useState([]);
  let [user1, setUser1] = useState([]);
  let [post, setPost] = useState([]);

  const fetchUser = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUser(data));
  }

  const fetchUser1 = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUser1(data));
  }

  useEffect(() => {
    // cara 1, langsung tulis isi fetch di dalam useEffect
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => setPost(data));

    fetch("https://hn.algolia.com/api/v1/search?query=foo&tags=story")
      .then(response => response.json())
      .then(data => setHits(data.hits))

    // cara 2, buat function fetch, kemudia panggil di dalam useEffect
    fetchUser();
    fetchUser1();
  }, [])

  return (
    <Fragment>
      <ul>
        {user.map(item => (
          <li key={item.id}>
            <div>{item.id}</div>
            <div>{item.name}</div>
          </li>
        ))}
      </ul>

      <ol>
        {user1.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
          </li>
        ))}
      </ol>

      <ul>
        {post.map(item => (
          <li key={item.id}>
            <div>{item.id}</div>
            <div>{item.title}</div>
            <div>{item.body}</div>
          </li>
        ))}
      </ul>

      <button type="button">
        Search
      </button>

      <ul>
        {hits.map(item => (
          <li key={item.objectID}>
            <div>{item.objectID}</div>
            <div>{item.title}</div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
