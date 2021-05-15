import React from 'react';
import { Box, Typography, makeStyles, Theme } from '@material-ui/core';
import { colors } from '@/styles';
import { TeamderLogo } from '@/assets';
import BgImage from '@/assets/images/login-bg.jpg';
// import Suggestions from '@/components/molecules';

interface MainWrapperI extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const MainWrapper: React.FC<MainWrapperI> = ({
  title,
  subtitle,
  children,
}: MainWrapperI) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
        <div>Column 1 </div>
        <div>Column 2</div>
        <div>Column 3</div>
    </div>
  );
};
