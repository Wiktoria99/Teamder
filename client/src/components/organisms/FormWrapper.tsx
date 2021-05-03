import React from 'react';
import { Box, Typography, makeStyles, Theme } from '@material-ui/core';

import { colors } from '@/styles';
import { paths } from '@/routing';
import { BackButton } from '@/components';
import { TeamderLogo } from '@/assets';
import BgImage from '@/assets/images/login-bg.png';

interface FormWrapperI extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  isForm?: boolean;
  showBackArrow?: boolean;
}

export const useFormStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    borderRadius: 0,
    height: 65,
    marginTop: 40,

    '& .MuiTypography-button': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
  formLink: {
    textDecoration: 'none',
    color: colors.WEEK_GREY,
    fontSize: 16,
    fontWeight: 400,
    marginTop: 40,
    textAlign: 'right',
  },
  formLinkDisclaimer: {
    textDecoration: 'none',
    color: colors.WEEK_GREY,
    fontSize: 16,
    fontWeight: 400,
    marginTop: 40,
    textAlign: 'center',

    '& span': {
      color: colors.SECONDARY,
      textDecoration: 'underline',
    },
  },
  underlineLink: {
    textDecoration: 'underline',
  },
}));

const useStyles = makeStyles<Theme, { isForm: boolean }>((theme) => ({
  pageContainer: {
    display: 'flex',
    height: '100%',
    width: '100vw',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
    backgroundImage: `url(${BgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '60% 100%',
  },
  formContainer: {
    width: '100vw',
    background: `${colors.BLACK}D9`,
    justifySelf: 'flex-end',
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      width: '50vw',
      background: colors.BLACK,
    },
  },
  formBox: {
    padding: '40px 70px 40px 70px',
    backgroundColor: colors.BLACK,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 576,
    position: 'relative',
  },
  formTitle: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 400,
    color: colors.WHITE,
  },
  formSubtitle: {
    fontSize: 16,
    fontWeight: 400,
    margin: 0,
    color: colors.WHITE,
  },
  linkIcon: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.main,
  },
  backArrow: {
    position: 'absolute',
    top: 20,
  },
}));

export const FormWrapper: React.FC<FormWrapperI> = ({
  title,
  subtitle,
  children,
  isForm = true,
  showBackArrow = false,
}: FormWrapperI) => {
  const styles = useStyles({ isForm });
  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.formContainer}>
        <TeamderLogo />
        <Box className={styles.formBox}>
          {title && (
            <Typography variant="h1" className={styles.formTitle}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="h4" className={styles.formSubtitle}>
              {subtitle}
            </Typography>
          )}
          {children}
          {showBackArrow && (
            <BackButton pathname={paths.LOGIN} classname={styles.backArrow} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
