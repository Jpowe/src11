import React from "react";
import Paper from "material-ui/Paper";
import { white, pink600, pink500, pink700 } from "material-ui/styles/colors";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import GlobalStyles from "../../styles";
import { typography } from "material-ui/styles";

const MonthlySales = props => {
  const { data, color, color2, color3 } = props;
  const styles = {
    paper: {
      backgroundColor: color,
      height: 150,
      borderRadius: "10px"
    },
    div: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "95%",
      height: 85,
      borderRadius: "10px",
      fontWeight: typography.fontWeightMedium
    },
    header: {
      color: white,
      backgroundColor: color2,
      fontSize: 18,
      fontWeight: typography.fontWeightLight,
      paddingLeft: 20,
      paddingTop: 5,
      borderRadius: "10px",
      height: "30px"
    }
  };

  return (
    <Paper style={styles.paper} zDepth={GlobalStyles.depth.n}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>
        Monthly Sales
      </div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data}>
            <Bar dataKey="uv" fill={color2} />
            <XAxis dataKey="name" stroke="none" tick={{ fill: color3 }} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MonthlySales;
