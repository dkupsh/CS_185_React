import React, { Component } from 'react';

export class Title extends Component {
    getTitle = () => {
        var activeTab = this.props.activeTab
        if (activeTab == 1)
            return "Home Page"
        else if (activeTab == 2)
            return "Image Page"
        else if (activeTab == 3)
            return "Videos Page"
        else if (activeTab == 4)
            return "Links Page"
        else if (activeTab == 5)
            return "Database Page"
        else
            return "Movies Page"
    }
    render() {
        return (
            <div className='title'>
                <h1> {this.getTitle()} </h1>
            </div>);
    }
}
export default Title;