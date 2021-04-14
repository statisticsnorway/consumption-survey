import styles from './user.module.scss';

export type UserDetails = {
    pid: string;
    respondentId: string;
    ioNumber: number;
    diaryStart: string;
    diaryEnd: string;
    name: string;
    gender: string;
    dateOfBirth: string;
}

export type UserCardProps = {
    details: UserDetails;
}
const UserCard = ({details}: UserCardProps) => {
    const {name, respondentId, ioNumber, diaryStart, diaryEnd, pid: fnr} = details;
    return (
        <div className={styles.userCard}>
            <div className={styles.header}>

            </div>
            <div className={styles.body}>
                <span className={styles.fieldName}>Navn:</span>
                <span className={styles.fieldValue}>{name}</span>

                <span className={styles.fieldName}>Respondent ID:</span>
                <span className={styles.fieldValue}>{respondentId} ({fnr})</span>

                <span className={styles.fieldName}>IO Nummer:</span>
                <span className={styles.fieldValue}>{ioNumber}</span>

                <span className={styles.fieldName}>Føringsperiode:</span>
                <span className={styles.fieldValue}>{diaryStart} - {diaryEnd}</span>
            </div>
        </div>
    );
};

export default UserCard;
