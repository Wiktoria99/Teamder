import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Button,
  Box,
} from '@material-ui/core/';
import { colors } from '@/styles';
import { useHistory } from 'react-router';
import { Layout, MainWrapper, CurrentTeam } from '@/components';
import { paths } from '@/routing';
import { useParams } from 'react-router';
import { Loading } from '@/components';
// zamienić kiedyś na currentteam 
import { getTeamToJoin } from '@/api';
import { TeamI } from '@/interfaces';

interface Props {}

interface Params {
  id: string;
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
  },
  active: {
    borderRadius: 0,
    minHeight: 50,
    minWidth: 175,
    color: colors.SECONDARY,
    backgroundColor: colors.BLACK,
    borderBottom: `2px solid ${colors.SECONDARY}`,
    textTransform: 'none',
    letterSpacing: 1,
    '&:hover': {
      color: colors.SECONDARY,
    },
  },
  disable: {
    borderRadius: 0,
    minHeight: 50,
    minWidth: 175,
    color: colors.PRIMARY_FONT,
    backgroundColor: colors.BLACK,
    borderBottom: `2px solid ${colors.BLACK}`,
    textTransform: 'none',
    letterSpacing: 1,
    '&:hover': {
      color: colors.SECONDARY,
    },
  },
}));

export const TeamPage = (props: Props) => {
  const styles = useStyles();
  const history = useHistory();

  const [team, setTeam] = useState<TeamI>();
  const params: Params = useParams();

  useEffect(() => {
  const getTeamFnc = async () => {
    const { data } = await getTeamToJoin(params.id);
    setTeam(data);
  };

  getTeamFnc();
  }, []);

  return (
    <>
    <Layout>
        <MainWrapper
            isBackBtn
            title="Moje zespoły"
            backBtnURL={paths.MY_TEAMS}
        ></MainWrapper>
        <Box>
          <Box className={styles.buttonContainer}>
              <Button className={styles.active} >Aktualne</Button>
              <Button className={styles.disable} onClick={() =>history.push(paths.MY_ARCHIVED_TEAMS)}>Zakończone</Button>
          </Box>
        </Box>
        {team ? (
        <CurrentTeam team={team} />
        ) : (
        <Loading />
      )}
    </Layout>
    </>
  );
};