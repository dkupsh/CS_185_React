import React, { Component } from 'react';
import MovieItem from './MovieItem';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const firebase = require('firebase')
const axios = require('axios').default;

export class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: ["tt0482571", "tt4154796", "tt3794354", "tt2527336", "tt0816692", "tt0468569", "tt3501632", "tt5463162"],
            addedMovies: [],
            lists: ["all"],
            listToLoad: "all",
            text: "",
            loadedAmount: 8,
            loaded: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.getItemsInPair = this.getItemsInPair.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;


        this.setState({
            listToLoad: value
        });
    }

    handleTextChange(event) {
        const target = event.target;
        const value = target.value;


        this.setState({
            text: value
        });
    }

    handleClick() {
        this.setState({ loadedAmount: this.state.loadedAmount + 8 })
    }

    componentDidMount() {
        this.setState({ loaded: false })

        let ref = firebase.database().ref('Movie')

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(item => {
                var temp = item.val();
                data.push(temp);
            })
            this.setState({
                addedMovies: data,
            });
        });

        let ref2 = firebase.database().ref('List')

        ref2.on('value', snapshot => {
            const data = ["all"];
            snapshot.forEach(item => {
                var temp = item.val();
                data.push(temp.id);
            });
            this.setState({
                lists: data,
                loaded: true
            });
        });
    }

    getItemsInPair() {
        let ref = firebase.database().ref('Pair')

        let movies = [];
        ref.on('value', snapshot => {
            snapshot.forEach(item => {
                var temp = item.val();
                console.log(temp.list + " " + this.state.listToLoad)
                if (temp.list === this.state.listToLoad) {
                    console.log(temp.movie);
                    var ref2 = firebase.database().ref("Movie");
                    ref2.orderByChild("id").equalTo(temp.movie).on("value", function (snapshot) {
                        snapshot.forEach(item => {
                            var temp = item.val();
                            movies.push(temp);
                        });
                    });
                }
                console.log(movies);
                return movies
            });
        });
    }

    render() {
        let movies = this.state.addedMovies;
        const list = this.state.lists;

        let listItems;
        let dropdownItems;
        let moreToShow = true;

        if (this.state.loaded) {
            dropdownItems = list.map((item, index) =>
                (<option key={index}> {item} </option>))

            if (this.state.listToLoad != 'all') {
                let ref = firebase.database().ref('Pair');
                movies = [];
                ref.on('value', snapshot => {
                    snapshot.forEach(item => {
                        var temp = item.val();
                        if (temp.list === this.state.listToLoad) {
                            var ref2 = firebase.database().ref("Movie");
                            ref2.orderByChild("id").equalTo(temp.movie).on("value", function (snapshot) {
                                snapshot.forEach(item => {
                                    var temp = item.val();
                                    movies.push(temp);
                                });
                            });
                        }
                    });
                });
            }


            movies = movies.filter(function (value) {
                console.log(this.state.text);
                if (this.state.text != "") {
                    if (value && !value.title.includes(this.state.text)) {
                        return false;
                    }
                    return true;

                }
                else {
                    return true;
                }
            }.bind(this));

            if (movies) {
                let size = movies.length < this.state.loadedAmount ? movies.length : this.state.loadedAmount;
                moreToShow = movies.length < this.state.loadedAmount ? false : true;
                console.log(size);
                listItems = movies.slice(0, size).map((item, index) =>
                    (<MovieItem key={index} id={item.id} imageSRC={item.poster} Title={item.title} Rating={item.rating} Director={item.director} />));
            }

        }
        else {
            listItems = <h1>Loading Images...</h1>
        }
        console.log(listItems);

        return (
            <div>
                <div className="ListToLoadForm">
                    <Form>
                        <div class="row">
                            <div class="col">
                                <Form.Label for="toLoad"> Movies to Load: </Form.Label>
                                <Form.Control as="select" id="toLoad" class="custom-select custom-select-lg mb-3" value={this.state.listToLoad} onChange={this.handleInputChange}>
                                    {dropdownItems}
                                </Form.Control>
                            </div>

                            <div class="col">
                                <input type="text" class="form-control" value={this.state.text} onChange={this.handleTextChange} id="input" placeholder="Search"></input>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='default'>
                    {listItems}
                    {moreToShow &&
                        <Button variant="secondary" size="sm" onClick={() => this.handleClick()}>
                            Show More Movies
                        </Button>}
                </div>
            </div>
        );
    }
}
export default Movie;