import { Injectable } from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";

/**
 * This service is used to recognize which device is the app running at
 */
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private deviceService: DeviceDetectorService) {}

  isMobile(): boolean {
    return this.deviceService.isMobile();
  }

  osVersion(): string {
    return this.deviceService.os_version;
  }

  isTablet(): boolean {
    return this.deviceService.isTablet();
  }

  isDesktop(): boolean {
    return this.deviceService.isDesktop();
  }

  isAndroid(): boolean {
    return this.deviceService.os === 'android';
  }

  isIOS(): boolean {
    return this.deviceService.os === 'ios';
  }
}
