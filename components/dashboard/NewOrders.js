import React from "react";
import Paper from "material-ui/Paper";
import { white, purple600, purple500 } from "material-ui/styles/colors";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { typography } from "material-ui/styles";
import GlobalStyles from "../../styles";

const NewOrders = props => {
  const { data, color, color2 } = props;
  //const {color} = props;
  const styles = {
    paper: {
      backgroundColor: color,
      height: 150,
      borderRadius: "10px"
    },
    div: {
      height: 95,
      padding: "5px 15px 0 15px",
      borderRadius: "10px"
    },
    header: {
      color: white,
      backgroundColor: color2,
      fontSize: 18,
      /*fontWeight: typography.fontWeightLight,*/
      paddingLeft: 20,
      paddingTop: 5,
      borderRadius: "10px",
      height: "30px"
    }
  };

  return (
    <Paper style={styles.paper} zDepth={GlobalStyles.depth.n}>
      <div style={styles.header}>New Orders</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <LineChart data={props.data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default NewOrders;
