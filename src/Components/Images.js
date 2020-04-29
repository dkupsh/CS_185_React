import React, { Component } from 'react';
import Image from './Image';
import dog from '../img/dog.jpeg';
import dog2 from '../img/dog2.jpeg';
import dog3 from '../img/dog3.jpeg';
import dog4 from '../img/dog4.jpeg';
import dog5 from '../img/dog5.jpeg';
import dog6 from '../img/dog6.jpeg';


export class Images extends Component {
    render() {
        return (
            <div className='default'>
                <Image imageSRC={dog} />
                <Image imageSRC={dog2} />
                <Image imageSRC={dog3} />
                <Image imageSRC={dog4} />
                <Image imageSRC={dog5} />
                <Image imageSRC={dog6} />
            </div>
        );
    }
}
export default Images;