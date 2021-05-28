export const axiosUnauthorizedConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axiosAuthorizedConfig = (token: string) => {
  if (!token) {
    return null;
  }

  //deleting quotes from token
  token = token.replace(/["']/g, '');
  console.log(`Token ${token}`);

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
};
