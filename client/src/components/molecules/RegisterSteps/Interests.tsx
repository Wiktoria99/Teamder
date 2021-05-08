import React from 'react';
import { CustomButton, useFormStyles } from '@/components';
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
import { RegisterRequestI } from '@/interfaces';
import { InterestList } from '@/constants';

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
  const styles = useFormStyles();
  const classes = useStyles();

  const handleClick = (e: any) => {
    e.preventDefault();
    //REGISTER API CALL
    //REROUTE
  };

  const handleToggle = (value: string) => () => {
    let interestsNew = registerInfo.interests;
    interestsNew = interestsNew.includes(value)
      ? interestsNew.filter((el) => el !== value)
      : [...interestsNew, value];

    console.log(interestsNew);

    setRegisterInfo({ ...registerInfo, interests: interestsNew });
  };

  return (
    <>
      <form onSubmit={handleClick} className={styles.form}>
        <List className={classes.root}>
          {InterestList.map((value) => {
            return (
              <ListItem key={value} dense button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    color="primary"
                    checked={registerInfo.interests.includes(value)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={value} />
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
          <Typography variant="button">Register!</Typography>
        </CustomButton>
      </form>
      <div
        onClick={() => updateProgressState(1)}
        className={styles.formLinkDisclaimer}
      >
        Go <span>back</span>
      </div>
    </>
  );
};
