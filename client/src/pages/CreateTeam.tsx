import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import {
  Layout,
  MainWrapper,
  CustomButton,
  CustomTextField,
  useFormStyles,
  TeamInterests,
} from '@/components';
import { CreateTeamI } from '@/interfaces';

export const CreateTeam: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<CreateTeamI>({
    name: '',
    description: '',
    expiration_date: new Date(),
    location: {
      address: '',
      longitude: 0,
      latitude: 0,
    },
    size: 10,
    interests: [],
    cost_per_person: 0,
  });

  const styles = useFormStyles();
  const createTeam = () => {
    console.log('Test klikania createTeam ');
  };

  return (
    <Layout>
      <MainWrapper
        isBackBtn
        title="Tworzenie zespołu"
        backBtnURL={'/'}
      ></MainWrapper>
      <Box width="95%" paddingLeft="5%">
        <form onSubmit={createTeam} className={styles.form}>
          <CustomTextField
            label="Nazwa zespołu"
            variant="standard"
            color="secondary"
            onChange={(e) =>
              setTeamInfo({ ...teamInfo, name: e.currentTarget.value })
            }
            value={teamInfo.name}
          />
          <CustomTextField
            id="datetime-local"
            label="Data i czas"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
                //@ts-ignore
                expiration_date: e.target.value,
              })
            }
            value={teamInfo.expiration_date}
          />

          <Box display="flex">
            <CustomTextField
              label="Lokalizacja"
              variant="standard"
              color="secondary"
              onChange={(e) =>
                setTeamInfo({
                  ...teamInfo,
                  location: {
                    ...teamInfo.location,
                    address: e.currentTarget.value,
                  },
                })
              }
              value={teamInfo.location.address}
            />
            <Box marginLeft="15%">
              <CustomTextField
                label="Ilość miejsc"
                variant="standard"
                color="secondary"
                onChange={(e) =>
                  setTeamInfo({
                    ...teamInfo,
                    size: Number(e.currentTarget.value),
                  })
                }
                value={teamInfo.size}
              />
            </Box>
          </Box>

          <CustomTextField
            label="Cena za osobę"
            variant="standard"
            color="secondary"
            multiline
            rowsMax={4}
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
                cost_per_person: Number(e.currentTarget.value),
              })
            }
            value={teamInfo.cost_per_person}
          />

          <CustomTextField
            label="Opis"
            variant="standard"
            color="secondary"
            multiline
            rowsMax={4}
            onChange={(e) =>
              setTeamInfo({ ...teamInfo, description: e.currentTarget.value })
            }
            value={teamInfo.description}
          />
          {/* TO DO: dokończyć zainteresowania */}
          <TeamInterests />
          <Box marginLeft="80%">
            <CustomButton
              type="submit"
              color="secondary"
              variant="contained"
              className={styles.button}
            >
              Stwórz
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};
