import {
  MAP_ASPECT_PRESET_TO_DIMENSIONS,
  MAP_EXPORT_FORMAT_TO_LABEL,
} from '@/app/utils/constants';

export type AspectRatio = keyof typeof MAP_ASPECT_PRESET_TO_DIMENSIONS | '';

export type ExportFormat = keyof typeof MAP_EXPORT_FORMAT_TO_LABEL;
