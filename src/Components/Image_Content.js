import React, { Component } from 'react';

export class Image_Content extends Component {
    render() {
        return (
            <div className="Img">
                <img src={this.props.imgage} alt=" Doggy" />
                
            </div>
        );
    }
}
export default Image_Content;