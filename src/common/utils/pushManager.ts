/**
 * Verify browser support for Push Manager.
 */
export const verifyPushManager = (): boolean => {
  return 'PushManager' in window;
};
