import { Components, Theme } from "@mui/material/styles";

export const MuiStack: Components<Theme>['MuiStack'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      gap: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(1),

      [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(3),
      },
    }),
  },
};
