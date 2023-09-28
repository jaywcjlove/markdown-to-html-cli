import path from "path";
import image2uri, { validUrl } from "image2uri";
import fs from 'fs-extra'


export function imgBase64(src?: string, output?: string): string {
  if (src && !validUrl(src) && /(png|apng|gif|jpg|jpeg|bm|bmp|webp|ico|svg)/i.test(src)) {
    const imgPath = path.resolve(path.dirname(output), src);
    if (fs.existsSync(imgPath)) {
      const base64 = image2uri(imgPath);
      if (base64 && typeof base64 === 'string') {
        return base64;
      }
    }
  }
  return src;
}