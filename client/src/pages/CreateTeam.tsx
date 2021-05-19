import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { 
  Layout, 
  MainWrapper,
  CustomButton,
  CustomTextField,
  useFormStyles,
  BarWrapper,
  TeamInterests,
} from '@/components';
import { CreateTeamI } from '@/interfaces';

export const CreateTeam: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<CreateTeamI>({
    host: 'Host Name',
    title: '',
    date: '',
    location: '',
    maxSize: 5,
    description: '',
    interests: [],
  });
  const styles = useFormStyles();
  const createTeam = () => {
    console.log("Test klikania createTeam " + teamInfo.title + " " + teamInfo.date);
  }

  return (
    <Layout>
      <MainWrapper
        isBackBtn
        title="Tworzenie zespołu"
        backBtnURL={'/mainpage'}
      ></MainWrapper>
      <Box 
        width='95%'
        paddingLeft='5%'
      >
        <form onSubmit={createTeam} className={styles.form}>
        <CustomTextField
          label="Nazwa zespołu"
          variant="standard"
          color="secondary"
          onChange={(e) => setTeamInfo({...teamInfo, title: e.currentTarget.value})}
          value={teamInfo.title}
        />
        <CustomTextField
          label="Data i czas"
          variant="standard"
          color="secondary"
          onChange={(e) => setTeamInfo({...teamInfo, date: e.currentTarget.value})}
          value={teamInfo.date}
        />
        <Box 
          display='flex'
        >
          <CustomTextField
            label="Lokalizacja"
            variant="standard"
            color="secondary"
            onChange={(e) => setTeamInfo({...teamInfo, location: e.currentTarget.value})}
            value={teamInfo.location}
          />
          <Box
            marginLeft='15%'
          >
          <CustomTextField
            label="Ilość miejsc"
            variant="standard"
            color="secondary"
            onChange={(e) => setTeamInfo({...teamInfo, maxSize: Number(e.currentTarget.value)})}
            value={teamInfo.maxSize}
          /></Box>
        </Box>
        <CustomTextField
          label="Opis"
          variant="standard"
          color="secondary"
          multiline
          rowsMax={4}
          onChange={(e) => setTeamInfo({...teamInfo, description: e.currentTarget.value})}
          value={teamInfo.description}
        />    
        {/* TO DO: dokończyć zainteresowania */}
        <TeamInterests/>
        <Box
          marginLeft='80%'
        >
          <CustomButton
            type="submit"
            color="secondary"
            variant="contained"
            className={styles.button}
            >Stwórz
          </CustomButton>
        </Box>
        </form>
      </Box>
    </Layout>
  );
};
