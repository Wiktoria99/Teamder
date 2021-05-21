import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { TeamItem } from './TeamItem';
import { TeamI } from '@/interfaces';
import { Loading } from '@/components';

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
  const [teams, setTeams] = useState([]);
  const styles = useStyles();

  //   useEffect(() => {
  //     const getTeams = async () => {
  //       const teamsFromBackend = await getTeamsFromBackend();
  //       setTeams(teamsFromBackend);
  //     };

  //     getTeams();
  //   }, []);

  return (
    <Box className={styles.teamList}>
      {teams ? (
        <>
          {listOfTeams.map((team, idx) => (
            <TeamItem key={idx} team={team} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
