import { withTranslation } from 'next-i18next';
import NewPurchase from '../../components/purchases/NewPurchase';
import { WorkspacePanel } from '../../components/layout/Workspace';

const NewPurchasePage = ({ t }) => {
  return (
      <WorkspacePanel>
          <h3>{t('newPurchase.title')}</h3>
          <NewPurchase/>
      </WorkspacePanel>
  );
};

export default withTranslation('purchases')(NewPurchasePage);
