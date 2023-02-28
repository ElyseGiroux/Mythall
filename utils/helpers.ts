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

export const updateLoading = (status: boolean, message?: string) => {
  const isLoading = useIsLoading();
  const loadingMessage = useLoadingMessage();

  isLoading.value = status;
  loadingMessage.value = message ? message : "Les goblins travaillent «fort»...";
};

export const isLoading = () => {
  return useIsLoading().value;
};
