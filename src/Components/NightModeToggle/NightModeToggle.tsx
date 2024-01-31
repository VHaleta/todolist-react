import { Box, Switch } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Switch onChange={() => toggleColorMode()} />
      {mode} mode
    </Box>
  );
};

export default NightModeToggle;
