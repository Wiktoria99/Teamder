import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';

interface Props {
  notification: {
    member_name: string;
    team_name: string;
    photo_source: string;
  };
}

const useStyles = makeStyles((theme) => ({
  notificationItemContainer: {
    display: 'flex',
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
    padding: 40,
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
  },
  notificationText: {
    fontSize: 18,
  },
  emphasizedText: {
    color: colors.SECONDARY,
  },
  buttonContainer: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.SECONDARY,
    color: colors.BLACK,
    width: '150px',
    height: '30px',

    '&:hover': {
      backgroundColor: colors.SECONDARY_HOV,
    },
  },
}));

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const styles = useStyles();

  return (
    <Box className={styles.notificationItemContainer}>
      <Box className={styles.avatarContainer}>
        <img
          className={styles.photo}
          height="100"
          width="100"
          src={notification.photo_source}
          alt="avatar"
        />
      </Box>
      <Box className={styles.contentContainer}>
        <Box className={styles.notificationText}>
          <span className={styles.emphasizedText}>
            {notification.member_name}
          </span>{' '}
          prosi o dołączenie do zespołu{' '}
          <span className={styles.emphasizedText}>
            {notification.team_name}
          </span>
        </Box>
        <Box className={styles.buttonContainer}>
          <Button className={styles.button}>Zaakceptuj</Button>
          <Button className={styles.button}>Odrzuć</Button>
        </Box>
      </Box>
    </Box>
  );
};
