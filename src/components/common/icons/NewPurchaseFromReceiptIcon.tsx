import { IconProps } from './iconTypes';

export type NewPurchaseFromReceiptIconProps = IconProps & {};

const NewPurchaseFromReceiptIcon = ({height = 20, width = 20, style = {}, className = ''}: NewPurchaseFromReceiptIconProps) => (
    <svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 17L13 17" stroke="#00824D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 14L13 14" stroke="#00824D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 11L13 11" stroke="#00824D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="10" y="8" width="8" height="12" rx="1" stroke="#00824D" stroke-width="2"/>
        <path d="M11 5H8C6.89543 5 6 5.89543 6 7V10" stroke="#00824D" stroke-width="2"/>
        <path d="M17 5H20C21.1046 5 22 5.89543 22 7V10" stroke="#00824D" stroke-width="2"/>
        <path d="M11 23H8C6.89543 23 6 22.1046 6 21V18" stroke="#00824D" stroke-width="2"/>
        <path d="M17 23H20C21.1046 23 22 22.1046 22 21V18" stroke="#00824D" stroke-width="2"/>
    </svg>
);

export default NewPurchaseFromReceiptIcon;
