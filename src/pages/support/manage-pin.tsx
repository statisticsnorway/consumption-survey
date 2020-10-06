import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ManagePin = dynamic(
    () => import('../../components/auth/ManagePin'),
    {ssr: false}
);

export default () => {
    const router = useRouter();

    return (
        <ManagePin
            onComplete={() => router.push('/support/settings')}
        />
    );
}
