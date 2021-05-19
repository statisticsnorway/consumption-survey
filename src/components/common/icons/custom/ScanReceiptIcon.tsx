import { IconProps } from '../IconProps';

export type ScanReceiptProps = IconProps & {};

const ScanReceiptIcon = ({ width = 64, height = 80}: ScanReceiptProps) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 17C16 17 19 18 19 22C19 26 19 59 19 59H51C51 59 51 26 51 22C51 18 48 17 46 17H14Z" fill="white" stroke="#274247" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M41 79C50.9411 79 59 70.9411 59 61C59 51.0589 50.9411 43 41 43C31.0589 43 23 51.0589 23 61C23 70.9411 31.0589 79 41 79Z" fill="white" stroke="#274247" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M37 55H31V68H51V55H45L44 52H38L37 55Z" stroke="#274247" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M41 65C43.2091 65 45 63.2091 45 61C45 58.7909 43.2091 57 41 57C38.7909 57 37 58.7909 37 61C37 63.2091 38.7909 65 41 65Z" fill="#274247"/>
            <path d="M33 17C33 9.4 33 1 33 1H1C1 1 1 16 1 24C1 27 3 28 5 28C7 28 9 27 9 24C9 23.7 9 23.3 9 23C9 20 9 17 14 17H33Z" fill="white" stroke="#274247" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M5 28H19C19 28 19 25 19 22C19 18 16 17 14 17C10 17 9 19 9 22C9 22.3 9 23.7 9 24C9 26 8 28 5 28Z" fill="#C3DCDC" stroke="#274247" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M24 25H46" stroke="#C3DCDC" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M24 31H46" stroke="#C3DCDC" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M24 37H46" stroke="#C3DCDC" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M6 7H28" stroke="#C3DCDC" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M6 13H28" stroke="#C3DCDC" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
    );
};

export default ScanReceiptIcon;
