import CTAButtonGroup, { CTAButtonGroupProps } from '../../common/cta/CTAButtonGroup';

import styles from './homeCTA.module.scss';

export type HomeCTAButtonGroupProps = CTAButtonGroupProps;

const HomeCTAButtonGroup = (props: HomeCTAButtonGroupProps) => (
    <CTAButtonGroup {...props} styleClass={styles.homeCTAGroup} />
);

export default HomeCTAButtonGroup;
