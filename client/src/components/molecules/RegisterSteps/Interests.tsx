import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { CustomButton, InterestsContext, useFormStyles } from '@/components';
import {
  Checkbox,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { InterestI, RegisterRequestI } from '@/interfaces';
import { register } from '@/api';
import { useLocalStorage } from '@/hooks';
import { TOKEN } from '@/constants';

import { paths } from '@/routing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'auto',
      maxHeight: 400,
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      border: '1px solid #1F1F1F',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
      },
      '& .MuiTypography-displayBlock': {
        fontSize: '18px',
      },
    },
  }),
);

interface Props {
  registerInfo: RegisterRequestI;
  setRegisterInfo: any;
  updateProgressState: any;
}

export const Interests: React.FC<Props> = ({
  registerInfo,
  setRegisterInfo,
  updateProgressState,
}) => {
  const [token, setToken] = useLocalStorage<string>(TOKEN, '');

  const history = useHistory();
  const styles = useFormStyles();
  const classes = useStyles();

  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await register(registerInfo);
      setToken(data.token);
      toast.success('Zarejestrowano pomyślnie!');
    } catch (error) {
      toast.error(error.response.data.Errors[0]);
    }
  };

  useEffect(() => {
    if (!!token) {
      history.push(paths.DASHBOARD);
    }
  }, [token]);

  const handleToggle = (value: string) => () => {
    let interestsNew = registerInfo.list_of_interests;
    interestsNew = interestsNew.includes(value)
      ? interestsNew.filter((el) => el !== value)
      : [...interestsNew, value];

    setRegisterInfo({ ...registerInfo, list_of_interests: interestsNew });
  };

  return (
    <>
      <form onSubmit={handleClick} className={styles.form}>
        <List className={classes.root}>
          {InterestList.map((value) => {
            return (
              <ListItem
                key={value.id}
                dense
                button
                onClick={handleToggle(value.name)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    color="primary"
                    checked={registerInfo.list_of_interests.includes(
                      value.name,
                    )}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItem>
            );
          })}
        </List>
        <CustomButton
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          <Typography variant="button">Zarejestruj!</Typography>
        </CustomButton>
      </form>
      <div
        onClick={() => updateProgressState(1)}
        className={styles.formLinkDisclaimer}
      >
        <span>Powrót</span>
      </div>
    </>
  );
};
