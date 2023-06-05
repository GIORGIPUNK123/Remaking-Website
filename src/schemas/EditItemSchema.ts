import * as Yup from 'yup';
import { GeneralItemType } from '../types';
export const editItemSchema = (
  values: any,
  generalItemsArr: GeneralItemType[]
) => {
  const itemType = values.type;
  const startingPrice = generalItemsArr.find((x) => x.type === itemType)
    ?.startingPrice!;

  return Yup.object().shape({
    price: Yup.number()
      .positive('Price has to be positive')
      .required('Price is required')
      .min(
        startingPrice,
        `Price must be greater than or equal to ${startingPrice}`
      ),
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
    inStock: Yup.number().moreThan(-1),
    name: Yup.string()
      .required()
      .min(2, 'Name has to contain more than 2 letters')
      .max(50, 'Name has to contain less than 50 letters'),
  });
};
