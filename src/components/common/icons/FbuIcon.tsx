import * as icons from 'react-feather';

export type IconName = keyof typeof icons;

export type FbuIconProps = {
    name: IconName;
    size?: number;
    className?: string;
    style?: object;
};

const FbuIcon = ({name, size = 24, className = '', style = {}}: FbuIconProps) => {
    if (!name) {
        return null;
    }

    const Icon = icons[name];
    return <Icon width={size} height={size} className={className} style={style}/>;
};

export default FbuIcon;
