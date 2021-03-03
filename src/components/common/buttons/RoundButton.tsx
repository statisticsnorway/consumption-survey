import { ReactNode, ReactNodeArray, MouseEvent } from 'react';

import styles from './buttons.module.scss';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type RoundButtonProps = {
  className?: string;
  children?: ReactNodeArray | ReactNode | null;
  size?: string | number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const RoundButton = ({ size = '3rem', className = '', children = null, onClick = DO_NOTHING}: RoundButtonProps) => {
    const sizeDim = (typeof size === 'string') ? size : `${size}px`;

  return (
      <button
          className={`${styles.roundButton} ${className}`}
          style={{ width: sizeDim, height: sizeDim }}
          onClick={onClick}
      >
          {children}
      </button>
  );
};

export default RoundButton;
