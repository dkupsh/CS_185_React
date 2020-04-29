import React, { Component } from "react";


class Link extends Component {

    render() {
        return (
            <a href={this.props.page}>
                <div className='link'>
                    <img className='linkImage'
                        src={this.props.imageSRC}
                        alt="COLA" />
                    <h1>{this.props.text}</h1>
                </div>
            </a >
        );
    }
}

export default Link;
