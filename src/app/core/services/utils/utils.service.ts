import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  public encryptMd5(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }
}
