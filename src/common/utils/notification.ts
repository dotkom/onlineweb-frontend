/**
 * Wrapper for browser notifications.
 */

/**
 * Verify browser support for Notifications.
 */
export const verifyNotification = (): boolean => {
  return 'Notification' in window;
};

/**
 * @summary Resolve permission to use notifications.
 * @description Resolve if the user allows notifications for this app.
 * If notifications are not supported; return false.
 * If notifications are already granted; return true.
 * If all else fails; return false.
 * @returns {boolean} Whether the user allows notifications or not.
 */
export const resolveNotificationPermission = (): boolean => {
  if (!verifyNotification()) {
    return false;
  } else if (Notification.permission === 'granted') {
    return true;
  }
  return false;
};

export const getNotificationPermission = async (): Promise<boolean> => {
  if (verifyNotification()) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return true;
    }
  }
  return false;
};
