import { useState } from "react";
import * as Styles from "../styles/App.module.css";
import pic1 from "/src/images/pic1.jpg";
import pic2 from "/src/images/pic2.jpg";
import purple from "/src/images/purple.jpg";
import Header from "./Header";


export default function App() {
    const [photo, setPhoto] = useState<string>(pic1);

    const switchPhoto = () => {
        if (photo === pic1) {
            setPhoto(pic2);
        }
        else if (photo === pic2) {
            setPhoto(purple);
        } else if (photo === purple) {
            setPhoto(pic1);
        } 
    };

    return (
        <div className='center'>
            <Header />
            <h1 className={Styles.cursive}>Photo Switcher</h1>
            <div>
                <img src={photo}/>
            </div>
            <button onClick={switchPhoto} id="button" className="button">
                Switch
            </button>
        </div>
    );
}