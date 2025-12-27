// theme/overrides.ts
import { Components, Theme } from "@mui/material/styles";

export const MuiListItemButton: Components<Theme>["MuiListItemButton"] = {
    styleOverrides: {
        root: ({ theme }) => ({
            "&:hover": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.action.hover,
            },
        }),
    },
};
