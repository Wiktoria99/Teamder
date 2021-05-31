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
            setRegisterInfo({
              ...registerInfo,
              user_name: e.currentTarget.value,
            })
          }
          value={registerInfo.user_name}
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomTextField
            required
            style={{ width: '48%' }}
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

          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Powtórz hasło"
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                password2: e.currentTarget.value,
              })
            }
            value={registerInfo.password2}
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
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Lokalizacja"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                location: e.currentTarget.value,
              })
            }
            value={registerInfo.location}
          />

          <CustomTextField
            required
            style={{ width: '48%' }}
            label="Wiek"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                age: e.currentTarget.value,
              })
            }
            value={registerInfo.age}
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
