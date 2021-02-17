import { useDB } from 'react-pouchdb';
import { ImageHandlerContext } from '../../../uiContexts';
import Loader from '../Loader';

export type ErrorHandler = (err: any) => void;
export type ImageData = string;

export type ImageSaverParams = {
    id: string;
    name: string;
    image: ImageData;
    errorHandler: ErrorHandler;
};


const ImageHandler = ({children}) => {
    const db = useDB('receipts');

    const saveImage = (id: string, name:string, image:ImageData) => {
        return db.put({
            _id: id,
            _attachments: {
                [name]: {
                    content_type: 'image/png',
                    data: image,
                }
            }
        });
    };

    const getImage = (id: string, name: string) => {
        return db.getAttachment(id, name)
            .then((blob) => {
                return URL.createObjectURL(blob);
            });
    };

    return (
        <ImageHandlerContext.Provider value={{saveImage, getImage}}>
            {children}
        </ImageHandlerContext.Provider>
    );
};

export default ImageHandler;
