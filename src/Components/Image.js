import React, { Component } from "react";
import Modal from "./Modal";

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { showModal } = this.state;

        return (
            <div>
                <img className='image'
                    src={this.props.imageSRC}
                    onClick={() => this.handleToggleModal()}
                    onMouseover="this.style.opacity=.7"
                    onMouseout="this.style.opacity=0.6"
                    alt="Doggy" />

                {showModal && (
                    <Modal onCloseRequest={() => this.handleToggleModal()}>
                        <img className='modal'
                            src={this.props.imageSRC}
                            onClick={() => this.handleToggleModal()}
                            alt="Doggy" />
                    </Modal>
                )}
            </div>
        );
    }
}

export default Image;
