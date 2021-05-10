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
            className="border-bm-ssb-green-1px margin-lt-rt-20px padding-tp-bm-30px height-vh-8 bg-white">
            {cat && <p className={"p-lineHeight-05"}>
                Du svarer nå på spørsmål om
            </p>}
            {!cat && <p className={"p-lineHeight-05"}>
                Generelle spørsmål
            </p>}
            {cat && <Link href="">{cat}</Link>}
        </div>
    )
}