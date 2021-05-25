import React, {ReactElement} from "react";
import {ArrowLeft} from "react-feather";
import {useRouter} from "next/router";

export const AppHeader = (): ReactElement => {
    const router = useRouter();
    const header = document.getElementById("ssb-main-header") as HTMLElement
    return (
        <div className="flex-container bg-ssb-dark1 border-bm-ssb-green-1px height-vh-8">
            <div className="width-30 flex-container flex-row-center-vertical">
                <ArrowLeft
                    className="arrow-icon"
                    size={22}
                    color={"#00824D"}
                    onClick={event => {
                        event.preventDefault();
                        router.push("/home");
                        header.style.display = "block"
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