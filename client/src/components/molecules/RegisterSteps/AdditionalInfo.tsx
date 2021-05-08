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
          label="Bio"
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
              socialMedia: {
                ...registerInfo.socialMedia,
                first: e.currentTarget.value,
              },
            })
          }
          value={registerInfo.socialMedia.first}
        />
        <CustomTextField
          label="Social Media URL #2"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              socialMedia: {
                ...registerInfo.socialMedia,
                second: e.currentTarget.value,
              },
            })
          }
          value={registerInfo.socialMedia.second}
        />

        <CustomTextField
          label="Social Media URL #3"
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              socialMedia: {
                ...registerInfo.socialMedia,
                third: e.currentTarget.value,
              },
            })
          }
          value={registerInfo.socialMedia.third}
        />
        <CustomButton
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          <Typography variant="button">Continue</Typography>
        </CustomButton>
      </form>
      <div
        onClick={() => updateProgressState(0)}
        className={styles.formLinkDisclaimer}
      >
        Go <span>back</span>
      </div>
    </>
  );
};
