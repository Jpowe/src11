import React from "react";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import { grey400, cyan600, white } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
import Wallpaper from "material-ui/svg-icons/device/wallpaper";
import GlobalStyles from "../../styles";

const RecentlyProducts = props => {
  const { data, color, color2 } = props;

  const styles = {
    subheader: {
      fontSize: 18,
      fontWeight: typography.fontWeightLight,
      backgroundColor: color2,
      color: white,
      height: "40px"
    },
    paper: {
      borderRadius: "10px"
    }
  };

  const iconButtonElement = (
    <IconButton touch={true} tooltipPosition="bottom-left">
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>View</MenuItem>
    </IconMenu>
  );

  return (
    <Paper
      zDepth={GlobalStyles.depth.n}
      style={(styles.paper, { backgroundColor: color })}
    >
      <List style={{ maxHeight: 320, overflow: "auto" }}>
        <Subheader style={styles.subheader}>Recent Products</Subheader>
        {props.data.map(item => (
          <div
            key={item.title}
            style={{ fontWeight: typography.fontWeightMedium }}
          >
            <ListItem
              leftAvatar={<Avatar icon={<Wallpaper />} />}
              primaryText={item.title}
              secondaryText={item.text}
              rightIconButton={rightIconMenu}
            />
            <Divider inset={true} />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default RecentlyProducts;
