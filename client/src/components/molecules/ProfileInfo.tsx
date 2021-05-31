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
import { getMyProfile } from '@/api';
import { toast } from 'react-toastify';
import { Loading } from '../atoms';

interface Props {
  info?: ProfileI;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const info: ProfileI = {
  id: 3,
  email: 'nerooc@vp.pl',
  name: 'Tomasz',
  surname: 'Gajda',
  user_name: '@nerooc',
  photo_src: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo fringilla sem a condimentum. Praesent feugiat efficitur tellus non blandit. Etiam iaculis sollicitudin gravida.',
  age: 20,
  location: 'Kraków',
  rating: 47,
  list_of_interests_id: [1, 3, 5],
  social_media_URL1: 'google.com',
  social_media_URL2: 'facebook.com/',
  social_media_URL3: 'github.com/Wiktoria99/Teamder/tree/main',
};

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

export const ProfileInfo = (props: Props) => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState<ProfileI>();
  const styles = useStyles();

  useEffect(() => {
    const getProfileFnc = async () => {
      const { data } = await getMyProfile();
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
                <AntTab label="Edytuj profil" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <Box>
              <TabPanel value={value} index={0}>
                <UserInterests interests={profile.list_of_interests_id} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SocialMedia
                  links={{
                    first: profile.social_media_URL1,
                    second: profile.social_media_URL2,
                    third: profile.social_media_URL3,
                  }}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <EditProfile profile={profile} />
              </TabPanel>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
