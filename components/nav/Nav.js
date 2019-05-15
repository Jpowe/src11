import React, { Component } from "react";
import R from "ramda";
import classNames from "classnames";
import "./App.css";
import "../Tooltip.css";
import Item from "./Item";
import ItemRow from "./ItemRow";
import { data1, data2, data3 } from "./data";
import Remove from "material-ui/svg-icons/content/remove";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import ExpandLess from "material-ui/svg-icons/navigation/arrow-drop-up";
import ExpandMore from "material-ui/svg-icons/navigation/arrow-drop-down";
import Home from "material-ui/svg-icons/action/home";
import { withRouter } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import { castEachAsNmbr } from "../../utils/utils";

const sortByField = field => R.sortBy(R.prop(field));

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //data1: sortByField("name")(data1),
      data1: data1,
      data2: data2,
      data3: data3,
      items1: data1,
      items2: data2,
      items3: data3,
      level1Selection: null,
      level2Selection: null,
      level3Selection: null,
      levels: 3,
      currentSelection: null,
      currentSelectionLeaf: false,
      currentFavorite: null,
      showFavorites: true,
      bInitCalled: false,
      width: window.innerWidth
    };
  }
  componentWillMount() {
    let allData = [
      ...this.state.data1,
      ...this.state.data2,
      ...this.state.data3
    ];
    //  console.table(allData);
    //console.table(this.props.authorizations);
    this.setState({
      data: [...this.state.data1, ...this.state.data2, ...this.state.data3],
      items1: this.getArrayofAuthApps(
        this.state.data1,
        this.props.authorizations
      ),
      items2: this.getArrayofAuthApps(
        this.state.data2,
        this.props.authorizations
      )
    });
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }
  /**
   * CRUDS
   */
  getObj(id) {
    return R.find(R.propEq("id", id))(this.state.data);
  }
  setObjProp = (prop, item, value) => {
    console.log("setObjProp " + [prop, item, value]);
    let a = R.find(x => x.id == item, this.state.data);
    a[prop] = value;
    console.table(this.state.data);
    this.setState({ data: this.state.data });
  };
  getArrayofAuthApps(data, filterObj) {
    console.log("getArrayofAuthApps f");
    console.table(data);
    //  console.table(R.prop("queries", filterObj));
    //const dataQueried = R.prop("queries", filterObj);
    //  const dataMutation = R.prop("mutations", filterObj);
    console.table(R.filter(x => R.contains(x.allow, filterObj), data));
    /* hack to show Joe all apps */
    if (this.props.login === "jpower@bluesprucecapital.com") {
      return data;
    }
    return R.filter(x => R.contains(x.allow, filterObj), data);
    /* temp */
    //return data;
    /**/
    //const f = (name, data) => R.filter(x => x.name == name, data);
    //  const f2 = R.map(x => f(x.name, data), filterObj);
    //  return R.flatten(f2);
  }
  /* set non-selectedA items of a level to 'show = false'*/
  updateSiblings(id, level) {
    return R.map(
      x => (x.id !== id ? R.merge(x, { show: false }) : x),
      this.state["items" + level]
    );
  }
  updateParent = id => {
    console.log("updateParent");
    console.log(JSON.stringify(this.getObj(id)));
    console.log("parent id to update " + R.prop("parentId", this.getObj(id)));
    const n = R.prop("parentId", this.getObj(id));
    if (!n) {
      return;
    }
    this.setObjProp("show", n, false);
  };

  onclick = item => {
    console.log("onclick f item: " + JSON.stringify(item));
    item.leaf && this.props.closeSelf();
    const { id, level } = item;
    console.log("nav id " + id);
    console.log("this.state.level1Selection " + this.state.level1Selection);
    /* if id == 14 (Quick Access module) then process differently */
    if (id === this.state.level1Selection && id != 14) {
      console.log("SAME.   SELECTED SAME as level1selection");
      this.home();
      return;
    }
    /** ID == state.level2Selection   HERE **/
    if (id === this.state.level2Selection) {
      console.log("SAME.   SELECTED SAME as level2selection");
      //this.updateLevelToShow(2)
      this.gotoLevel2();
      return;
    }

    let x = this.getObj(id);
    let isLeaf = x.leaf;
    isLeaf ? this.setState({ currentFavorite: null }) : null;
    this.setState({ currentSelectionLeaf: isLeaf });
    if (level === 1) {
      this.setState({ items3: data3 });
    }
    this.setState({
      ["level" + level + "Selection"]: id,
      ["level" + (level + 1) + "Selection"]: null
    });
    if (!isLeaf) {
      this.updateParent(id);
      let b = this.updateSiblings(id, level);
      this.setState({ ["items" + level]: b });
      let arrChildren = R.filter(
        x => x.level == level + 1 && x.parentId == id,
        this.state.data
      );
      let ep = R.props(["endpoint"], arrChildren[0]);
      let childID = R.props(["id"], arrChildren[0]);
      //let ep = item.endpoint;
      this.props.history.push(`${ep}`);
      this.setState({
        currentSelection: childID[0]
        //////  currentSelectionLeaf: true
      });
      this.props.closeSelf();
    } else {
      this.setCurrentSelection(id);
    }
    if (level <= this.state.levels) {
      this.showChildrenLevel(id, level);
    }
  };

  addToFavs = () => {
    console.log(
      "addtofavs f this.state.currentSelectionLeaf " +
        this.state.currentSelectionLeaf
    );
    console.log(this.state.showFavorites);
    /// do: instead of  return if csl is false, add first child.
    ///adding first child as true on click only to bypass this return
    /*
    if (!this.state.currentSelectionLeaf) {
      return;
    }*/
    console.log(this.state.currentSelection);
    let obj = this.getObj(this.state.currentSelection);
    console.log(JSON.stringify(obj));
    if (obj.leaf) {
      this.setObjProp("favorite", this.state.currentSelection, true);
    }
    this.saveFavs();
  };
  removeFromFavs = (removeItem = this.state.currentFavorite) => {
    console.log("removeFromFavs f " + removeItem);
    this.setObjProp("favorite", removeItem, false);
    this.saveFavs();
  };

  saveFavs = () => {
    console.log("saveFavs");
    const isFav = x => x == true;
    let b = R.filter(x => isFav(x.favorite), this.state.data);
    console.table(b);
    let favs = R.map(x => x.id, b);
    console.table(favs);
    this.props.setFavs(favs);
  };

  /* set elected item's children to  'show = true'*/
  updateChildren(id, level) {
    return R.map(
      x => (x.parentId === id ? R.merge(x, { show: true }) : x),
      this.state["items" + level]
    );
  }
  showChildrenLevel(id, level) {
    console.log("showchild id: " + id);
    let nextLevel = level + 1;
    let c = this.updateChildren(id, nextLevel);
    //console.log("ALL children json:  " + JSON.stringify(c));
    this.setState({ ["items" + nextLevel]: c });
  }
  fStyle(show, id = 0) {
    let addCSS = "";
    if (id === this.state.level1Selection && !this.state.currentSelectionLeaf) {
      /** hack for fly-out for different text lengths  11= addepar **/
      if (id === 11) {
        addCSS = "todoitemA selectedA";
      } else {
        addCSS = "todoitemA selectedA2";
      }
    } else if (
      id === this.state.level1Selection &&
      this.state.level2Selection
    ) {
      addCSS = "todoitemC";
    } else {
      addCSS = "todoitemA";
    }
    return show ? addCSS : "hide1A hide2A";
  }
  fStyle2(show, id = 0) {
    let addCSS = "";
    if (this.state.level2Selection === id && !this.state.currentSelectionLeaf) {
      addCSS = "todoitemB selectedA";
    } else {
      addCSS = "todoitemB";
    }
    return show ? addCSS : "hide1A hide2A";
  }
  favoriteItem = n => {
    console.log("favoriteItem f : " + n);
    if (!n) {
      return;
    }
    this.props.closeSelf();
    this.setState({ currentFavorite: n });
    this.setCurrentSelection(n);
  };
  setCurrentSelection = n => {
    this.setState({ currentSelection: n });
    let obj = this.getObj(n);
    this.props.history.push(`${obj.endpoint}`);
  };
  renderFavs = data => {
    const o = R.filter(x => x.favorite === true, data);
    //console.table(o);
    //console.log("renderFavs f filtered-- " + JSON.stringify(o));
    return o.map(x => (
      <div
        style={{
          textAlign: "left",
          color: "white",
          //////width: "191",
          marginLeft: 20,
          //height: 20,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
          //  paddingTop: "6px"
        }}
        key={x.id}
      >
        <ItemRow
          id={x.id}
          onclick={this.favoriteItem}
          ondelete={this.removeFromFavs}
          name={x.name}
          currentSelection={this.state.currentSelection == x.id ? true : false}
        />
      </div>
    ));
  };

  renderRemove = () => {
    return (
      <span
        onClick={() => this.addToFavs()}
        style={{ margin: 10, cursor: "pointer" }}
      >
        <Remove style={{ color: "#ffff00" }} />
      </span>
    );
  };
  /**
   *set show to false for all, then filter level and set to true
   **/
  /** ?? TAKEOUT LEVEL ??? */
  updateLevelToShow = (level, parentId = null) => {
    console.log("updateLevelToShow f");
    R.map(x => (x.show = false), this.state.data);
    const a = R.filter(
      x => x.parentId == parentId || x.id == parentId,
      this.state.data
    );

    R.map(x => (x.show = true), a);

    console.table(a);
  };

  home = () => {
    console.log("home f");
    this.updateLevelToShow(1);
    this.setState({
      items1: this.getArrayofAuthApps(data1, this.props.authorizations),
      items2: this.getArrayofAuthApps(data2, this.props.authorizations),
      items3: this.getArrayofAuthApps(data2, this.props.authorizations),
      level1Selection: null,
      level2Selection: null,
      level3Selection: null,
      currentSelection: null
    });
  };
  gotoLevel2() {
    console.log("gotoLevel2");
    this.updateLevelToShow(2, 8);
    /* keep current level2Selection */
    this.setState({
      items1: this.getArrayofAuthApps(data1, this.props.authorizations),
      items2: this.getArrayofAuthApps(data2, this.props.authorizations),
      items3: this.getArrayofAuthApps(data2, this.props.authorizations),
      level1Selection: 8,
      currentSelection: 31
    });
  }
  handleToggleFavorites() {
    console.log("handleToggleFavorites f");
    this.setState({ showFavorites: !this.state.showFavorites });
  }
  getTooltip = () => {
    //console.log("getTooltip");
    return (
      <div
        style={{ marginLeft: 30, cursor: "pointer" }}
        onClick={() => this.addToFavs()}
        tooltip="Add current page to favorites"
        tooltip-position="bottom"
      >
        <CircleAdd color="white" />
      </div>
    );
  };
  getNoTooltip = () => {
    return (
      <div
        style={{ marginLeft: 30, cursor: "pointer" }}
        onClick={() => this.addToFavs()}
      >
        <CircleAdd color="white" />
      </div>
    );
  };
  renderTitleBarFavs = () => {
    return (
      <div
        style={{
          textAlign: "left",
          width: 200,
          //  padding: 10,
          marginTop: 20,
          marginLeft: 0,
          color: "white",
          fontWeight: "bold"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
            //  backgroundColor: "#222"
          }}
        >
          <div
            style={{
              //alignSelf: "flex-end",
              marginLeft: 20
            }}
          >
            Favorites
          </div>
          {this.state.width > 500 ? this.getTooltip() : this.getNoTooltip()}
          <div
            onClick={() => this.handleToggleFavorites()}
            style={{
              cursor: "pointer",
              //backgroundColor: "#002200",
              padding: 0,
              cursor: "pointer"
            }}
          >
            {this.state.showFavorites ? (
              <ExpandLess
                style={{
                  color: "white",
                  height: "28px",
                  width: "28px"
                }}
              />
            ) : (
              <ExpandMore
                style={{
                  color: "white",
                  height: "28px",
                  width: "28px"
                }}
              />
            )}
          </div>
        </div>
        <hr />
      </div>
    );
  };

  renderMainNavHeader() {
    return (
      <div
        style={{
          textAlign: "left",
          width: 200,
          padding: 0,
          marginTop: 20,

          color: "white",
          fontWeight: "bold"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            cursor: "pointer",
            paddingRight: 0
          }}
        >
          <span
            style={{
              height: 24,
              marginLeft: 20
            }}
            onClick={this.home}
          >
            Main menu
          </span>
          <div style={{ paddingRight: 3 }}>
            <Home
              className=""
              color="white"
              style={{ overflow: "visible" }}
              onClick={this.home}
            />
          </div>
        </div>
        <hr />
      </div>
    );
  }

  render() {
    const cssLevel1 = classNames({
      //selectedA: this.state.level1Selection && !this.state.currentSelectionLeaf
    });
    const cssLevel2 = classNames({
      current: this.state.items2.length !== 1,
      selectedA: this.state.level2Selection,
      levelStartA: this.state.level1Selection,
      levelEndA: this.state.level2Selection
    });
    const cssLevel3 = classNames({
      current: this.state.items3.length !== 1,
      selectedA: this.state.level3Selection,
      levelStartA: this.state.level2Selection,
      levelEndA: this.state.level3Selection
    });
    const cssFavSelected = classNames({
      selectedA: this.state.currentFavorite
    });
    const setInit = () => {
      const arr = castEachAsNmbr(this.props.preferences);
      console.log("preferences arr length " + arr.length);
      arr.map(x => this.setObjProp("favorite", x, true));
      //let obj = R.find(R.propEq("id", arr[0]))(this.state.data);
      this.setCurrentSelection(arr[0]);
      this.setState({
        favorites: arr,
        bInitCalled: true
      });
    };
    return (
      <div style={{ padding: "0px" }}>
        {this.renderTitleBarFavs()}
        {this.props.preferences && !this.state.bInitCalled && setInit()}
        {this.state.showFavorites && this.renderFavs(this.state.data)}
        {this.renderMainNavHeader()}
        <div className={cssLevel1}>
          {this.state.items1.map((item1, index) => (
            <Item
              key={item1.id}
              styl={this.fStyle(item1.show, item1.id)}
              item={item1}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item1.id ? true : false
              }
              currentParent={
                this.state.level1Selection == item1.id ? true : false
              }
              leaf={item1.leaf}
            />
          ))}
        </div>
        <div className={cssLevel2}>
          {this.state.items2.map((item2, index) => (
            <Item
              key={item2.id}
              styl={this.fStyle2(item2.show, item2.id)}
              item={item2}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item2.id ? true : false
              }
              currentParent={
                this.state.level2Selection == item2.id ? true : false
              }
              leaf={item2.leaf}
            />
          ))}
        </div>
        <div className={cssLevel3}>
          {this.state.items3.map((item3, index) => (
            <Item
              key={item3.id}
              styl={this.fStyle(item3.show)}
              item={item3}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item3.id ? true : false
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
