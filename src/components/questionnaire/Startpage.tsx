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
            <div className={"flex-column padding-lt-rt-10px bg-darkblue"}>
                <h1>
                    Før du starter
                </h1>
                <p>
                    Skjema inneholder noen spørsmål som kanskje krever at du har denne informasjon tilgjengelig. Det kan være informasjon om:
                </p>
                <ul>
                    <li>Boliglån og renter</li>
                    <li>Forsikring</li>
                    <li>Utgifter til oppussing siste 12 mnd</li>
                    <li>Utgifter til fritidsbolig</li>
                </ul>
                <p>
                    Det vil ta mellom 20–30 minutter å gjennomføre, og du kan fortsette på et senere tidspunkt hvis du blir nødt til å avbryte underveis.
                </p>
            </div>
            <div>
                <p>
                    Er du klar til å starte spørreskjema?
                </p>
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