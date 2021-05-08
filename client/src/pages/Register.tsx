import React, { useEffect, useState } from 'react';
import { BasicInfo, FormWrapper } from '@/components';
import { RegisterRequestI } from '@/interfaces';
import { AdditionalInfo } from '@/components/molecules/RegisterSteps/AdditionalInfo';
import { Interests } from '@/components/molecules/RegisterSteps/Interests';

export const Register: React.FC = () => {
  const [registerProgress, setRegisterProgress] = useState<number>(0);
  const [registerInfo, setRegisterInfo] = useState<RegisterRequestI>({
    login: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    city: '',
    dayOfBirth: null,
    bio: '',
    socialMedia: {
      first: '',
      second: '',
      third: '',
    },
    interests: [],
  });
  const titles = ['Basic information', 'Additional information', 'Interests'];

  const ChildProps = {
    registerInfo: registerInfo,
    setRegisterInfo: setRegisterInfo,
    updateProgressState: setRegisterProgress,
  };

  useEffect(() => {
    console.log(registerInfo);
  }, [registerInfo]);

  return (
    <>
      <FormWrapper title={titles[registerProgress]}>
        {registerProgress === 0 && <BasicInfo {...ChildProps} />}
        {registerProgress === 1 && <AdditionalInfo {...ChildProps} />}
        {registerProgress === 2 && <Interests {...ChildProps} />}
      </FormWrapper>
    </>
  );
};
