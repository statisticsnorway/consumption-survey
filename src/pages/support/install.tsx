import PWA from '../../components/help/onboarding/slides/PWA';
import { makeWorkspace } from '../../components/layout/workspace/Workspace';
import { isPWA } from '../../utils/pwaUtils';
import PageTitle from '../../components/common/PageTitle';

const Install = () => makeWorkspace(
    isPWA ? (
        <>
            <PageTitle title="Hurrah!"/>
            <p>Hurrah! du har allerede installert og bruker verktøyet som en app!</p>
        </>
    ) : <PWA/>
);

export default Install;
