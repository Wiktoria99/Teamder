import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';
import { NotificationI } from '@/interfaces';

interface Props {
  notification: NotificationI;
}

const useStyles = makeStyles((theme) => ({
  notifItemContainer: {
    display: 'flex',
    
  },
  info: {
    display: 'flex',
    padding: '35px 0px 0px 35px',
  },
  avatarContainer: {
    paddingRight: 5,
  },
  photo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  nameContainer: {
    width: '100%',
    display: 'inline',
    flexFlow: 'column',
    position: 'relative',
    padding: '5px 35px 0px 20px',
    textAlign: 'justify',
  },
  name: {
    fontWeight: 200,
    fontSize: 18,
    lineHeight: '125%',
    margin: 0,
    '& span': {
      fontWeight: 600,
      cursor: 'pointer',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    position: 'relative',
    padding: '5px 35px 25px',
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
  },
  button: {
    bottom: 0,
    right: 0,
    padding: 17,
    marginLeft: 15,
    backgroundColor: colors.SECONDARY,
    color: colors.BLACK,
    width: '130px',
    height: '36px',

    '&:hover': {
      backgroundColor: colors.SECONDARY_HOV,
    },  
  },
  buttonDelete: {
    bottom: 0,
    right: 0,
    padding: 17,
    marginLeft: 15,
    fontWeight: 400,
    backgroundColor: colors.PRIMARY_BG,
    color: colors.PRIMARY_FONT,
    border: `1px solid ${colors.SECONDARY}`,
    width: '130px',
    height: '20px',

    '&:hover': {
      backgroundColor: colors.BLACK2,
    },  
  },
}));

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const styles = useStyles();

  return (
    <>
    <Box >
      <Box className={styles.info}>
        <Box className={styles.avatarContainer}>
          <img
            className={styles.photo}
            height="100"
            width="100"
            src={notification.photoSource}
            alt="avatar"
          />
        </Box>
        <Box className={styles.nameContainer}>
          <p className={styles.name}><span>{notification.person}</span> chce dołączyć do twojego zespołu <span>{notification.title}</span></p>

        </Box>
      </Box>
      <Box className={styles.buttonContainer}>
        <Button className={styles.button}>Akceptuj</Button>
        <Button className={styles.buttonDelete}>Odrzuć</Button>
      </Box>
    </Box>
    </>
  );
};
