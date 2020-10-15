import { useRouter } from 'next/router';
import { RadioGroup } from '@statisticsnorway/ssb-component-library';
import { i18n, withTranslation } from '../../../i18n';
import SettingsPanel from '../../components/blocks/SettingsPanel';
import { WorkspacePanel } from '../../components/layout/Workspace';
import { LANGUAGES } from '../../utils/jsUtils';

const Settings = ({t}) => {
    const router = useRouter();

    return (
        <>
            <h3>{t('title')}</h3>
            <p>{t('test')}</p>
            <WorkspacePanel>
                <SettingsPanel
                    title={t('pin.title')}
                    description={t('pin.description')}
                    onClick={() => {
                        router.push('/support/manage-pin')
                    }}
                />
                <SettingsPanel
                    expandable={true}
                    title={t('language.title')}
                    description={LANGUAGES[i18n.language]}
                >
                    <RadioGroup
                        onChange={(newLang) => {
                            i18n.changeLanguage(newLang);
                        }}
                        selectedValue={i18n.language}
                        orientation="column"
                        items={Object.keys(LANGUAGES).map(key => ({
                                label: LANGUAGES[key],
                                value: key,
                            })
                        )}
                    />
                </SettingsPanel>
            </WorkspacePanel>
        </>
    );
};

Settings.getInitialProps = async () => ({
    namespacesRequired: ['settings'],
});


export default withTranslation('settings')(Settings);

