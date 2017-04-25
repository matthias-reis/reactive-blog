import React from 'react';
import jss from 'jss';
const styles = {
  hallo: {
    fontSize: 120,
    color: 'tomatored'
  }
};

const { classes } = jss.createStyleSheet(styles).attach();
export default () => <h1 className={classes.hallo}>Hallo Woodward!</h1>;
