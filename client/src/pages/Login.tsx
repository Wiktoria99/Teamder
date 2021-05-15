import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import { login } from '@/api';
import { paths } from '@/routing';
import { useLocalStorage } from '@/hooks';
import { LoginRequestI } from '@/interfaces';
import { ACCESS_TOKEN, ID_TOKEN, REFRESH_TOKEN } from '@/constants';
import {
  CustomButton,
  CustomTextField,
  FormWrapper,
  useFormStyles,
} from '@/components';

export const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [idToken, setIdToken] = useLocalStorage<string>(ID_TOKEN, '');
  const [, setAccessToken] = useLocalStorage<string>(ACCESS_TOKEN, '');
  const [, setRefreshToken] = useLocalStorage<string>(REFRESH_TOKEN, '');

  const styles = useFormStyles();

  useEffect(() => {
    if (!!idToken) {
      history.push(paths.DASHBOARD);
    }
  }, [idToken]);

  const loginUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: LoginRequestI = {
      username,
      password,
    };

    try {
      const { data } = await login(user);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setIdToken(data.id_token);
    } catch (error) {
      console.log(error.response.data.error, 'error');
    }
  };

  return (
    <>
      <FormWrapper title="Welcome, login to your account!">
        <form onSubmit={loginUser} className={styles.form}>
          <CustomTextField
            label="Login"
            variant="standard"
            color="secondary"
            onChange={(e) => setUsername(e.currentTarget.value)}
            value={username}
          />
          <CustomTextField
            label="Password"
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link to={paths.FORGOT_PASSWORD} className={styles.formLink}>
            Forgot password?
          </Link>

          <CustomButton
            type="submit"
            color="secondary"
            variant="contained"
            className={styles.button}
          >
            <Typography variant="button">Login now</Typography>
          </CustomButton>
        </form>
        <Link to={paths.REGISTER} className={styles.formLinkDisclaimer}>
          Don’t have an account yet? <span>Sign up!</span>
        </Link>
      </FormWrapper>
    </>
  );
};
