import 'tailwindcss/tailwind.css';
import SearchDropdown from './components/SearchDropdown/SearchDropdown';
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
    fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=${destinationLang}&include_image_language=fr&append_to_response=credits`)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setSelectedMovie(res);
    }).catch(err => {
      console.error(err);
    });
  }, [destinationLang]);
  const getSelectedMovieDetails = () => {
    return selectedMovie ? (
      <>
        <img className="mb-2" src={getMoviePosterURL(selectedMovie)} alt={selectedMovie.title}/>
        <span className="font-bold text-xl">{selectedMovie.title}</span>
        <span>By {getMovieDirector(selectedMovie)}</span>
        <span>Released on {getMovieReleaseDate()}</span>
      </>
    ) : null;
  };
  const getMovieReleaseYear = (movie) => movie?.release_date.slice(0, 4);
  const getMovieReleaseDate = (movie) => {
    return new Date(selectedMovie.release_date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const getMovieDirector = (movie) => movie?.credits?.crew?.find(member => member.job === 'Director')?.name;
  const getMoviePosterURL = (movie, width = 200) => {
    return movie.poster_path ? `${BASE_URL_IMG}w${width}${movie.poster_path}` : '';
  };
  const getFormattedMovies = movies.map((movie) => ({
    title: movie.title,
    subtitle: getMovieReleaseYear(movie),
    img: getMoviePosterURL(movie),
    id: movie.id,
  }));
  const handleMovieSearchInput = (value) => {
    console.log(value);
    setSearchTitle(value);
    if (value) {
      fetchMovies();
    }
  };
  const handleMovieSelect = (item) => {
    fetchMovieById(item.id);
    setSearchTitle('');
  };
  const onChangeSourceLang = (event) => {
    setSourceLang(event.target.value);
  };
  const onChangeDestinationLang = (event) => {
    setDestinationLang(event.target.value);
  };
  useEffect(() => {
    if (selectedMovie) {
      fetchMovieById(selectedMovie.id);
    }
  }, [destinationLang, fetchMovieById]);
  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-blue-500 mb-5">Movie title translator</h1>
      <div className="search-options">
        <div className="search-options-source">
          <span>Search movie or TV show title in</span>
          <select defaultValue="en-US" onChange={(event) => onChangeSourceLang(event)}>
            <option value="en-US">English (USA)</option>
            <option value="fr-CA">Français (Canada)</option>
            <option value="fr-FR">Français (France)</option>
          </select>
        </div>
        <div className="search-options-destination">
          <span>Translate to</span>
          <select defaultValue="fr-CA" onChange={(event) => onChangeDestinationLang(event)}>
            <option value="en-US">English (USA)</option>
            <option value="fr-CA">Français (Canada)</option>
            <option value="fr-FR">Français (France)</option>
          </select>
        </div>
      </div>
      <SearchDropdown value={selectedMovie}
                      items={getFormattedMovies}
                      handleSearchInput={handleMovieSearchInput}
                      handleItemSelect={handleMovieSelect}
      />
      {getSelectedMovieDetails()}
    </div>
  );
}

export default App;
