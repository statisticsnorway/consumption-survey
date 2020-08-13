import React, { Component, createRef } from 'react';
import WebCam from 'react-webcam';
import { Camera } from 'react-feather';

const DEFAULT_CONSTRAINTS = {
    width: { max: 480 },
    height: { max: 360 },
    frameRate: { max: 24 },
    facingMode: { exact: 'environment' }
};

class Photo extends Component {
    constructor(props) {
        super(props);
        this.camRef = createRef();
        this.state = {
            image: null,
        };
    }

    capture = () => {
        window.setTimeout(() => {
            const imageSrc = this.camRef.getScreenshot();
            this.setState({ image: imageSrc });
            if (typeof this.props.onCapture === 'function') {
                this.props.onCapture(this.state.image);
            }
        }, 500);
    };

    render() {
        const facingMode = this.props.facingMode || "user";

        return (
            <>
                <WebCam
                    style={{ maxHeight: '250px' }}
                    audio={false}
                    ref={ref => this.camRef = ref}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    height="360px"
                    forceScreenshotSourceSize={true}
                    videoConstraints={{
                        ...DEFAULT_CONSTRAINTS,
                        facingMode,
                    }}
                />
                <div className="actionIcons">
                    <button onClick={this.capture}>
                        <Camera className="actionIcon"/>
                    </button>
                </div>
            </>
        );
    }
}

export default Photo;
