import React, { Component } from 'react';
import './App.css'
import TabList from './Components/TabList';
import Body from './Components/Body';
import Title from './Components/Title';
import ScrollUpButton from 'react-scroll-up-button'


import config from './config'

const firebase = require('firebase')

export class App extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: 1
        }
        this.changetab = (id) => {
            this.setState({
                activeTab: id
            })
        }
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

    }

    render() {
        const tabs = [
            {
                id: 1,
                title: 'Home'
            },
            {
                id: 2,
                title: 'Images'
            },
            {
                id: 3,
                title: 'Videos'
            },
            {
                id: 4,
                title: 'Links'
            },
            {
                id: 5,
                title: 'Database'
            },
            {
                id: 6,
                title: 'Movies'
            },
            {
                id: 7,
                title: 'Add Movie'
            },
            {
                id: 8,
                title: 'Create List'
            },
            {
                id: 9,
                title: 'Graph'
            }
        ]

        return (
            <div className="body">
                <div className="nav-bar">
                    <TabList
                        tabs={tabs}
                        changeTab={this.changetab}
                        activeTab={this.state.activeTab} />
                </div>
                <div className="main-body">
                    <Title activeTab={this.state.activeTab} />
                    <Body activeTab={this.state.activeTab} firebase={this.firebase} />
                </div>
                <div>
                    <ScrollUpButton
                        StopPosition={0}
                        ShowAtPosition={150}
                        style={{ backgroundColor: 'red' }}
                    />
                </div>
            </div>
        );
    }
}
export default App;