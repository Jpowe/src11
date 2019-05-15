import React, { Component } from "react";
import R from "ramda";
import classNames from "classnames";
import "./App.css";
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

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      bInitCalled: false
    };
    this.onclick = this.onclick.bind(this);
    this.addToFavs = this.addToFavs.bind(this);
    this.removeFromFavs = this.removeFromFavs.bind(this);
    this.saveFavs = this.saveFavs.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
    this.renderFavs = this.renderFavs.bind(this);
    this.renderTitleBarFavs = this.renderTitleBarFavs.bind(this);
    this.renderRemove = this.renderRemove.bind(this);
    this.home = this.home.bind(this);
    this.setObjProp = this.setObjProp.bind(this);
    this.setCurrentSelection = this.setCurrentSelection.bind(this);
  }
  componentWillMount() {
    console.log("componentWillMount");
    let allData = [
      ...this.state.data1,
      ...this.state.data2,
      ...this.state.data3
    ];
    console.table(allData);
    console.table(this.props.authorizations);
    this.setState({
      data: [...this.state.data1, ...this.state.data2, ...this.state.data3],
      items1: this.getArrayofAuthApps(allData, this.props.authorizations)
    });
  }
  /**
   * CRUDS
   */
  getObj(id) {
    return R.find(R.propEq("id", id))(this.state.data);
  }
  setObjProp(prop, item, value) {
    console.log("setObjProp: " + [prop, item, value]);
    let a = R.find(x => x.id == item, this.state.data);
    a[prop] = value;
  }
  getArrayofAuthApps(data, filterObj) {
    console.log("getArrayofAuthApps f");
    const f = (name, data) => R.filter(x => x.name == name, data);
    const f2 = R.map(x => f(x.name, data), filterObj);
    console.log(R.flatten(f2));
    return R.flatten(f2);
  }
  /* set non-selectedA items of a level to 'show = false'*/
  updateSiblings(id, level) {
    return R.map(
      x => (x.id !== id ? R.merge(x, { show: false }) : x),
      this.state["items" + level]
    );
  }

  onclick(item) {
    console.log("onclick f item: " + JSON.stringify(item));
    /** TO  DO  IF LEVEL1 SELECATION IS SAME GO HOME ****/
    this.props.closeSelf(item.leaf);
    const { id, level } = item;
    if (id === this.state.level1Selection) {
      console.log("SAME.   SELECTED SAME as level1selection");
      this.home();
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
      let b = this.updateSiblings(id, level);
      this.setState({ ["items" + level]: b });
      let arrChildren = R.filter(x => x.level == level + 1, this.state.data);
      let ep = R.props(["endpoint"], arrChildren[0]);
      this.props.history.push(`${ep}`);
    } else {
      this.setCurrentSelection(id);
    }

    if (level < this.state.levels) {
      this.showChildrenLevel(id, level);
    }
  }

  addToFavs() {
    console.log("addToFavs");
    if (!this.state.currentSelectionLeaf) {
      return;
    }
    let obj = this.getObj(this.state.currentSelection);
    if (obj.leaf) {
      this.setObjProp("favorite", this.state.currentSelection, true);
    }
    this.saveFavs();
  }
  removeFromFavs(removeItem = this.state.currentFavorite) {
    console.log("removeFromFavs f " + removeItem);
    this.setObjProp("favorite", removeItem, false);
    this.saveFavs();
  }

  saveFavs() {
    const isFav = x => x == true;
    let b = R.filter(x => isFav(x.favorite), this.state.data);
    let favs = R.map(x => x.id, b);
    this.props.setFavs(favs);
  }

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
      addCSS = "todoitemA selectedA";
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
  fStyle2(show) {
    return show ? "todoitemB" : "hide1A hide2A";
  }

  favoriteItem(n) {
    console.log("favoriteItem f : " + n);
    if (!n) {
      return;
    }
    this.props.closeSelf(true);
    this.setState({ currentFavorite: n });
    this.setCurrentSelection(n);
  }
  setCurrentSelection(n) {
    this.setState({ currentSelection: n });
    let obj = this.getObj(n);
    this.props.history.push(`${obj.endpoint}`);
  }
  renderFavs() {
    const o = R.filter(x => x.favorite === true, this.state.data);
    console.log("renderFavs f filtered-- " + JSON.stringify(o));
    return o.map(x => (
      <div
        style={{
          textAlign: "left",
          color: "white",
          width: "191",
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
  }

  renderRemove() {
    return (
      <span
        onClick={() => this.addToFavs()}
        style={{ margin: 10, cursor: "pointer" }}
      >
        <Remove style={{ color: "#ffff00" }} />
      </span>
    );
  }

  home() {
    console.log("home f");
    /**
     * AUTH APP FILTER ON ROOT LEVEL (DATA1) ONLY FOR NOW
     **/
    this.setState({
      items1: this.getArrayofAuthApps(data1, this.props.authorizations),
      items2: data2,
      items3: data3,
      level1Selection: null,
      level2Selection: null,
      level3Selection: null,
      currentSelection: null
    });
  }
  handleToggleFavorites() {
    console.log("handleToggleFavorites f");
    this.setState({ showFavorites: !this.state.showFavorites });
  }
  renderTitleBarFavs() {
    return (
      <div
        style={{
          textAlign: "left",
          width: 200,
          //  padding: 10,
          marginTop: 20,
          marginLeft: 1,
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
          <div style={{ backgroundColor: "#220000", marginLeft: 30 }}>
            <IconButton
              tooltip={
                <div>
                  <h3>
                    Add current<br />page to favorites.
                  </h3>
                </div>
              }
              tooltipPosition="top-left"
              iconStyle={{
                margin: 0,
                padding: 0,
                width: 28,
                height: 28,
                cursor: "pointer"
              }}
              style={{
                margin: 0,
                padding: 0,
                width: 0,
                height: 0
              }}
              onClick={() => this.addToFavs()}
            >
              <CircleAdd color="white" />
            </IconButton>
          </div>
          <div
            onClick={() => this.handleToggleFavorites()}
            style={{
              cursor: "pointer",
              //backgroundColor: "#002200",
              padding: 0
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
  }
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
          <div style={{ paddingRight: 28 }}>
            <IconButton
              tooltipPosition="bottom-left"
              iconStyle={{
                margin: 0,
                padding: 0,
                width: 24,
                height: 24,
                overflow: "visible"
              }}
              style={{
                margin: 0,
                padding: 0,
                width: 0,
                height: 0,
                overflow: "visible"
              }}
              onClick={this.home}
            >
              <Home
                className=""
                color="white"
                style={{ overflow: "visible" }}
              />
            </IconButton>
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
      console.log("setInit f");
      const arr = castEachAsNmbr(this.props.preferences);
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
        {this.props.preferences && !this.state.bInitCalled ? setInit() : null}
        {this.state.showFavorites ? this.renderFavs() : null}
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
              styl={this.fStyle2(item2.show)}
              item={item2}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item2.id ? true : false
              }
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
