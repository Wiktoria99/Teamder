import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { ProfileI } from '@/interfaces';
import { CityIcon, BirthdayIcon, LikeIcon } from '@/assets';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { UserInterests, SocialMedia, EditProfile } from '@/components';
import { colors } from '@/styles';
import { getProfile } from '@/api';
import { toast } from 'react-toastify';
import { Loading } from '../atoms';
import { useParams } from 'react-router';

interface Props {
  info?: ProfileI;
}

interface Params {
  username: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const useStyles = makeStyles((theme) => ({
  basicInfoContainer: {
    display: 'flex',
    padding: '35px 0px 0px 35px',
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: '140px',
    height: '140px',
  },
  nameContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    padding: '45px 0px 0px 20px',
  },
  name: {
    fontWeight: 600,
    fontSize: 25,
    lineHeight: '125%',
    margin: 0,
  },
  defaultFont: {
    fontWeight: 100,
    fontSize: 17,
    lineHeight: '25px',
    margin: '0px 0px 0px 0px',
  },
  bioContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    padding: '15px 35px 0px',
    textAlign: 'justify',
  },
  iconBox: {
    display: 'flex',
    width: '50%',
    minWidth: '230px',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  iconInfo: {
    display: 'flex',
  },
  iconCaption: {
    fontSize: 17,
    margin: '0px 0px 0px 9px',
  },
  tabsContainer: {
    marginTop: 25,
  },
}));

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      borderBottom: `1px solid ${colors.BORDER_GRAY}`,
      fontWeight: 500,
      fontSize: 17,
      opacity: 1,
      color: colors.PRIMARY_FONT,
      '&:hover': {
        color: colors.SECONDARY,
        opacity: 1,
      },
      '&$selected': {
        color: colors.SECONDARY,
      },
    },
    selected: {},
  }),
)((props: any) => <Tab disableRipple {...props} />);

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return <div>{value === index && <Box> {children} </Box>}</div>;
}

function a11yProps(index: number) {
  return {
    id: `${index}`,
  };
}

export const ExternalProfileInfo = (props: Props) => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState<ProfileI>();
  const styles = useStyles();
  const params: Params = useParams();

  useEffect(() => {
    const getProfileFnc = async () => {
      const { data } = await getProfile(params.username);
      setProfile(data);
    };

    try {
      getProfileFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać profilu!');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!profile ? (
        <Loading />
      ) : (
        <Box>
          <Box className={styles.basicInfoContainer}>
            <Box className={styles.avatarContainer}>
              <img
                className={styles.photo}
                height="100"
                width="100"
                src={profile.photo_src}
                alt="avatar"
              />
            </Box>
            <Box className={styles.nameContainer}>
              <p className={styles.name}>
                {profile.name} {profile.surname}
              </p>
              <p className={styles.defaultFont}>{profile.user_name}</p>
            </Box>
          </Box>
          <Box className={styles.bioContainer}>
            <p className={styles.defaultFont}>{profile.bio}</p>
            <Box className={styles.iconBox}>
              <Box className={styles.iconInfo}>
                <CityIcon />
                <p className={styles.iconCaption}> {profile.location}</p>
              </Box>
              <Box className={styles.iconInfo}>
                <BirthdayIcon />
                <p className={styles.iconCaption}> {profile.age}</p>
              </Box>
              <Box className={styles.iconInfo}>
                <LikeIcon />
                <p className={styles.iconCaption}> {profile.rating}</p>
              </Box>
            </Box>
          </Box>
          <Box className={styles.tabsContainer}>
            <AppBar position="static" color="secondary">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
              >
                <AntTab label="Zainteresowania" {...a11yProps(0)} />
                <AntTab label="Social media" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <Box>
              <TabPanel value={value} index={0}>
                <UserInterests profile={profile} edit={false} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SocialMedia profile={profile} edit={false} />
              </TabPanel>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
