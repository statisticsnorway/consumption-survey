import dynamic from 'next/dynamic';

const OnboardingNoSSR = dynamic(
    () => import('../../components/help/onboarding/Onboarding'),
    { ssr: false }
);

const OnboardingPage = () => {
    return <OnboardingNoSSR />;
};

export default OnboardingPage;
