import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import {
  CustomButton,
  CustomTextField,
  FormWrapper,
  useFormStyles,
} from '@/components';
import { forgotPassword } from '@/api';
import { paths } from '@/routing';
import { Link } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const styles = useFormStyles();

  const forgotPasswordHandler = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const user: { username: string; email: string } = {
      username,
      email,
    };

    try {
      const { data } = await forgotPassword(user);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error, 'error');
    }
  };

  return (
    <>
      <FormWrapper title="Reset your password">
        <form onSubmit={forgotPasswordHandler} className={styles.form}>
          <CustomTextField
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.currentTarget.value)}
            value={username}
          />
          <CustomTextField
            label="E-mail"
            variant="standard"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
          />

          <CustomButton
            type="submit"
            color="secondary"
            variant="contained"
            className={styles.button}
          >
            <Typography variant="button">SUBMIT</Typography>
          </CustomButton>
        </form>
        <Link to={paths.LOGIN} className={styles.formLinkDisclaimer}>
          Go back to <span>login screen</span>
        </Link>
      </FormWrapper>
    </>
  );
};
