import React, { Component } from 'react';
import Moment from 'react-moment';

const firebase = require('firebase')

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Time: "",
            Name: "",
            Description: "",
            Message: "",
            Private: false,
            Email: ""
        };
        this.firebase = this.props.firebase;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const time = new Date().toLocaleString();

        this.setState({
            Time: time
        });

        this.setState({ Time: time }, () => {
            firebase.database().ref('data').push().set(this.state);
            alert("Added to Database");

            this.setState({
                Time: "",
                Name: "",
                Description: "",
                Message: "",
                Private: false,
                Email: ""
            });
        });

    }

    render() {
        return (
            <div className="inputForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name :
                    <input
                            name="Name"
                            type="text"
                            required="required"
                            value={this.state.Name}
                            minLength={5}
                            maxLength={20}
                            onChange={this.handleInputChange} />
                    </label>

                    <br />
                    <br />

                    <label>
                        Description :
                    <input
                            name="Description"
                            type="text"
                            maxLength={100}
                            value={this.state.Description}
                            onChange={this.handleInputChange} />
                    </label>

                    <br />
                    <br />

                    <label>
                        Message :
                    <input
                            name="Message"
                            type="text"
                            required="required"
                            minLength={15}
                            maxLength={500}
                            value={this.state.Message}
                            onChange={this.handleInputChange} />
                    </label>

                    <br />
                    <br />

                    <label>
                        Private Message? :
                    <input
                            name="Private"
                            type="checkbox"
                            checked={this.state.Private}
                            onChange={this.handleInputChange} />
                    </label>

                    <br />
                    <br />

                    <label>
                        Email :
                    <input
                            name="Email"
                            type="text"
                            value={this.state.Email}
                            onChange={this.handleInputChange} />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default InputForm;