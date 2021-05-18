import CTAButton, { CTAButtonProps } from '../../common/cta/CTAButton';

import styles from './homeCTA.module.scss';

export type HomeCTAProps = CTAButtonProps & {};

const HOME_CTA_STYLES = {
    styleClass: styles.homeCTA,
    iconStyleClass: styles.icon,
    textStyleClass: styles.text,
};

const HomeCTA = (props: HomeCTAProps) => (
    <CTAButton {...props} ctaStyles={props.ctaStyles || HOME_CTA_STYLES} />
);

export default HomeCTA;
