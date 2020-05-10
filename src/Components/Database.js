import React, { Component } from 'react';
import InputForm from './InputForm';
import GuestBook from './Guestbook';

export class Database extends Component {

    render() {
        return (
            <div className='database'>
                <InputForm firebase={this.props.firebase} />
                <GuestBook firebase={this.props.firebase} />
            </div >
        );
    }
}
export default Database;