import { useState } from "react";
import * as Styles from "../styles/Movies.module.css";
import Header from "./Header";


export default function App() {

    return (
        <div className='center'>
            <Header />
            <div className="container">
            <h1 className={Styles.title}>Search Movies</h1>
            <div>
                <input type="text" placeholder="Enter movie name" className={Styles.searchInput} />
                <button type="submit" className={Styles.searchButton}>
                    Search
                </button>
            </div>
            </div>
        </div>
    );
}