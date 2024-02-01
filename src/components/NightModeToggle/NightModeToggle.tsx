import { Box, Switch } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { switchBoxSx } from "./NightModeSwitch";

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box sx={switchBoxSx}>
      <Switch onChange={() => toggleColorMode()} />
      {mode} mode
    </Box>
  );
};

export default NightModeToggle;
