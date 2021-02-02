import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorboxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  //changed the state to true then 1500s later, we set it back to false
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette,
      classes,
    } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        {/**The copy functionality , when you lick on the button it copies the color hex  */}

        {/** here we set background to equal this.props.background*/}
        <div style={{ background }} className={classes.Colorbox}>
          <div
            style={{ background }}
            //when copied is true we are going to add the class show into it.
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied,
            })}
          />
          {/**adding show to it depending on the state of copy if its true */}
          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: copied,
            })}
          >
            <h1>Copied!!!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
              {/**This displays the background name */}
            </div>
            <button className={classes.copyButton}>Copy</button>
            {/**This is the copy button */}
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
              {/**This is the more button */}
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
