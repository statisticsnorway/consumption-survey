import { Component } from 'react';
import Loader from './Loader';

class NoSSR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
        }
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const { children, onSSR = <Loader />} = this.props;
        const { isMounted } = this.state;

        return isMounted ? children : onSSR;
    }
}

export default NoSSR;
