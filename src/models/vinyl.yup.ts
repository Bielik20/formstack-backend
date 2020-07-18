import * as Yup from 'yup';
import { Vinyl } from './vinyl';

export const VinylYup = Yup.object<Vinyl>({
  id: Yup.string().required(),
  artist: Yup.string().required(),
  album: Yup.string().required(),
  cover: Yup.string().required(),
});
