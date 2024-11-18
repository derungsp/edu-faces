export interface ImageData {
  src: string;
  firstName: string;
  lastName: string;
}

export interface Class {
  identifier: string;
  imageDatas: ImageData[];
}
