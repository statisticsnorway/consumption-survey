import React, {ReactElement} from "react";
import {ArrowLeft, ArrowRight} from "react-feather";
// import {Collapse} from "react-collapse";

export const AppHeader = (): ReactElement => {
    return (
        <div className="flex-container bg-ssb-dark1 border-bm-ssb-green-1px height-vh-8">
            <div className="width-30 flex-container flex-row-center-vertical">
                <ArrowLeft
                    className="arrow-icon"
                    size={22}
                    color={"#00824D"}
                    onClick={event => {
                        event.preventDefault();
                    }}
                />
                Tilbake
            </div>
            <div className="width-40 center-text">
                <h3 className={"fw-normal"}>
                    Spørreskjema
                </h3>
            </div>
            <div className="width-30">
            </div>
        </div>
    )
}