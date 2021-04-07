import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import FbuIcon from '../components/common/FbuIcon';
import { PATHS } from '../uiConfig';

import styles from './home.module.scss';

export type Task = {
    text: string;
    onClick: () => void;
}

export type HomeProps = {
    tasks?: Task[];
};

const Home = ({tasks}: HomeProps) => {
    const {t} = useTranslation('homeTab');
    const [homeTasks, setHomeTasks] = useState<Task[]>(null);
    const router = useRouter();

    const DEFAULT_TASKS = [
        {
            text: t('questionnaire.title'),
            onClick: async () => {
                await router.push(PATHS.QUESTIONNAIRE);
            }
        },
    ];

    useEffect(() => {
        if (tasks && Array.isArray(tasks)) {
            setHomeTasks(tasks);
        } else {
            setHomeTasks(DEFAULT_TASKS);
        }
    }, [tasks]);

    console.log('t', t('title'));
    console.log('regNew', t('registerNew.fromReceipt'));
    console.log('q.t', t('questionnaire.title'));

    return (
        <>
            <button
                className={styles.registerNew}
                onClick={() => {
                    router.push(PATHS.ADD_PURCHASE);
                }}
            >
                <FbuIcon name={'PlusCircle'} size={60}/>
                {t('registerNew.fromReceipt')}
            </button>
            <div className={styles.tasks}>
                {(tasks || DEFAULT_TASKS).map(task => (
                    <div className={styles.task} onClick={task.onClick}>
                        <span className={styles.taskText}>{task.text}</span>
                        <FbuIcon name={'ArrowRight'} size={28}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
