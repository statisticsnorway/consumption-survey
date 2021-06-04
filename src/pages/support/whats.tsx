import { useTranslation } from 'react-i18next';
import { ON_FBU_COMP } from '../../components/help/onboarding/slides/OnFBU';
import { makeWorkspace } from '../../components/layout/workspace/Workspace';

const Whats = () => {
    const {t} = useTranslation('onboarding');
    return makeWorkspace(ON_FBU_COMP(t));
};

export default Whats;
