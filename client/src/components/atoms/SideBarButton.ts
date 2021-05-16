import { Button, withStyles } from '@material-ui/core';
import { colors } from '@/styles';

export const SideBarButton = withStyles((theme) => ({
  root: {
    borderRadius: '5px',
    color: colors.PRIMARY_FONT,
    fontSize: '18px',
    fontWeight: 100,
    backgroundColor: colors.BLACK,
    '&:hover': {
      color: colors.SECONDARY,
    },
  },
}))(Button);
