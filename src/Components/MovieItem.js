import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from "./Modal";

const firebase = require('firebase')

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            lists: [],
            listToAdd: "",
            loaded: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addList = this.addList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;


        this.setState({
            listToAdd: value
        });
    }

    addList() {
        let toAdd = { movie: this.props.id, list: this.state.listToAdd };
        firebase.database().ref('Pair').push().set(toAdd);
        alert("Added to List " + this.state.listToAdd);
    }

    handleClick() {
        if (this.state.showModal) {
            this.setState({ showModal: false });
            firebase.database().ref("Movie/" + this.props.id).remove();
        }
    }

    handleSubmit(event) {
        this.addList();
        this.componentDidMount();
    }

    componentDidMount() {
        this.setState({ loaded: false })

        let ref = firebase.database().ref('Pair')
        let inLists = []

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(item => {
                var temp = item.val();
                if (temp.movie === this.props.id)
                    inLists.push(temp.list);
            })
            this.setState({
                lists: data
            });
        });

        let ref2 = firebase.database().ref('List')

        ref2.on('value', snapshot => {
            console.log(this.props.Title + " " + inLists)
            const data = [];
            snapshot.forEach(item => {
                var temp = item.val();
                if (inLists.indexOf(temp.id) <= -1)
                    data.push(temp.id);
            })
            this.setState({
                lists: data,
                loaded: true,
                listToAdd: data[0]
            });
        });


    }

    render() {
        const showModal = this.state.showModal;
        const lists = this.state.lists;

        let dropdownItems;

        if (this.state.loaded) {
            dropdownItems = lists.map((item) => (
                <option key={item}>{item}</option>
            ));
        }

        return (
            <div>
                <img className='movie'
                    src={this.props.imageSRC}
                    onClick={() => this.handleToggleModal()}
                    alt="Movie" />

                {showModal && (
                    <Modal onCloseRequest={() => this.handleToggleModal()}>
                        <img className='modal'
                            src={this.props.imageSRC}
                            onClick={() => this.handleToggleModal()}
                            alt="Movie" />
                        <div className="ModalMovie">
                            <h1>{this.props.Title}</h1>
                            <h1>{this.props.Director}</h1>
                            <h1>{this.props.Rating}</h1>
                            <Button variant="secondary" size="sm" onClick={() => this.handleClick()}>
                                Delete Movie
                            </Button>

                            <Form>
                                <Form.Control as="select" value={this.state.listToAdd} onChange={this.handleInputChange}>
                                    {dropdownItems}
                                </Form.Control>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    Add List
                                </Button>
                            </Form>
                        </div>
                    </Modal>
                )
                }
            </div>
        );
    }
}

export default Image;
