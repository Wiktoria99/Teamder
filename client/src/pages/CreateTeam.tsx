import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import { createNewTeam, getMyProfile } from '@/api';

export const CreateTeam: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<CreateTeamI>({
    name: '',
    description: '',
    expiration_date: new Date(),
    location: '',
    longitude: 0,
    latitude: 0,
    size: 10,
    list_of_interests: [],
    cost_per_person: 0,
    host_profile_picture_url: '',
    waiting_people: [],
    accepted_people: [],
  });

  useEffect(() => {
    const getProfileFnc = async () => {
      const { data } = await getMyProfile();
      setTeamInfo({
        ...teamInfo,
        host_profile_picture_url: data.photo_src,
        accepted_people: [data.id],
      });
    };

    try {
      getProfileFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zdjecia!');
    }
  }, []);

  useEffect(() => {
    console.log(teamInfo);
  }, [teamInfo]);

  const styles = useFormStyles();
  const createTeam = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await createNewTeam(teamInfo);
      toast.success('Nowy zespół został dodany pomyślnie!');
      window.location.reload();
    } catch (error) {
      toast.error('Nie udało się dodać zespołu!');
    }
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
                  location: e.currentTarget.value,
                })
              }
              value={teamInfo.location}
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
          <TeamInterests setTeamInfo={setTeamInfo} teamInfo={teamInfo} />
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
