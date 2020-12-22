import { ReactNode, useEffect, useState } from 'react';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type TabSpec = {
    id: string;
    title: string;
    renderTab: ReactNode | (() => ReactNode);
};

export type TabsProps = {
    active: string;
    tabs: TabSpec[];
    onSelect: (tabId: string) => void,
    className: string;
    style?: object;
};

const Tabs = ({
                  tabs,
                  active,
                  onSelect = DO_NOTHING,
                  className = '', style = {}
              }: TabsProps) => {
    const [tabContent, setTabContent] = useState<ReactNode>();

    const selectTab = (e, tabId) => {
        e.preventDefault();
        onSelect(tabId);
    };

    useEffect(() => {
        const activeTab = tabs
                .find(tab => tab.id === active);
        setTabContent(
            (typeof activeTab.renderTab === 'function') ? activeTab.renderTab() : activeTab.renderTab
        );
    }, [active, tabs]);

    return (
        <div className={`ssb-tabs-wrapper`}>
            <div className={`ssb-tabs ${className}`} style={style}>
                {tabs.map(tab => (
                    <button
                        className={`navigation-item ${active === tab.id ? 'active' : ''}`}
                        onClick={(e) => {
                            selectTab(e, tab.id);
                        }}
                    >
                        <span>{tab.title}</span>
                    </button>
                ))}
            </div>
            <div className={`ssb-tabs-content`}>
                {tabContent}
            </div>
        </div>
    );
};

export default Tabs;
