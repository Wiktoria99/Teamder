import React from 'react';
import { CustomButton, CustomTextField, useFormStyles } from '@/components';
import { Typography } from '@material-ui/core';
import { RegisterRequestI } from '@/interfaces';

interface Props {
  registerInfo: RegisterRequestI;
  setRegisterInfo: any;
  updateProgressState: any;
}

export const AdditionalInfo: React.FC<Props> = ({
  registerInfo,
  setRegisterInfo,
  updateProgressState,
}) => {
  const styles = useFormStyles();

  const handleClick = (e: any) => {
    e.preventDefault();
    updateProgressState(2);
  };

  return (
    <>
      <form onSubmit={handleClick} className={styles.form}>
        <CustomTextField
          multiline
          label="Biogram"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({ ...registerInfo, bio: e.currentTarget.value })
          }
          value={registerInfo.bio}
        />
        <CustomTextField
          label="Social Media URL #1"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              social_media_URL1: e.currentTarget.value,
            })
          }
          value={registerInfo.social_media_URL1}
        />
        <CustomTextField
          label="Social Media URL #2"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              social_media_URL2: e.currentTarget.value,
            })
          }
          value={registerInfo.social_media_URL2}
        />

        <CustomTextField
          label="Social Media URL #3"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              social_media_URL3: e.currentTarget.value,
            })
          }
          value={registerInfo.social_media_URL3}
        />

        <CustomTextField
          label="Photo source file"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              photo_src: e.currentTarget.value,
            })
          }
          value={registerInfo.photo_src}
        />
        <CustomButton
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          <Typography variant="button">Kontynuuj</Typography>
        </CustomButton>
      </form>
      <div
        onClick={() => updateProgressState(0)}
        className={styles.formLinkDisclaimer}
      >
        <span>Powrót</span>
      </div>
    </>
  );
};
