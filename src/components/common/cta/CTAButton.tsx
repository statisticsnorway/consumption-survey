import { ReactNode } from 'react';

import FbuIcon, { IconName } from '../icons/FbuIcon';
import { IconPosition } from '../icons/IconProps';

export type CTAStyles = {
    styleClass?: string;
    iconStyleClass?: string;
    textStyleClass?: string;
}

export type CTAButtonProps = {
    text: string;
    onClick: () => void;
    iconName?: IconName;
    iconComponent?: ReactNode;
    iconPosition?: IconPosition;
    iconSize?: number,
    ctaStyles?: CTAStyles;
    styleClass?: string;
    style?: object;
};

const NO_STYLES_CTA = {
    styleClass: '',
    iconStyleClass: '',
    textStyleClass: '',
}

const CTAButton = ({ text, onClick, iconName = null, iconComponent = null, iconPosition = IconPosition.BEFORE, iconSize = 24, ctaStyles = NO_STYLES_CTA, styleClass = '', style = {}}: CTAButtonProps) => (
    <div className={`${ctaStyles.styleClass} ${styleClass}`} onClick={onClick} style={style}>
        {(iconName || iconComponent) && (iconPosition === IconPosition.BEFORE) &&
            <div className={ctaStyles.iconStyleClass}>
                {iconName && <FbuIcon name={iconName} size={iconSize} />}
                {!iconName && iconComponent}
            </div>
        }
        <div className={ctaStyles.textStyleClass}>
            {text}
        </div>
        {(iconName || iconComponent) && (iconPosition === IconPosition.AFTER) &&
        <div className={ctaStyles.iconStyleClass}>
            {iconName && <FbuIcon name={iconName} />}
            {!iconName && iconComponent}
        </div>
        }
    </div>
);

export default CTAButton;
