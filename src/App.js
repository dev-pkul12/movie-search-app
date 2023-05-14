import React from 'react'
import './App.css'
import { useEffect, useState } from 'react';

import searchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=your_api_key';

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setsearchTerm] = useState('')

  const searchMovies = async (title) => {
    const responce = await fetch(`${API_URL}&s=${title}`)
    const data = await responce.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
    <div className='app'>
      <h1> MovieLand </h1>

      <div className='search'>
        <input
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)} />
        <img src={searchIcon}
          alt='Search'
          onClick={() => searchMovies(searchTerm)} />
      </div>

      {
        movies?.length > 0 ?
          (<div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>) : (
            <div className='empty'>
              <h2> No Movies Found </h2>
            </div>)
      }

    </div>
  )
}

export default App