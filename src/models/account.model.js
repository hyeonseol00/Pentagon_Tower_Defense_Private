const accounts = [];

export const addAccount = (account) => {
  accounts.push(account);
};

export const getAccounts = () => {
  return accounts;
};
