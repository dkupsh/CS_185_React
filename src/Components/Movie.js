import React, { Component } from 'react';
import MovieItem from './MovieItem';

const axios = require('axios').default;

export class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: ["tt0482571", "tt4154796", "tt3794354", "tt2527336", "tt0816692", "tt0468569", "tt3501632", "tt5463162"],
            addedMovies: [],
            loaded: false
        };
    }

    componentDidMount() {
        let movies = this.state.movies;
        let returnedMovies = [];
        let promises = []

        movies.forEach(function (item, index) {
            promises.push(axios.get("https://www.omdbapi.com/?apikey=4131ae30&i=" + item))
        });

        axios.all(promises).then(function (results) {
            results.forEach(function (response) {
                const title = response.data.Title;
                const director = response.data.Director;
                const rating = response.data.imdbRating;
                const poster = response.data.Poster;
                returnedMovies.push({ title, director, rating, poster });
            });

            console.log(returnedMovies);
            this.setState({
                addedMovies: returnedMovies,
                loaded: true
            });
        }.bind(this));
    }

    render() {
        const movies = this.state.addedMovies;

        let listItems;

        if (this.state.loaded) {
            listItems = movies.map((item, index) =>
                (<MovieItem key={index} imageSRC={item.poster} Title={item.title} Rating={item.rating} Director={item.director} />));
        }
        else {
            listItems = <h1>Loading Images...</h1>
        }
        console.log(listItems);

        return (
            <div className='default'>
                {listItems}
            </div>
        );
    }
}
export default Movie;