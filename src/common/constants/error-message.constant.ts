export const ErrorMessages = {
  Auth: {
    USERNAME_EMPTY: 'Username must not be empty',
    PASSWORD_EMPTY: 'Password must not be empty',
    USERNAME_TOO_SHORT: 'Username must be at least 3 characters long',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
    ACCOUNT_ID_NOT_INTEGER: 'Account ID must be an integer',
    ACCOUNT_ID_TOO_SMALL: 'Account ID must be greater than 0',
  },
  position: {
    NAME_EMPTY: 'Position name must not be empty',
    NAME_INVALID: 'Position name must be a string',
    DESCRIPTION_INVALID: 'Description must be a string',
    BASE_SALARY_INVALID: 'Base salary must be a number',
    ID_NOT_INTEGER: 'Position ID must be an integer',
    ID_TOO_SMALL: 'Position ID must be greater than or equal to 1',
  },
};
