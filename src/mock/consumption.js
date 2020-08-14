import items from './items';

export default [
    {
        id: 1,
        source: 'Rema 1000',
        type: 'shop',
        date: new Date(2020, 7, 4),
        amount: '450.45',
        items,
    }, {
        id: 2,
        source: 'Oslo Tannlege',
        type: 'service',
        date: new Date(2020, 7, 6),
        amount: '120.99',
        items,
    }, {
        id: 3,
        source: 'Amazon UK',
        type: 'shop',
        date: new Date(2020, 7, 9),
        amount: '55.40',
        items,
    }
];
