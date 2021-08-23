export const getNotificationRequest = () => ({
  type: 'NOTIFICATION_REQUEST',
});

export const getNotificationSuccess = (notification) => ({
  type: 'NOTIFICATION_SUCCESS',
  notification,
});

export const getNotificationFailure = (error) => ({
  type: 'NOTIFICATION_FAILURE',
  error,
});
