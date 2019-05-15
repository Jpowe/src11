import React from "react";
import Avatar from "material-ui/Avatar";
import { List, ListItem, makeSelectable } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import { grey400, cyan600, white } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
//import Wallpaper from "material-ui/svg-icons/device/wallpaper";
import AddNote from "material-ui/svg-icons/action/note-add";
import GlobalStyles from "../styles";
import Change from "material-ui/svg-icons/action/change-history";
import Discription from "material-ui/svg-icons/action/description";
import Open from "material-ui/svg-icons/action/open-in-browser";
import PageView from "material-ui/svg-icons/action/pageview";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import Edit from "material-ui/svg-icons/image/edit";
import { formatCurrency } from "../utils/utils";
import * as R from "ramda";

const ListWidget = props => {
  const {
    data,
    color,
    color2,
    color3,
    title,
    onclick,
    primaryText,
    ondelete,
    bDelete,
    onType,
    hideIcons,
    onAdd,
    secondaryText1,
    secondaryText2,
    secondaryText3
  } = props;

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
  /*
  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onClick={ondelete}>Delete</MenuItem>
      <MenuItem onClick={() => console.log("onclick genie")}>
        Add geneology
      </MenuItem>
    </IconMenu>
  );
*/
  const getUrgentColor = urgent => {
    return urgent ? { backgroundColor: "#aa0000" } : null;
  };

  const rowRightIcons = i => {
    return (
      <div style={{ marginTop: "10px" }}>
        <HighLightOff onClick={() => ondelete(i)} />
      </div>
    );
  };
  const rowLeftIcon = item => {
    return (
      <div style={{ marginTop: "10px" }}>
        <Edit onClick={() => onclick(item.id)} />
      </div>
    );
  };

  const getID = item => {
    const id = R.prop("id", item);

    const arrGift = R.path(["gift"], item);
    const newArrGift = !!R.filter(x => x.id !== id, arrGift)
      ? R.filter(x => x.id !== id, arrGift)
      : [];

    newArrGift.push({ id: id });
    item.gift = newArrGift;

    onType(item);
  };
  const getText = arr => {
    if (arr) {
      return R.map(x => `${x.name},      `, arr);
    } else {
      return;
    }
  };
  const formatGiftYear = str => {
    console.log("formateGiftYear str " + str);
    return str ? `${str}:   ` : "";
  };
  const getSubText = (arrField1, arrField2 = null) => {
    console.log("getSubText");
    console.log(JSON.stringify(arrField1));
    console.log(JSON.stringify(arrField2));
    let str = "";
    str = arrField1
      ? R.map(
          x =>
            x.name
              ? x.name
              : x.lastName
                ? `${x.firstName} ${x.lastName}`
                : x.requestNotes,
          arrField1
        )
      : "";
    if (!arrField2) {
      console.log("!arrField2");
      return str.toString();
    } else {
      console.log(str);
      str = "";
      str += arrField2
        ? R.map(x => formatGiftYear(x.giftYear) + x.requestNotes, arrField2)
        : "";
      //  if (arrField3) {
      //    str += `<p>($${arrField3})</div>`;
      //  }
      console.log(str);
      return str.replace(/,/g, "");
    }

    //return R.map(x => x.name, obj[field1]);
  };
  const getRecips = (arr1 = [], arr2 = [], arr3 = [], arr4 = []) => {
    let arr = [...arr1, ...arr2, ...arr3, ...arr4];
    console.table(arr);
    if (!arr) {
      return;
    }
    let str = "";
    const f = obj => {
      if (obj && R.prop("name", obj)) {
        console.log("here name");
        str += `${obj.name} `;
      } else if (obj && R.prop("firstName", obj)) {
        console.log("here firstname");
        str += `${obj.firstName} ${obj.lastName} `;
      }
    };

    R.map(f, arr);
    console.log("str " + str);
    return str;
  };
  return (
    <div style={{ padding: "10px" }}>
      <Paper
        zDepth={GlobalStyles.depth.n}
        style={(styles.paper, { backgroundColor: color })}
      >
        <List style={{ overflow: "auto", width: "400px" }}>
          <Subheader style={styles.subheader}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItem: "flex-start",
                margin: "0px 16px 10px 0px",
                cursor: "pointer"
              }}
            >
              <div>{title}</div>
              <div>
                {!hideIcons && (
                  <CircleAdd
                    color="#fff"
                    style={{ cursor: "pointer" }}
                    onClick={() => onAdd()}
                  />
                )}
              </div>
            </div>
          </Subheader>

          {props.data.map((item, i) => (
            <div
              key={item.title}
              style={{
                fontWeight: typography.fontWeightMedium
              }}
            >
              <ListItem
                leftAvatar={rowLeftIcon(item)}
                rightAvatar={rowRightIcons(item.id)}
                primaryText={
                  item[primaryText] ? (
                    <p>
                      {item[primaryText]}
                      {props.title == "Gift history" && (
                        <span>
                          <br />
                          <span
                            style={{
                              color: "#2C3673"
                            }}
                          >
                            Value:
                            {formatCurrency(item[secondaryText3])}
                          </span>
                        </span>
                      )}
                      {props.title == "Gift history" && (
                        <span>
                          <br />
                          <span
                            style={{
                              color: "#2C3673"
                            }}
                          >
                            {getRecips(
                              item["recipientPersons"],
                              item["recipientGroups"],
                              item["recipientOrganizations"],
                              item["recipientAnimals"]
                            )}
                          </span>
                        </span>
                      )}
                    </p>
                  ) : (
                    `${item["firstName"]} ${item["lastName"]}`
                  )
                }
                secondaryText={getSubText(
                  item[secondaryText1],
                  item[secondaryText2]
                )}
                secondaryTextLines={2}
                style={(getUrgentColor(item.urgent), { fontSize: "large" })}
                innerDivStyle={{
                  lineHeight: "1.2"
                }}
              />
              <Divider style={{ height: "1.5px" }} />
            </div>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default ListWidget;
