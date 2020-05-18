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
                <img className='movie'
                    src={this.props.imageSRC}
                    onClick={() => this.handleToggleModal()}
                    alt="Movie" />

                {showModal && (
                    <Modal onCloseRequest={() => this.handleToggleModal()}>
                        <img className='modal'
                            src={this.props.imageSRC}
                            onClick={() => this.handleToggleModal()}
                            alt="Movie" />
                        <div className="ModalMovie">
                            <h1>{this.props.Title}</h1>
                            <h1>{this.props.Director}</h1>
                            <h1>{this.props.Rating}</h1>
                        </div>
                    </Modal>
                )}
            </div>
        );
    }
}

export default Image;
