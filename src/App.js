import './App.css';
import {useCallback, useEffect, useState} from 'react';

const API_KEY = 'c3ee2bb51e36fe8ee23b3c051a560200';
const BASE_URL = 'https://api.themoviedb.org/3/';
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/';
const NB_RESULTS = 5;

function App() {
  const [searchTitle, setSearchTitle] = useState('');
  const [sourceLang, setSourceLang] = useState('en-US');
  const [destinationLang, setDestinationLang] = useState('fr-CA');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const fetchMovies = useCallback(() => {
    fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchTitle}&language=${sourceLang}`)
    .then(response => response.json())
    .then(res => {
      setMovies(res.results.slice(0, NB_RESULTS));
    })
    .catch(err => {
      console.error(err);
    });
  }, [searchTitle, sourceLang]);
  const fetchMovieById = useCallback((id) => {
    fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=${destinationLang}`)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setSelectedMovie(res);
    }).catch(err => {
      console.error(err);
    });
  }, [destinationLang]);
  const getMoviesUl = () => {
    return (<ul>
      {movies.map((x, i) => (
        <li key={i} onClick={() => fetchMovieById(x.id)}>
          <img src={getMoviePosterURL(x)} alt={x.title}/>
          <span>{`${x.title} (${x.release_date.slice(0, 4)})`}</span>
        </li>
      ))}
    </ul>);
  };
  const getSelectedMovieDetails = () => {
    return selectedMovie ? (
      <>
        <img src={getMoviePosterURL(selectedMovie)} alt={selectedMovie.title}/>
        <span>{selectedMovie.title}</span>
      </>
    ) : null
  };
  const getMoviePosterURL = (movie, width = 200) => {
    return `${BASE_URL_IMG}w${width}${movie.poster_path}`;
  };
  const onChangeSourceLang = (event) => {
    setSourceLang(event.target.value);
  };
  const onChangeDestinationLang = (event) => {
    setDestinationLang(event.target.value);
  };
  const onTitleInput = (event) => {
    const val = event.target.value;
    if (!val) {
      setMovies([]);
      return;
    }
    setSearchTitle(event.target.value);
  };
  useEffect(() => {
    fetchMovies();
  }, [sourceLang, fetchMovies]);
  useEffect(() => {
    if (selectedMovie) {
      fetchMovieById(selectedMovie.id);
    }
  }, [destinationLang, fetchMovieById]);
  return (
    <div className="App">
      <div className="container">
        <div>Source lang: {sourceLang}</div>
        <div>
          <span>Search movie or TV show title in</span>
          <select defaultValue="en-US" onChange={(event) => onChangeSourceLang(event)}>
            <option value="en-US">English (USA)</option>
            <option value="fr-CA">Français (Canada)</option>
            <option value="fr-FR">Français (France)</option>
          </select>
          <input placeholder="Type here" value={searchTitle} onInput={onTitleInput}/>
        </div>
        <div>
          <span>Translate to:</span>
          <select defaultValue="fr-CA" onChange={(event) => onChangeDestinationLang(event)}>
            <option value="en-US">English (USA)</option>
            <option value="fr-CA">Français (Canada)</option>
            <option value="fr-FR">Français (France)</option>
          </select>
        </div>
      </div>
      {getMoviesUl()}
      {getSelectedMovieDetails()}
      <div>Destination lang: {destinationLang}</div>
    </div>
  );
}

export default App;
