import CTAButton, { CTAButtonProps } from '../../common/cta/CTAButton';

import styles from './purchasesCTA.module.scss';

export type PurchasesCTAProps = CTAButtonProps & {};

const PURCHASES_CTA_STYLES = {
    styleClass: styles.purchaessCTA,
    iconStyleClass: styles.icon,
    textStyleClass: styles.text,
};

const PurchaseCTA = (props: PurchasesCTAProps) =>
    <CTAButton {...props} ctaStyles={PURCHASES_CTA_STYLES} iconSize={20} />;

export default PurchaseCTA;
