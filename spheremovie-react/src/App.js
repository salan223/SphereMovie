import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Title from './components/title/Title';
//import Header from './components/header/header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/errorpage/ErrorPage';
//import NotFound from './components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

    // Search for a movie
    const onSearchMovie = async (query) => {
      try {
        const response = await api.get("/api/v1/movies/search", {
          params: { query },
        });
    
        console.log(response);
        
        if (response.data && response.data.length > 0) {
          setIsSearch(true);
          setMovies(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };    

    const handleClearSearch = () => {
      setIsSearch(false);
      getMovies();
    }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Title onSearchMovie={onSearchMovie} handleClearSearch={handleClearSearch}/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;