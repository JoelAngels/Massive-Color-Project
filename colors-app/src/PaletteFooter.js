import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PaletteFooterStyles";
function PaletteFooter(props) {
  /**footer eventually goes here */
  const { paletteName, emoji, classes } = props;
  return (
    <footer className={classes.palettefooter}>
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
