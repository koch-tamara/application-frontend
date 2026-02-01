
export interface ImageInformation {
    altText: string,
    relativePath: string,
    imageName: string,
    imageFormat: ImageFormat;
}

export enum ImageFormat {
  Jpeg = 'jpeg',
  Png = 'png',
  Svg = 'svg'
}