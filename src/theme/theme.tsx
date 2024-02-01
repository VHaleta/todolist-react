import { PaletteMode } from "@mui/material";

export const getThemeOptions = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          buttonTextColor: "#fff",
          taskListBox: {
            primary: "#f2f2f2",
          },
          taskItemBox: {
            primary: "#ffffff",
          },
          addButton: {
            bg: {
              primary: "#4caf50",
              hover: "#3e8e41",
            },
          },
          editButton: {
            bg: {
              primary: "#FFA500",
              hover: "#CD853F",
            },
          },
          removeButton: {
            bg: {
              primary: "#ff4d4d",
              hover: "#ac2424",
            },
          },
        }
      : {
          buttonTextColor: "#000",
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
          addButton: {
            bg: {
              primary: "#90EE90",
              hover: "#2E8B57",
            },
          },
          editButton: {
            bg: {
              primary: "#DAA520",
              hover: "#CD853F",
            },
          },
          removeButton: {
            bg: {
              primary: "#F08080",
              hover: "#CD5C5C",
            },
          },
        }),
  },
});
