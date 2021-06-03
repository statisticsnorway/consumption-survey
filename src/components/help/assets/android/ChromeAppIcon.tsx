import { IconProps } from '../../../common/icons/IconProps';

const ChromeAppIcon = ({ width = 40, height = 40}: IconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 38 38" fill="none">
            <rect x="0.5" y="0.5" width="37" height="37" rx="5.5" fill="#F0F8F9" stroke="#C3E5F8"/>
            <rect x="6" y="5" width="27" height="27" fill="url(#pattern0)"/>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0" transform="scale(0.025)"/>
                </pattern>
                <image id="image0" width="40" height="40"
                       xlinkHref="data:image/png;base64,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"/>
            </defs>
        </svg>
    );
}

export default ChromeAppIcon;
