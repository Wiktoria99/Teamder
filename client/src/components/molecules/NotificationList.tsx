import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NotificationItem } from '@/components';

interface Props {}

const useStyles = makeStyles((theme) => ({
  notificationList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

const listOfNotifications = [
  {
    member_name: 'Tomasz Gajda',
    team_name: 'Hackathon - Webdev and mobile applications!',
    photo_source: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  },
  {
    member_name: 'Tomasz Gajda',
    team_name: 'Hackathon - Webdev and mobile applications!',
    photo_source: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  },
  {
    member_name: 'Tomasz Gajda',
    team_name: 'Hackathon - Webdev and mobile applications!',
    photo_source: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  },
  {
    member_name: 'Tomasz Gajda',
    team_name: 'Hackathon - Webdev and mobile applications!',
    photo_source: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  },
  {
    member_name: 'Tomasz Gajda',
    team_name: 'Hackathon - Webdev and mobile applications!',
    photo_source: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  },
];

export const NotificationList = (props: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.notificationList}>
      {listOfNotifications.map((notification) => (
        <NotificationItem notification={notification} />
      ))}
    </Box>
  );
};
