export const axiosUnauthorizedConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axiosAuthorizedConfig = (idToken: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  };
};
