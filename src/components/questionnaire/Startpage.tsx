import React, {ReactElement} from "react";
import {Button} from "@statisticsnorway/ssb-component-library";

export interface StartpageProps {
    clicker: Function
}

export const Startpage = (
    {
        clicker
    }: StartpageProps): ReactElement => {
    return (
        <div className="flex-fill-remaining-vertical flex-container-column question-container">
            <div className="center-text width-100">
                <h1>
                    Informasjon om spørreskjema
                </h1>
            </div>
            <div className="width-100">
                <p>
                    Spørreskjema inneholder spørsmål om enkeltstående utgifter som faller utenom føringsperioden,
                    eller utgifter som kan være vanskelig å huske at man har.
                    I tillegg er det noen spørsmål om boliglån og renter som kanskje krever at du har denne informasjonen tilgjengelig.
                </p>
            </div>
            <div>
                <Button primary onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault();
                    clicker()
                }}>
                    Start spørreundersøkelse
                </Button>
            </div>
        </div>
    )
}