import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NotificationI } from '@/interfaces';
import { Loading, NotificationItem } from '@/components';

interface Props {}

const useStyles = makeStyles((theme) => ({
  notificationList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

const listOfNotifications: NotificationI[] = [
  {
    person: 'Jan Kowalski',
    photoSource: 'https://avatars.githubusercontent.com/u/65246171?s=400&v=4',
    title: 'Hackathon - Webdev and mobile applications! ',
  },
  {
    person: 'Irena Słowik',
    photoSource: 'https://avatars.githubusercontent.com/u/44270336?v=4',
    title: 'Festiwal tańca i śpiewu',
  },
];

export const NotificationList = (props: Props) => {
  const [notifications, setNotifications] = useState([]);
  const styles = useStyles();

  return (
    <Box className={styles.notificationList}>
      {notifications ? (
        <>
          {listOfNotifications.map((notification) => (
            <div key={notification.person}>
            <NotificationItem notification={notification} /> 
            </div>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
