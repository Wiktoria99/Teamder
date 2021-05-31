import React, { useState } from 'react';
import { CustomButton, CustomTextField, useFormStyles } from '@/components';
import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { colors } from '@/styles';
import { ProfileI, EditI } from '@/interfaces';
import { editMyProfile } from '@/api';
import { toast } from 'react-toastify';

interface Props {
  profile: ProfileI;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 30,
      padding: 20,
      listStyle: 'none',
      border: `1px solid ${colors.BORDER_GRAY}`,
    },
    button: {
      borderRadius: '5px',
      height: 40,
      width: 140,
    },
    buttonPos: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: 0,
      paddingRight: 30,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  }),
);

export const EditProfile: React.FC<Props> = ({ profile }) => {
  const styles = useStyles();
  const [editInfo, setEditInfo] = useState<EditI>({
    name: profile.name,
    surname: profile.surname,
    location: profile.location,
    age: profile.age,
    bio: profile.bio,
    photo_src: profile.photo_src,
    social_media_URL1: profile.social_media_URL1,
    social_media_URL2: profile.social_media_URL2,
    social_media_URL3: profile.social_media_URL3,
    list_of_interests: profile.list_of_interests_id,
  });

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await editMyProfile(editInfo);
      console.log(data);
      toast.success('Profil został zedytowany pomyślnie!');
      window.location.reload();
    } catch (error) {
      toast.error('Nie udało się edytować profilu!');
    }
  };

  return (
    <>
      <Box className={styles.root}>
        <form onSubmit={handleClick} className={styles.form}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomTextField
              style={{ width: '46%' }}
              label="Imię"
              variant="standard"
              color="secondary"
              onChange={(e) =>
                setEditInfo({ ...editInfo, name: e.currentTarget.value })
              }
              value={editInfo.name}
            />

            <CustomTextField
              style={{ width: '46%' }}
              label="Nazwisko"
              variant="standard"
              color="secondary"
              onChange={(e) =>
                setEditInfo({ ...editInfo, surname: e.currentTarget.value })
              }
              value={editInfo.surname}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomTextField
              style={{ width: '56%' }}
              label="Miejscowość"
              variant="standard"
              color="secondary"
              onChange={(e) =>
                setEditInfo({ ...editInfo, location: e.currentTarget.value })
              }
              value={editInfo.location}
            />

            <CustomTextField
              style={{ width: '36%' }}
              label="Wiek"
              variant="standard"
              color="secondary"
              onChange={(e) =>
                setEditInfo({ ...editInfo, age: Number(e.currentTarget.value) })
              }
              value={editInfo.age}
            />
          </div>
          <CustomTextField
            label="Opis"
            variant="standard"
            color="secondary"
            multiline
            rowsMax={4}
            onChange={(e) =>
              setEditInfo({ ...editInfo, bio: e.currentTarget.value })
            }
            value={editInfo.bio}
          />
        </form>
      </Box>
      <div className={styles.buttonPos}>
        <CustomButton
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
          onClick={(e) => handleClick(e)}
        >
          <Typography variant="button">Zatwierdź</Typography>
        </CustomButton>
      </div>
    </>
  );
};
