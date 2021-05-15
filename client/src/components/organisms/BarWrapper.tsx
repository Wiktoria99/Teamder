import React from 'react';
import { Box, Typography, makeStyles, Theme } from '@material-ui/core';
import { colors } from '@/styles';
import { TeamderLogo } from '@/assets';
import BgImage from '@/assets/images/login-bg.jpg';

interface BarI extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}


export const useSideBarStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
    width: '100%',
    height: 20,
    marginTop: 20,
    
    '& .MuiTypography-button': {
      fontSize: 16,
      fontWeight: 400,
    },
  },
  buttonYellow: {
    borderRadius: '5px',
    height: 40,
    marginTop: 40,

    '& .MuiTypography-button': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  barContainer: {
    width: '33vw',
    height: '100vw',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRight:  '1px solid #141C23',

  },
  barBox: {
    backgroundColor: colors.BLACK,
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

}));

export const BarWrapper: React.FC<BarI> = ({
  title,
  subtitle,
  children,
}: BarI) => {
  const styles = useStyles();
  return (
    <Box className={styles.barContainer}>
        <Box className={styles.barBox}>
          {children}
        </Box>
    </Box>
  );
};
