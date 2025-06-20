import { useState } from "react";
import * as Styles from "../styles/Movies.module.css";
import Header from "./Header";
import { getFilmingLocations } from "../utils/getFilmingLocations";

export default function Movies() {
    const [movieName, setMovieName] = useState("");
    const [filmingInfo, setFilmingInfo] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!movieName.trim()) return;

        setLoading(true);
        const info = await getFilmingLocations(movieName);
        setFilmingInfo(info);
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

                {loading && <p>Loading filming locations...</p>}
                {filmingInfo && (
                    <div className={Styles.resultBox}>
                        <h2>Filming Locations:</h2>
                        <ul>
                            {filmingInfo.map((loc, idx) => (
                                <li key={idx}>{loc}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {filmingInfo && filmingInfo.length === 0 && !loading && movieName && (
                    <p>No filming location info found.</p>
                )}
            </div>
        </div>
    );
}