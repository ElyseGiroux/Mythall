export const addNotification = (message: string, seconds?: number) => {
  const notifications = useNotifications().value;
  notifications.push(message);
  setTimeout(
    () => {
      notifications.splice(
        notifications.findIndex((notification) => notification == message),
        1
      );
    },
    seconds ? seconds * 1000 : 7000
  );
};
