import React from 'react';
import { TeamI } from '@/interfaces';
import { Box, makeStyles } from '@material-ui/core';
import { TeamItem } from './TeamItem';

interface Props {}

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

const listOfTeams: TeamI[] = [
  {
    host: 'Tomasz Gajda',
    photoSource: 'https://avatars.githubusercontent.com/u/31045802?v=4',
    title: 'Hackathon - Webdev and mobile applications! ',
    date: '24.05',
    location: 'Kraków',
    maxSize: 10,
    curSize: 2,
    interests: ['Programming', 'Technologies'],
  },
  {
    host: 'Tomasz Gajda',
    photoSource: 'https://avatars.githubusercontent.com/u/31045802?v=4',
    title: 'Hackathon - Webdev and mobile applications! ',
    date: '24.05',
    location: 'Kraków',
    maxSize: 10,
    curSize: 2,
    interests: ['Programming', 'Technologies'],
  },
  {
    host: 'Tomasz Gajda',
    photoSource: 'https://avatars.githubusercontent.com/u/31045802?v=4',
    title: 'Hackathon - Webdev and mobile applications! ',
    date: '24.05',
    location: 'Kraków',
    maxSize: 10,
    curSize: 2,
    interests: ['Programming', 'Technologies'],
  },
];

export const TeamList = (props: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.teamList}>
      {listOfTeams.map((team) => (
        <TeamItem team={team} />
      ))}
    </Box>
  );
};
