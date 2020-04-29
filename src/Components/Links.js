import React, { Component } from 'react';
import Link from './Link'
import UCSB4COLA from '../img/ucsb.jpeg'
import UCD4COLA from '../img/ucd.jpeg'
import UCSC4COLA from '../img/ucsc.jpeg'
import UCSD4COLA from '../img/ucsd.jpeg'

export class Links extends Component {
    render() {
        return (
            <div className='linkPage'>
                <Link text="UCSB4COLA" page="https://ucsb4cola.org/" imageSRC={UCSB4COLA} />
                <Link text="UCSC4COLA" page="https://payusmoreucsc.com/" imageSRC={UCSC4COLA} />
                <Link text="UCD4COLA" page="https://www.ucdcola4all.org/" imageSRC={UCD4COLA} />
                <Link text="UCSD4COLA" page="https://www.ucsdcola.net/" imageSRC={UCSD4COLA} />
            </div>
        );
    }
}
export default Links;