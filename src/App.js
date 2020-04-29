import React, { Component } from 'react';
import './App.css'
import TabList from './Components/TabList';
import Body from './Components/Body';
import Title from './Components/Title';
import ScrollUpButton from 'react-scroll-up-button'

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
                    <Body activeTab={this.state.activeTab} />
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