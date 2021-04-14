import dynamic from 'next/dynamic';

const LoginNoSSR = dynamic(
    () => import('../components/Login'),
    { ssr: false }
);

const Login = () => {
    return (
        <LoginNoSSR/>
    );
};

export default Login;
