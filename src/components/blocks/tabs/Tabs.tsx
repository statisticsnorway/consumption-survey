import { ReactNode, useEffect, useState } from 'react';
import { Circle, HelpCircle } from 'react-feather';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type TabSpec = {
    id: string;
    title: string;
    icon?: ReactNode;
    renderTab: ReactNode | (() => ReactNode);
};

export enum TabRenderOption {
    TEXT,
    ICON,
};

export type TabsProps = {
    active: string;
    tabs: TabSpec[];
    onSelect: (tabId: string) => void,
    className: string;
    style?: object;
    children: ReactNode;
    renderTabAs?: TabRenderOption;
};

const Tabs = ({
                  tabs,
                  active,
                  onSelect = DO_NOTHING,
                  className = '', style = {},
                  renderTabAs = TabRenderOption.TEXT,
                  children = null,
              }: TabsProps) => {
    const [tabContent, setTabContent] = useState<ReactNode>();

    const selectTab = (e, tabId) => {
        e.preventDefault();
        onSelect(tabId);
    };

    useEffect(() => {
        const activeTab = tabs
            .find(tab => tab.id === active);

        if (activeTab) {
            setTabContent(
                (typeof activeTab.renderTab === 'function') ? activeTab.renderTab() : activeTab.renderTab
            );
        }
    }, [active, tabs]);

    const makeTabHeader = (tab) => {
      switch (renderTabAs) {
          case TabRenderOption.TEXT:
              return <span>{tab.title}</span>;
          case TabRenderOption.ICON:
              return tab.icon || <Circle width={16} height={16} />;
          default:
              return <HelpCircle />;
      }
    };

    const makeTab = (tab) => {
        return (
            <button
                className={`navigation-item ${active === tab.id ? 'active' : ''}`}
                onClick={(e) => {
                    selectTab(e, tab.id);
                }}
            >
                {makeTabHeader(tab)}
            </button>
        );
    };

    return (
        <div className={`ssb-tabs-wrapper`}>
            <div className={`ssb-tabs ${className}`} style={style}>
                {tabs.map(tab => makeTab(tab))}
            </div>
            <div className={`ssb-tabs-content`}>
                {tabContent}
                {children}
            </div>
        </div>
    );
};

export default Tabs;
