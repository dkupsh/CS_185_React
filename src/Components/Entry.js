import React, { Component } from 'react';

class Entry extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="entry">
                <h2>Date Added: {this.props.Time}</h2>
                <h1>Name: {this.props.Name}</h1>
                <h1>Description: {this.props.Description}</h1>
                <h1>Message: {this.props.Message}</h1>
            </div>
        );
    }
}

export default Entry;