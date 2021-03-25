import React, {ReactElement} from "react";
import {Link} from "@statisticsnorway/ssb-component-library";

interface QProps {
    cat: string
}

export function SubHeader ({
                             cat
}:QProps): ReactElement {
    return (
        <div id="subheader"
            className="border-bm-ssb-green-1px margin-lt-rt-20px pdg-tp-10px pdg-bm-30px height-vh-8 bg-white">
            <p className={"p-lineHeight-05"}>
                Du svarer nå på spørsmål om
            </p>
            <Link href="">{cat}</Link>
        </div>
    )
}