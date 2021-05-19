import CTAButtonGroup, { CTAButtonGroupProps } from '../../common/cta/CTAButtonGroup';

import styles from './purchasesCTA.module.scss';

export type PurchasesCTAGroupProps = CTAButtonGroupProps & {};

const PurchasesCTAGroup = (props: PurchasesCTAGroupProps) =>
    <CTAButtonGroup {...props} styleClass={styles.purchasesCTAGroup} />;

export default PurchasesCTAGroup;
