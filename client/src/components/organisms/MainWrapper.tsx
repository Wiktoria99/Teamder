import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '@/styles';
import { ArrowBack } from '@material-ui/icons';
import { Box, makeStyles } from '@material-ui/core';

interface MainWrapperI {
  isBackBtn?: boolean;
  backBtnURL?: string;
  title?: string;
}

const useStyles = makeStyles((theme) => ({
  topPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 25px',
    width: '100%',
    height: '100px',
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
  },
  title: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '38px',
    color: colors.WHITE,
  },
  linkStyle: {
    textDecoration: 'none',
    display: 'flex',
    color: colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '30px',
    lineHeight: '38px',
    color: colors.WHITE,
  },
}));

export const MainWrapper: React.FC<MainWrapperI> = ({
  children,
  isBackBtn,
  backBtnURL,
  title,
}) => {
  const styles = useStyles();

  return (
    <>
      <Box className={styles.topPanel}>
        {isBackBtn ? (
          <Link className={styles.linkStyle} to={`${backBtnURL}`}>
            <ArrowBack />
          </Link>
        ) : (
          <h3 className={styles.welcome}>Hello there!</h3>
        )}
        <h3 className={styles.title}>{title}</h3>
      </Box>
      {children}
    </>
  );
};
