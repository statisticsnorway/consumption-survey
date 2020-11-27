import { ReactNode, useState } from 'react';

export type TabSpec = {
    id: string;
    title: string;
    renderTab: () => ReactNode;
};

export type TabsProps = {
    defaultActive: string;
    tabs: TabSpec[];
    className: string;
    style?: object;
};

const Tabs = ({tabs, defaultActive, className = '', style = {}}: TabsProps) => {
    const [active, setActive] = useState(defaultActive || tabs[0].id);

    const selectTab = (e, tabId) => {
        e.preventDefault();
        setActive(tabId);
    };

    return (
        <div className={`ssb-tabs-wrapper`}>
            <div className={`ssb-tabs ${className}`} style={style}>
                {tabs.map(tab => (
                    <button
                        className={`navigation-item ${active === tab.id ? 'active' : ''}`}
                        onClick={(e) => { selectTab(e, tab.id); }}
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
