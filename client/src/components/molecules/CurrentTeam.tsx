import React, { useContext, useState } from 'react';
import { InterestI, TeamI } from '@/interfaces';
import { Box } from '@material-ui/core';
import { colors } from '@/styles';
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  CalendarIconY,
  InterestsIconY,
  LocationIconY,
  TeamIconY,
} from '@/assets';
import { InterestsContext } from '../atoms';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { UserInterests, SocialMedia, EditProfile } from '@/components';

interface Props {
  team: TeamI;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const useStyles = makeStyles((theme) => ({
  teamItemContainer: {
    display: 'flex',
    padding: 40,
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
  },
  hostName: {
    fontWeight: 100,
    fontSize: 16,
    lineHeight: '22px',
    margin: 0,
  },
  teamTitle: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '125%',
    margin: 0,
  },
  infoBox: {
    display: 'flex',
    width: '70%',
    minWidth: '230px',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  iconInfo: {
    display: 'flex',
  },
  minorInfo: {
    fontSize: 16,
    margin: '0px 0px 0px 7px',
  },
  interestsContainer: {
    paddingTop: 10,
    display: 'flex',
    flexFlow: 'column',
  },
  interestsLabel: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px',
  },
  interestsText: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '125%',
    margin: 0,
    marginLeft: '10px',
    color: colors.SECONDARY,
  },
  interestsList: {
    fontSize: '16px',
    marginTop: '10px',
  },
  tabsContainer: {
    marginTop: 25,
  },
  customBox: {
    fontSize: '17px',
    margin: 30,
    padding: 10,
    listStyle: 'none',
    border: `1px solid ${colors.BORDER_GRAY}`,
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

export const CurrentTeam: React.FC<Props> = ({ team }) => {
  const styles = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

  return (
    <Box>
      <Box className={styles.teamItemContainer}>
        <Box className={styles.avatarContainer}>
          <img
            className={styles.photo}
            src={team.host_profile_picture_url}
            height="100"
            width="100"
            alt="avatar"
          />
        </Box>
        <Box className={styles.contentContainer}>
          <p className={styles.hostName}>{team.host}</p>
          <h3 className={styles.teamTitle}>{team.name}</h3>
          <Box className={styles.infoBox}>
            <Box className={styles.iconInfo}>
              <CalendarIconY />
              <p className={styles.minorInfo}>
                {new Date(team.expiration_date!).toLocaleDateString('us-US')}
              </p>
            </Box>
            <Box className={styles.iconInfo}>
              <LocationIconY />
              <p className={styles.minorInfo}>{team.location}</p>
            </Box>
            <Box className={styles.iconInfo}>
              <TeamIconY />
              <p className={styles.minorInfo}>
                {team.accepted_people_id?.length}/{team.size}
              </p>
            </Box>
          </Box>
          <Box className={styles.interestsContainer}>
            <Box className={styles.interestsLabel}>
              <InterestsIconY />
              <p className={styles.interestsText}>Zainteresowania</p>
            </Box>
            <Box className={styles.interestsList}>
              {team.list_of_interests_id!.map((interest_id, idx) => {
                if (InterestList.length) {
                  const interest = InterestList.find(
                    (x) => x.id === interest_id,
                  )!.name;

                  return idx !== team.list_of_interests_id!.length - 1
                    ? interest + ', '
                    : interest;
                }
              })}
            </Box>
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
            <AntTab label="Opis" {...a11yProps(0)} />
            <AntTab label="Członkowie" {...a11yProps(1)} />
            <AntTab label="Forum" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <Box>
          <TabPanel value={value} index={0}>
            <Box className={styles.customBox}>
              {team.description ? team.description : 'Brak opisu'}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={styles.customBox}> </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box className={styles.customBox}> </Box>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};
