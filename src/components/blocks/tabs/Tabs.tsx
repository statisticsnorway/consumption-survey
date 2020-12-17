import { ReactNode, useEffect, useState } from 'react';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type TabSpec = {
    id: string;
    title: string;
    renderTab: () => ReactNode;
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
    const selectTab = (e, tabId) => {
        e.preventDefault();
        onSelect(tabId);
    };

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
                {tabs
                    .find(tab => tab.id === active)
                    .renderTab()
                }
            </div>
        </div>
    );
};

export default Tabs;
