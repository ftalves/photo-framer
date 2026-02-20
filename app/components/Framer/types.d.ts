import { MAP_ASPECT_PRESET_TO_DIMENSIONS } from '@/app/utils/constants';

export type AspectRatio = keyof typeof MAP_ASPECT_PRESET_TO_DIMENSIONS | '';

export type ImageItem = {
  image: HTMLImageElement;
  mimeType: string;
  extension: string;
  src: string;
};
