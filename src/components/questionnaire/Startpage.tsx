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
                    Spørreskjema inneholder spørsmål om viktige utgifter som ikke er like lette å fange opp i den daglige rapporteringen og som i mange tilfeller faller utenfor føringsperioden.
                    Blant annet spør vi om boligøkonomi, vedlikehold og oppgradering, utgifter til reiser, bilkjøp, forsikringer og sjeldne kjøp av større verdi.
                </p>
                <div className={"flex-column padding-lt-rt-10px bg-darkblue"}>
                    <h1>
                        Før du starter
                    </h1>
                    <p>
                        Det kan være nyttig å ha noe informasjon tilgjengelig før du starter. Blant annet informasjon om:
                    </p>
                    <ul>
                        <li>Boliglån og renter</li>
                        <li>Eventuell fellesgjeld</li>
                        <li>Forsikring</li>
                        <li>Kommunale avgifter</li>
                        <li>Utgifter til håndverkere </li>
                        <li>Reise/ferieutgifter</li>
                    </ul>
                    <p>
                        Det vil ta mellom 20–30 minutter å gjennomføre, og du kan fortsette på et senere tidspunkt hvis du blir nødt til å avbryte underveis.
                    </p>
                </div>
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