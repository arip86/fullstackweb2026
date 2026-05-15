import Movie from "../Movie/Movie";
import styles from "./Movies.module.css";
import data from "../../utils/constant/data";
import { useState } from "react";

function Movies(){
    // const movies = data;

    const [movies, setMovies] = useState(data);
    //ketika handleClick diproses, data akan disimpan di State
    function handleClick(){
        const movie = {
            id: "xyz", title: "Jigsaw",
            year: 2021, type: "Movie",
            poster: "https://picsum.photos/200/300"
        };
        // movies.push(movie);
        //melakukan update dengan spread Operator
        setMovies([...movies, movie]);
    }
    return(
        <div className={styles.container}>
            <section>
                <h2>
                    Lates Movies
                </h2>
                <div className={styles.movie__container}>

            {/* looping data */}
                 {movies.map((movie)=>{
                    return <Movie key={movie.id} movie={movie} />
                 })}
                </div>
                <button onClick={handleClick}>Add Movie</button>
            </section>

        </div>
    )
}
export default Movies