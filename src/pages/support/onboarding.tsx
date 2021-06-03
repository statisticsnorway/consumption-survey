import dynamic from 'next/dynamic';
import OpLayout from '../../components/layout/OpLayout';

const OnboardingNoSSR = dynamic(
    () => import('../../components/help/onboarding/Onboarding'),
    { ssr: false }
);

const OnboardingPage = () => {
    return <OnboardingNoSSR />;
};

OnboardingPage.getLayout = (children) =>
    <OpLayout showAppHeader={false}>{children}</OpLayout>;

export default OnboardingPage;
