import NumberFormat from "react-number-format";

interface NorwegianCurrencyFormatProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NorwegianCurrencyFormat = (props: NorwegianCurrencyFormatProps) => {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            type="numeric"
        />
    );
};

export default NorwegianCurrencyFormat;
