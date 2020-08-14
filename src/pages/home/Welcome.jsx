import React from 'react';
import { Link } from 'react-router-dom';
import useCustomElement from 'use-custom-element';

const Welcome = props => {
    const [customElementProps, ref] = useCustomElement(props);

    return (
        <div className="welcome">
            <span className="welcomeText"> Takk for at du er med oss i</span>
            <span className="welcomeText"
                  style={{fontSize: '1.25rem'}}> <b>Forbruksundersøkelsen 2021</b>! </span>
            <p/>
            <span> Trykk på knappen under </span>
            <span> for å installere appen: </span>
            <br/>
            <pwa-install {...customElementProps} ref={ref}/>
            <br/>
            <span> eller fortsett med <Link to="/dashboard">web versjon</Link></span>
        </div>
    );
};

export default Welcome;
