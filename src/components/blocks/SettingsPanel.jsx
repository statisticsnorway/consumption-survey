import styles from './settings.module.scss';

const SettingsPanel = ({ title, description, onClick }) => {
    return (
        <section onClick={onClick} className={styles}>
            <h4>{title}</h4>
            <h5>{description}</h5>
        </section>
    );
};

export default SettingsPanel;
