import { Button, withStyles } from '@material-ui/core';
import { colors } from '@/styles';

export const SideBarButton = withStyles((theme) => ({
  root: {
    borderRadius: '5px',
    color: colors.PRIMARY_FONT,
    backgroundColor: colors.BLACK,
    '&:hover': {
      color: colors.SECONDARY,
    },
  },
}))(Button);
