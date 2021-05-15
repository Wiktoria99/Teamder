import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';
import { Suggestions, Sidebar } from '@/components';

interface LayoutI {}

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    margin: 'auto',
    width: '100%',
    backgroundColor: colors.BLACK,
  },
  sidebarContainer: {},
  mainContainer: {
    width: '700px',
    borderLeft: `1px solid ${colors.BORDER_GRAY}`,
    borderRight: `1px solid ${colors.BORDER_GRAY}`,
  },
  interestsContainer: {},
}));

export const Layout: React.FC<LayoutI> = ({ children }) => {
  const styles = useStyles();

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.sidebarContainer}>
        <Sidebar />
      </Box>
      <Box className={styles.mainContainer}>{children}</Box>
      <Box className={styles.interestsContainer}>
        <Suggestions />
      </Box>
    </Box>
  );
};
