import React, { Component } from 'react';

import Entry from './Entry';

const firebase = require('firebase')

export class GuestBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };

        this.firebase = this.props.firebase;
    }

    componentDidMount() {
        let ref = firebase.database().ref('data')
        this.setState({ loaded: false })
        //retrieve its data
        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(item => {
                var temp = item.val();
                data.push(temp);
            })
            this.setState({
                data: data,
                loaded: true
            });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshoyt) {

    }

    render() {
        const data = this.state.data;

        var publicItems = [];
        data.forEach(item => {
            if (item.Private === false)
                publicItems.push(item);
        })

        let listItems;
        if (this.state.loaded) {
            listItems = publicItems.map((item) =>
                (<Entry key={item.Time} Time={item.Time} Name={item.Name} Description={item.Description} Message={item.Message} />));
        } else {
            listItems = <h1> Waiting to Load...</h1>;
        }

        return (
            <div className="guestBook">
                {listItems}
            </div>
        );
    }
}
export default GuestBook;