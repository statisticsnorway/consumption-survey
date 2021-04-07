import * as icons from 'react-feather';

export type IconName = keyof typeof icons;

export type FbuIconProps = {
    name: IconName;
    size?: number;
};

const FbuIcon = ({ name, size = 24 }: FbuIconProps) => {
  const Icon = icons[name];
  return <Icon width={size} height={size} />
};

export default FbuIcon;
