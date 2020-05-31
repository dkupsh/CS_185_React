import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import Links from './Links'
import Database from './Database'
import Movie from './Movie';
import AddMovie from './AddMovie';
import AddList from './AddList'

export class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        if (activeTab == 1)
            return <Home />
        else if (activeTab == 2)
            return <Images />
        else if (activeTab == 3)
            return <Videos />
        else if (activeTab == 4)
            return <Links />
        else if (activeTab == 5)
            return <Database firebase={this.props.firebase} />
        else if (activeTab == 6)
            return <Movie />
        else if (activeTab == 7)
            return <AddMovie />
        else if (activeTab == 8)
            return <AddList />
    }
    render() {
        return (this.displayContent());
    }
}
export default Body;