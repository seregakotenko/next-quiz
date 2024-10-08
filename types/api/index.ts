import { ConfigType, Screen } from '@/types/api/config';

export type ScreenResponseData = {
  data?: Screen;
  error?: string;
};

export type ScreensResponseData = {
  data?: Screen[];
  error?: string;
};

export type QuizConfigResponseData = {
  data?: ConfigType;
  error?: string;
};
