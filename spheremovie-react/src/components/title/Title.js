
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faFire } from "@fortawesome/free-solid-svg-icons";
import "./Title.css";
import Search from "../search/Search";

const Title = ({ movies, onSearchMovie, handleClearSearch }) => {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopIndex, setLoopIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [searchQuery, setSearchQuery] = useState(""); // First search bar
    const [imdbSearchQuery, setImdbSearchQuery] = useState(""); // Second search bar for IMDb

    const handleSearch = () => {
        if (searchQuery) {
            onSearchMovie(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    const handleImdbSearch = () => {
        if (imdbSearchQuery) {
            const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(imdbSearchQuery)}`;
            window.open(imdbUrl, "_blank");
        }
    };

    const onClearImdbSearch = () => {
        setImdbSearchQuery("");
    };

    const words = ["Discover Blockbusters", "Watch Trailers", "Become a Movie Critic", "Uncover Trending Films"]; // Words to type

    useEffect(() => {
        const currentWord = words[loopIndex % words.length];

        const handleTyping = () => {
            if (!isDeleting) {
                setDisplayText((prev) => currentWord.substring(0, prev.length + 1));

                if (displayText === currentWord) {
                    setIsDeleting(true);
                    setTypingSpeed(100);
                }
            } else {
                setDisplayText((prev) => currentWord.substring(0, prev.length - 1));

                if (displayText === "") {
                    setIsDeleting(false);
                    setLoopIndex((prev) => prev + 1);
                    setTypingSpeed(150);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopIndex, typingSpeed, words]);

    return (
        <header className="portfolio-header">
            <nav className="portfolio-navbar">
                <div className="brand">
                    <FontAwesomeIcon icon={faFilm} className="brand-logo" /> SphereMovie
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="https://www.netflix.com/tudum/top10/" target="_blank" rel="noopener noreferrer" className="trending-link">
                            <FontAwesomeIcon icon={faFire} className="fire-icon" /> Trending
                        </a>
                    </li>
                    <li><NavLink to="/" className="nav-item">Home</NavLink></li>
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown-toggle" variant="link">
                                Movies
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="https://www.cineplex.com/#cineplex-movies-grid" target="_blank" rel="noopener noreferrer">
                                    Watch on Nearby Theatres
                                </Dropdown.Item>
                                <Dropdown.Item href="https://www.netflix.com/tudum/top10/" target="_blank" rel="noopener noreferrer">
                                    Trending Movies
                                </Dropdown.Item>
                                <Dropdown.Item href="https://www.imdb.com/calendar/" target="_blank" rel="noopener noreferrer">
                                    Coming Soon to Theaters
                                </Dropdown.Item>
                                <Dropdown.Item href="https://www.youtube.com/@FREEMOVIESYT/featured" target="_blank" rel="noopener noreferrer">
                                    Certified Free Movies
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown-toggle" variant="link">
                                Genre Movie Recommendations
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="https://www.imdb.com/search/title/?genres=action" target="_blank" rel="noopener noreferrer">
                                    Action
                                </Dropdown.Item>
                                <Dropdown.Item href="https://www.imdb.com/search/title/?genres=comedy" target="_blank" rel="noopener noreferrer">
                                    Comedy
                                </Dropdown.Item>
                                <Dropdown.Item href="https://www.imdb.com/search/title/?genres=drama" target="_blank" rel="noopener noreferrer">
                                    Drama
                                </Dropdown.Item>
                                <Dropdown.Item href="https://www.imdb.com/search/title/?genres=thriller" target="_blank" rel="noopener noreferrer">
                                    Thriller
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <div className="auth-buttons">
                    <button className="login-btn">Login</button>
                    <button className="register-btn">Register</button>
                </div>
            </nav>
            <div className="typing-effect-container">
                <h1 className="main-title">Welcome to SphereMovie</h1>
                <p className="typing-effect">{displayText}<span className="cursor">|</span></p>
            </div>
            <div className="search-section">
                {/* First Search Bar */}
                <Search
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />

                {/* Second Search Bar for IMDb */}
                <Search
                    value={imdbSearchQuery}
                    onChange={({ target }) => setImdbSearchQuery(target.value)}
                    handleSearch={handleImdbSearch}
                    onClearSearch={onClearImdbSearch}
                    placeholder="Search for movies on IMDb"s
                />
            </div>
        </header>
    );
};

export default Title;
