import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import './updatemovie.css'

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

export const UpdateMovie = (props) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    const handleChange = e => {
        e.persist()
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res.data)
            props.getMovieList()
            push('/')        
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return(
        <>
            <form onSubmit={handleSubmit} >
                <input
                    placeholder='Title' 
                    type='text'
                    name='title'
                    onChange={handleChange}
                    value={movie.title}
                /><br/>
                <input 
                    placeholder='Director' 
                    type='text'
                    name='director'
                    onChange={handleChange}
                    value={movie.director}
                /><br/>
                <input 
                    placeholder='Metascore' 
                    type='text'
                    name='metascore'
                    onChange={handleChange}
                    value={movie.metascore}
                /><br/>
                <input 
                    placeholder='Stars' 
                    type='text'
                    name='stars'
                    onChange={handleChange}
                    value={movie.stars}
                /><br/>
                <button>
                    Update Movie
                </button>
            </form>
        </>
    )
}