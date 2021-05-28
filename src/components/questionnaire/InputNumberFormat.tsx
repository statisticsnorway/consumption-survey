import React, {ChangeEvent, useEffect, useRef, useState} from "react";


export interface Props {
    value: string,
    onChange?: (e : ChangeEvent<HTMLInputElement>) => void,
    id: string,
    label: string,
    disabled?: boolean,
    autoFocus?: boolean,
    inputMode?: ("numeric" | "text" | undefined)
}
const getSeparator = (x : string) => {
    return x.includes('.') ? '.' : (x.includes(',') ? ',' : '')
}
const removeWhiteSpace = (x : string) => x.replace(/\s/g, '')
const numberWithSpaces = (x : string) => {
    let separator = getSeparator(x)
    let number = x.split(separator ? separator : ',')
    return removeWhiteSpace(number[0]).replace(/\B(?=(\d{3})+(?!\d))/g, " ")+ (separator)+(number[1] ? number[1] : '')
}
const isNaNWithComma = (number : string) => {
    let n = number.replace(',', '.')
    return isNaN(Number(n));

}
const setCursorPosition = (currentPos : any, priorText : string, currentText : string) => {
    if((currentText.length > priorText.length && currentPos=== currentText.length) || (currentText.length > priorText.length+1)){
        return currentPos+1
    }
    else if(currentText.length < priorText.length -1) {
        return currentPos-1 < 0 ? 0 : currentPos-1
    }
    return currentPos
}


export default function InputNumberFormat({value, onChange = () => null, id, label, disabled = false, autoFocus=false, inputMode} : Props) {
    const [showValue, setShowValue] = useState(numberWithSpaces(value))
    const [caretPosition, setCaretPosition] = useState(0)
    const inputRef = useRef(null)
    useEffect(() => {
        setShowValue(numberWithSpaces(value))
    }, [value])
    useEffect(() => {
        // @ts-ignore
        inputRef.current.selectionStart = caretPosition
        // @ts-ignore
        inputRef.current.selectionEnd = caretPosition
    }, [caretPosition])

    if(!inputMode){
        inputMode = "text"
    }

    return(
        <div key={id} className={`ssb-input`}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className="input-wrapper">
                <input
                    disabled={disabled}
                    className={'number-format'}
                    autoFocus={autoFocus}
                    ref={inputRef}
                    value={showValue}
                    inputMode={`${inputMode === "text" ? "text" : "numeric"}` as ("numeric" | "text")}
                    onChange={(event) => {
                        let position = event.target.selectionStart
                        let valueWithoutSpace = removeWhiteSpace(event.target.value)
                        let newValue = isNaNWithComma(valueWithoutSpace) ? value : valueWithoutSpace
                        setCaretPosition(setCursorPosition(position, numberWithSpaces(value) as string, numberWithSpaces(newValue)))
                        setShowValue(numberWithSpaces(newValue))
                        event.target.value = newValue.replace(',', '.')
                        onChange(event)
                    }}
                />
            </div>
        </div>
    )
}
