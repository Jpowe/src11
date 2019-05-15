import React from "react";
import Paper from "material-ui/Paper";
import { white, grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
import globalStyles from "../../styles";
import "../../widget.css";
import RaisedButton from "material-ui/RaisedButton";

class InfoBox extends React.Component {
  render() {
    const { color, title, value, Icon, colorText } = this.props;

    const styles = {
      content: {
        padding: "5px 10px",
        marginLeft: 90,
        height: 80
      },
      number: {
        display: "block",
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: colorText
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: colorText
      },
      iconSpan: {
        float: "left",
        height: 90,
        width: 90,
        textAlign: "center",
        backgroundColor: color,
        borderRadius: "15px"
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: "100%"
      },
      paper: {
        borderRadius: "25px"
      }
    };

    return (
      <Paper style={styles.paper} zDepth={globalStyles.depth.n}>
        <div className="container">
          <span style={styles.iconSpan}>
            <Icon color={white} style={styles.icon} />
          </span>
          <div style={styles.content}>
            <span style={styles.text}>{title}</span>
            <span style={styles.number}>{value}</span>
          </div>
          <div className="overlay">
            <div className="t">
              <div>Did you know?</div>
              <RaisedButton
                label="Button"
                style={{ marginHeight: 10 }}
                primary={true}
              />
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default InfoBox;
