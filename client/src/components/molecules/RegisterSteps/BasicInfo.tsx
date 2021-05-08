import React, { useState } from 'react';
import { CustomButton, CustomTextField, useFormStyles } from '@/components';
import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { RegisterRequestI } from '@/interfaces';
import { Link } from 'react-router-dom';
import { paths } from '@/routing';

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
            label="Name"
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
            label="Surname"
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
          label="Password"
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
            label="City"
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
            label="Day of birth"
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
          <Typography variant="button">Continue</Typography>
        </CustomButton>
      </form>
      <Link to={paths.LOGIN} className={styles.formLinkDisclaimer}>
        Go back to <span>login</span>
      </Link>
    </>
  );
};
