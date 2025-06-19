import { useState } from "react";
import * as Styles from "../styles/App.module.css";
import map from "../images/worldmap.jpg";
import Header from "./Header";


export default function App() {

    return (
        <div className='center'>
            <Header />
            <div className="main-content">
            <h1 className={Styles.title}>Film Finder</h1>
            <div>
                <img className={Styles.map} src={map}/>
            </div>
            <h2 className={Styles.mainText}>Welcome to film finder, 
                here you can search for any film to find locations it 
                was filmed in, or seach for a location to find movies filmed nearby!</h2>
            <h2 className={Styles.mainText}>Click the 'Movie' or 'Location' buttons to get started!</h2>
            
            
            </div>
        </div>
    );
}