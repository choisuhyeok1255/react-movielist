import React, {useEffect, useState} from 'react'
import { ReactComponent as Spinner } from '../icon/Magnify.svg';
import { movielist } from './MovieList.module.css';

const MovieList = () => {

  const [movies, setMovies] = useState();
  const [searchInput, setSearchInput] = useState('');
  const [spinner, setSpinner] = useState(false);

  const handlerSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchInput}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
  
      setMovies(myJson.data.movies);
  
    })
    .finally(function(){
      setSpinner(false);
      }
    );
  };

  // useEffect( () => {
  //   fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchInput}`)
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(myJson) {
  //     // console.log(JSON.stringify(myJson.data.movies[0].title));
      
  //     // JSON.stringify(myJson.data.movies.map(movie => {
  //     //   console.log(movie.title);
  //     // }));
  
  //     setMovies(myJson.data.movies);
  
  //   });
  // } ,[searchInput]);

  return (
    <>
    <form action="" onSubmit={handlerSubmit}>
      <input onChange={handlerSearchInput}></input>
      <button>검색</button>
    </form>
    {spinner === false ? <ul className={movielist}>
      {
        movies && movies.map((movie) => {
          return (
            <>
            <img src={movie.medium_cover_image}></img>
            <li>{movie.title}</li>
            </>
          )
        })
      }
      </ul> : <Spinner/> }
      
    </>
  )
}

export default MovieList;