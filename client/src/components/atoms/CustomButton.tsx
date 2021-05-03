import { Button, withStyles } from '@material-ui/core';
import { colors } from '@/styles';

export const CustomButton = withStyles((theme) => ({
  root: {
    borderRadius: '5px',
    color: colors.BLACK,
    backgroundColor: colors.SECONDARY,
    '&:hover': {
      backgroundColor: colors.SECONDARY_HOV,
    },
  },
}))(Button);
