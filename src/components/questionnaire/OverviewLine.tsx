import React, {ReactElement} from "react";
import {ArrowRight, CheckCircle} from "react-feather";

export interface OverviewLineProps {
    sectionName: string
    sectionDone: boolean
    isClickable: boolean
}

export const OverviewLine = (
    {
        sectionName,
        sectionDone,
        isClickable
    }: OverviewLineProps): ReactElement => {

    return (
        <div className={"flex-container flex-row-center-vertical padding-tp-bm-15px border-bm-green-05"}>
            <div
                className={`radio-label ${sectionDone ? '' : 'hide'}`}
            >
                    <CheckCircle className={`ui-icon-circle-check ${true ? "margin-rt-15px dy-true" : "dy-none"}`}
                        size={22}
                        color={sectionDone ? "green" : "white"}
                        onClick={event => {
                            event.preventDefault();
                        }}
                    />

            </div>
            <div className={`${isClickable ? '' : 'font-color-unactive'}`}>
                {sectionName}
            </div>
            <div className={"flex-container flex-row-center-vertical flex-row-items-end flex-restOfSpace"}>
                <ArrowRight
                    className="arrow-icon"
                    size={22}
                    color={`${isClickable ? 'green' : '#62919A'}`}
                    onClick={event => {
                        event.preventDefault();
                    }}
                />
            </div>
        </div>
    )
}