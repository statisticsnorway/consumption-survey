import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-reader';

class QrScanner extends Component {
    constructor() {
        super();
        this.state = {
            qrData: null,
            image: null,
        };
    }

    handleScan = qrData => {
        if (qrData) {
            const canvas = this.refs.readerRef.els.canvas;
            const image = canvas.toDataURL('image/jpeg');
            this.setState({ qrData, image });

            if (typeof this.props.onQrData === 'function') {
                this.props.onQrData(qrData, image);
            }
        }
    }

    clearData = () => {
        this.setState({qrData: null});
    }

    handleError = (err) => {
        console.log(err);
        this.clearData();
    }

    render() {
        const {qrData} = this.state;
        return (
            <>
                <QrReader
                    ref="readerRef"
                    delay={10}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{width: '100%'}}
                />
                {qrData &&
                <div className="qr-success">
                    <p>{qrData}</p>
                    <p><a href="#" onClick={this.clearData}>Clear</a></p>
                </div>
                }
            </>
        );
    }
}

QrScanner.propTypes = {
    onQrData: PropTypes.func,
};

export default QrScanner;
