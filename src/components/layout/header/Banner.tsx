import styles from './header.module.scss';

export type BannerProps = {
    siteTitle: string;
    version: string;
    showVersion?: boolean;
};

const Banner = ({siteTitle, version, showVersion = true}: BannerProps) => {
    return (
        <div className={styles.banner}>
            <span className={styles.siteTitle}>{siteTitle}</span>
            {showVersion && <span className={styles.version}>{version}</span>}
        </div>
    );
};

export default Banner;
