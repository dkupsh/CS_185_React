import React, { Component } from 'react';

export class Title extends Component {
    getTitle = () => {
        var activeTab = this.props.activeTab
        if (activeTab == 1)
            return "Home Page";
        else if (activeTab == 2)
            return "Image Page";
        else if (activeTab == 3)
            return "Videos Page";
        else if (activeTab == 4)
            return "Links Page";
        else if (activeTab == 5)
            return "Database Page";
        else if (activeTab == 6)
            return "Movies Page";
        else if (activeTab == 7)
            return "Add Movies Page";
        else if (activeTab == 8)
            return "Add Lists Page";
        else if (activeTab == 9)
            return "Movie Graph";
    }
    render() {
        return (
            <div className='title'>
                <h1> {this.getTitle()} </h1>
            </div>);
    }
}
export default Title;