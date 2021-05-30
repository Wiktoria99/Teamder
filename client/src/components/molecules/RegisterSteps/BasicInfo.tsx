import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import { paths } from '@/routing';
import { RegisterRequestI } from '@/interfaces';
import { CustomButton, CustomTextField, useFormStyles } from '@/components';

interface Props {
  registerInfo: RegisterRequestI;
  setRegisterInfo: any;
  updateProgressState: any;
}

export const BasicInfo: React.FC<Props> = ({
  registerInfo,
  setRegisterInfo,
  updateProgressState,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const styles = useFormStyles();

  const handleClick = (e: any) => {
    e.preventDefault();
    updateProgressState(1);
  };

  return (
    <>
      <form onSubmit={handleClick} className={styles.form}>
        <CustomTextField
          required
          label="Login"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, login: e.currentTarget.value })
          }
          value={registerInfo.login}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Imię"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, name: e.currentTarget.value })
            }
            value={registerInfo.name}
          />

          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Nazwisko"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                surname: e.currentTarget.value,
              })
            }
            value={registerInfo.surname}
          />
        </div>

        <CustomTextField
          required
          label="E-mail"
          type="email"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, email: e.currentTarget.value })
          }
          value={registerInfo.email}
        />

        <CustomTextField
          required
          label="Hasło"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              password: e.currentTarget.value,
            })
          }
          value={registerInfo.password}
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Miasto"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, city: e.currentTarget.value })
            }
            value={registerInfo.city}
          />

          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Data urodzenia"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                dayOfBirth: e.currentTarget.value,
              })
            }
            value={registerInfo.dayOfBirth}
          />
        </div>

        <CustomButton
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          <Typography variant="button">Kontynuuj</Typography>
        </CustomButton>
      </form>
      <Link to={paths.LOGIN} className={styles.formLinkDisclaimer}>
        Powrót do <span>logowania</span>
      </Link>
    </>
  );
};
