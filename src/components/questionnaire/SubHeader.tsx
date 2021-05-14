import React, {ReactElement} from "react";

interface QProps {
    cat: string
    clicker: Function
}

export function SubHeader ({
                               cat, clicker
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
            {cat && <p style={{color: 'green', textDecoration: "underline"}} onClick={() => clicker()}>{cat}</p>}
        </div>
    )
}