import { IconProps } from '../../../common/icons/IconProps';

const AddToHomeIcon = ({width = 44, height = 44}: IconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M23.4998 29.0441C23.8213 29.0441 24.0942 28.7833 24.0942 28.4679V23.1116H29.2927C29.6082 23.1116 29.8811 22.8387 29.8811 22.5172C29.8811 22.1896 29.6082 21.9227 29.2927 21.9227H24.0942V16.5604C24.0942 16.245 23.8213 15.9841 23.4998 15.9841C23.1722 15.9841 22.9053 16.245 22.9053 16.5604V21.9227H17.7068C17.3913 21.9227 17.1123 22.1896 17.1123 22.5172C17.1123 22.8387 17.3913 23.1116 17.7068 23.1116H22.9053V28.4679C22.9053 28.7833 23.1722 29.0441 23.4998 29.0441Z"
                fill="#007AFF"/>
            <rect x="14.65" y="13.65" width="17.7" height="17.7" rx="2.35" stroke="#007AFF" stroke-width="1.3"/>
            <circle cx="23" cy="23" r="22.5" stroke="#C3E5F8"/>
        </svg>

    )
};

export default AddToHomeIcon;
