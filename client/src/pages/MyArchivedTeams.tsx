import React from 'react';
import {
  makeStyles,
  Button,
  Box,
} from '@material-ui/core/';
import { colors } from '@/styles';
import { useHistory } from 'react-router';
import { Layout, MainWrapper } from '@/components';
import { paths } from '@/routing';


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
export const MyArchivedTeams: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  return (
    <>
    <Layout>
        <MainWrapper
            isBackBtn
            title="Moje zespoły"
            backBtnURL={'/'}
        ></MainWrapper>
        <Box>
          <Box className={styles.buttonContainer}>
              <Button className={styles.disable} onClick={() =>history.push(paths.MY_TEAMS)}>Aktualne</Button>
              <Button className={styles.active}>Zakończone</Button>
          </Box>
        </Box>
        ArchivedTeams
    </Layout>
    </>
  );
};