import React from "react";
import Paper from "material-ui/Paper";
import globalStyles from "../styles";
//import muiThemeable from "material-ui/styles/muiThemeable";

const WidgetBase = props => {
  const { title } = props;
  const styles = {
    content: {
      padding: 4
    },
    text: {
      //fontWeight: "lighter",
      fontSize: 16,
      color: "#ffffff",
      backgroundColor: "#220088",
      padding: "4px 0  4px 8px",
      borderRadius: "5px"
    },
    paper: {
      borderRadius: "5px"
    }
  };
  return (
    <div style={{ padding: "15px" }}>
      <Paper style={styles.paper} zDepth={globalStyles.depth.n}>
        <div style={styles.text}>{title}</div>
        <div style={styles.content}>{props.children}</div>
      </Paper>
    </div>
  );
};

export default WidgetBase;
