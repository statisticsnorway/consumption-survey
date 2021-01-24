import dynamic from 'next/dynamic';

const WelcomeNoSSR = dynamic(
    () => import('../components/Welcome'),
    { ssr: false }
);

export default function Home() {
    console.log('Home', WelcomeNoSSR);
    return <WelcomeNoSSR />
};
