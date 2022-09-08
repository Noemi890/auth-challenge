import { useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState('')

  const handleRegister = async ({ username, password }) => {
    const res = await fetch(`${apiUrl}/user/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password
      })
    })

    if (res.ok) {
      alert('registered successfully!')
    }

  };

  const handleLogin = async ({ username, password }) => {
    const res = await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await res.json()

    localStorage.setItem('token', data.token)

    setUser(data.user.username)

    const getMovies = await (await fetch(`${apiUrl}/movie/${data.user.id}`)).json()

    setMovies(getMovies)
  };
  
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem('token')

    const res = await fetch(`${apiUrl}/movie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({
        title,
        description,
        runtimeMins
      })
    })

    const data = await res.json()
    let copy = []

    if(movies.length > 0) {
    copy = movies.slice()
    }
    copy.push(data)

    setMovies(copy)
  }

  return (
    <div className="App">
      {(user) ? (
        <h1>Welcome back, {user}</h1>
      ) : (
        <>
        <h3>Login to see your movies</h3>
        <h4>If you don't have an account, register!</h4>
        </>
      )}
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>{(movies) &&
        (movies.map((movie, i) => {
          return (
            <li key={i}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        }))}
      </ul>
    </div>
  );
}

export default App;