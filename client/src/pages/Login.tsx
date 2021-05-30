import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import { login } from '@/api';
import { paths } from '@/routing';
import { useLocalStorage } from '@/hooks';
import { LoginRequestI } from '@/interfaces';
import { TOKEN } from '@/constants';
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
  const [token, setToken] = useLocalStorage<string>(TOKEN, '');

  const styles = useFormStyles();

  useEffect(() => {
    if (!!token) {
      history.push(paths.DASHBOARD);
    }
  }, [token]);

  const loginUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: LoginRequestI = {
      username,
      password,
    };

    try {
      const { data } = await login(user);
      setToken(data.token);
      toast.success('Zalogowano pomyślnie!');
    } catch (error) {
      toast.error('Pojawił się problem przy logowaniu!');
    }
  };

  return (
    <>
      <FormWrapper title="Logowanie!">
        <form onSubmit={loginUser} className={styles.form}>
          <CustomTextField
            label="Login"
            variant="standard"
            color="secondary"
            onChange={(e) => setUsername(e.currentTarget.value)}
            value={username}
          />
          <CustomTextField
            label="Hasło"
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
            Nie pamiętasz hasła?
          </Link>

          <CustomButton
            type="submit"
            color="secondary"
            variant="contained"
            className={styles.button}
          >
            <Typography variant="button">Zaloguj</Typography>
          </CustomButton>
        </form>
        <Link to={paths.REGISTER} className={styles.formLinkDisclaimer}>
          Nie masz jeszcze konta? <span>Zarejestruj się!</span>
        </Link>
      </FormWrapper>
    </>
  );
};
