import { useState } from "react";
import * as Styles from "../styles/Movies.module.css";
import Header from "./Header";
import { getFilmingLocations } from "../utils/getFilmingLocations";
import { getMovies } from "../utils/getMovies";

export default function Movies() {
    const [movieName, setMovieName] = useState("");
    const [movieInfo, setMovieInfo] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!movieName.trim()) return;
        setLoading(true);
        const info = await getMovies(movieName);

        setMovieInfo(info);
        setLoading(false);
    };

    return (
        <div className="center">
            <Header />
            <div className="container">
                <h1 className={Styles.title}>Search Movies</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        className={Styles.searchInput}
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                    />
                    <button
                        type="button"
                        className={Styles.searchButton}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {loading && <p>Loading movies...</p>}
                {movieInfo && (
                    <div className={Styles.resultBox}>
                        <h2>Movies:</h2>
                        <ul>
                            {movieInfo.map((loc, idx) => (
                                <li key={idx}>{loc}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {movieInfo && movieInfo.length === 0 && !loading && movieName && (
                    <p>No movie info found.</p>
                )}
            </div>
        </div>
    );
}