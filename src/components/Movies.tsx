import { useState } from "react";
import * as Styles from "../styles/Movies.module.css";
import Header from "./Header";
import { getMovies } from "../utils/getMovies";

const ITEMS_PER_PAGE = 5;

export default function Movies() {
    const [movieName, setMovieName] = useState("");
    const [allMovieInfo, setAllMovieInfo] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        if (!movieName.trim()) return;
        setLoading(true);
        setPage(1); // Reset page to 1 on new search

        const info = await getMovies(movieName);
        setAllMovieInfo(info);
        setLoading(false);
    };

    const paginatedMovies = allMovieInfo
        ? allMovieInfo.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        : [];

    const hasNext = allMovieInfo
        ? page * ITEMS_PER_PAGE < allMovieInfo.length
        : false;

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

                {paginatedMovies.length > 0 && (
                    <>
                        <div className={Styles.resultGrid}>
                            {paginatedMovies.map((loc, idx) => (
                                <div key={idx} className={Styles.movieCard}>
                                    {loc}
                                </div>
                            ))}
                        </div>
                        {allMovieInfo && allMovieInfo.length > ITEMS_PER_PAGE && (
                            <div className={Styles.paginationControls}>
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className={Styles.pageButton}
                                >
                                    Previous
                                </button>
                                <span className={Styles.pageIndicator}>Page {page}</span>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={!hasNext}
                                    className={Styles.pageButton}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}


                {allMovieInfo && allMovieInfo.length === 0 && !loading && movieName && (
                    <p>No movie info found.</p>
                )}
            </div>
        </div>
    );
}
