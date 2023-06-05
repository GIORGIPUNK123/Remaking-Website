import * as Yup from 'yup';
import { ItemType } from '../types';
export const addItemSchema = (itemsArr: ItemType[]) =>
  Yup.object().shape({
    id: Yup.number()
      .required('ID is requiered')
      .positive('ID has to be positive')
      .integer('ID has to be integer')
      .notOneOf(
        itemsArr.map((item) => item.id),
        'ID has been already used'
      ),
    price: Yup.number()
      .positive('Price has to be positive')
      .required('Price is required'),
    salePrice: Yup.number().moreThan(-1),
    gelPrice: Yup.number().positive('Gel price has to be positive'),
    images: Yup.array()
      .min(1, 'At least 1 image is required')
      .max(7)
      .of(
        Yup.string()
          .required('Image is required')
          .url('Image has to be a valid link')
      ),
    inStock: Yup.number().moreThan(0),
    name: Yup.string()
      .required()
      .min(2, 'Name has to contain more than 2 letters')
      .max(50, 'Name has to contain less than 50 letters'),
  });
