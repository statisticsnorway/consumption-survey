export const pad = (items) => ([ { 0: '     ' }, ...items ]);

export const makeOptions = (items) =>
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.name }), { 0: '     ' });

export const getSelection = (sel, items) => {
    const padded = pad(items);
    const res = (sel > 0) ? padded.find((item) => `${item.id}` === sel) : padded[0];
    console.log('searching', sel, items, res);
    return res;
}

const DMY = /(\d{2})\.(\d{2})\.(\d{4})/;
export const convertDate = (hDate) =>
    new Date(hDate.replace(DMY,'$3-$2-$1'));
