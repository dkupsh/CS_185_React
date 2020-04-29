import React, { Component } from 'react';

export class Videos extends Component {
    render() {
        return (
            <div className='default'>
                <div className='media'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/AFw-Q6bKmo4" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='1'></iframe>
                </div>
                <div className='media'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Tb1KQIjAGxo" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='1'></iframe>
                </div>
                <div className='media'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/BZL0tclELI8" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='1'></iframe>
                </div>
                <div className='media'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/YjI6xHKpG-M" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='1'></iframe>
                </div>
            </div>

        );
    }
}
export default Videos;