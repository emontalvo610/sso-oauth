import Bowser from 'bowser';

export enum DeviceType {
  UNKNOWN_DEVICE = 0,
  MOBILE_DEVICE = 1,
  TABLET_DEVICE = 2,
  LAPTOP_DEVICE = 3,
  PC_DEVICE = 4
}

export enum DeviceOS {
  UNKNOWN_DEVICE_OS = 0,
  ANDROID_DEVICE_OS = 1,
  IOS_DEVICE_OS = 2,
  LINUX_DEVICE_OS = 3,
  WINDOWS_DEVICE_OS = 4,
  MACOS_DEVICE_OS = 5,
  FREEBSD_DEVICE_OS = 6
}

export const getBrowserInfo = (userAgent: string) => {
  const browser = Bowser.getParser(userAgent);
  return browser;
};

export const getDeviceType = (userAgent: string) => {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return DeviceType.TABLET_DEVICE;
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Acceleration|hpwOS|Fennec|Minimo|Opera M(ob|in)i|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
      userAgent
    )
  ) {
    return DeviceType.MOBILE_DEVICE;
  }
  return DeviceType.PC_DEVICE;
};

export const getDeviceOS = (userAgent: string) => {
  let os = DeviceOS.UNKNOWN_DEVICE_OS;
  if (userAgent.indexOf('Win') >= 0) os = DeviceOS.WINDOWS_DEVICE_OS;
  if (userAgent.indexOf('Mac') >= 0) os = DeviceOS.MACOS_DEVICE_OS;
  if (userAgent.indexOf('Linux') >= 0) os = DeviceOS.LINUX_DEVICE_OS;
  if (userAgent.indexOf('Android') >= 0) os = DeviceOS.ANDROID_DEVICE_OS;
  if (userAgent.indexOf('like Mac') >= 0) os = DeviceOS.IOS_DEVICE_OS;
  if (userAgent.indexOf('BSD') >= 0) os = DeviceOS.FREEBSD_DEVICE_OS;
  return os;
};
