import { PaletteMode } from "@mui/material";

const theme = {
  palette: {},
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          taskListBox: {
            primary: "#f2f2f2",
          },
          taskItemBox: {
            primary: "#ffffff",
          },
          addbutton: {
            primary: "#4caf50",
            hover: "#3e8e41",
          },
        }
      : {
          taskListBox: {
            primary: "#696969",
          },
          taskItemBox: {
            primary: "#A9A9A9",
          },
          addbutton: {
            primary: "#7FFFD4",
            hover: "#3e8e41",
          },
        }),
  },
});

export default theme;
