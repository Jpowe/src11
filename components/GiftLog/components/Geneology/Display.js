import React, { Component } from "react";
import { SteppedLineTo } from "react-lineto";
import LineTo from "react-lineto";
import * as R from "ramda";
import Block from "./Block";
import Butts from "./Butts";
import { style, style2, stylePartner, styleParent } from "./DisplayStyle";
import { generations } from "./data/data";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: this.props.anchor,
      selectedPerson: this.props.selectedPerson,
      data: this.props.data,
      gen0_top: 250,
      gen0_left: 90,
      gen1_top: 350,
      gen1_left: 90
    };
    console.table(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps  " + JSON.stringify(nextProps));
    this.setState({ data: nextProps.data });
    console.table(nextProps.data);
  }

  showBlock(obj, top, left, className, color = "#f30", personPartyType) {
    return (
      <Block
        className={className}
        top={top}
        left={left}
        color={color}
        data={obj.name}
        uuid={obj.uuid}
        onclick={this.props.setCurrentSelection}
        key={obj.uuid}
        highlight={this.props.selectedPerson == obj.uuid}
        attach={uuid => this.props.attach(uuid)}
        expand={uuid => this.props.expand(uuid)}
        personPartyType={personPartyType}
      />
    );
  }
  displayNodes = obj => {
    console.table(obj);
    const addGenderColor = obj => {
      const color = obj => {
        return obj.gender == "Male"
          ? "#89cff0"
          : obj.gender == "Female"
            ? "pink"
            : "#999";
      };
      return color(obj);
    };
    let top = obj.top;
    let left = obj.left;
    return this.showBlock(
      obj,
      `${top}px`,
      `${left}px`,
      obj.uuid,
      addGenderColor(obj),
      !obj.partyType
    );
  };
  displayGeneration = (data, gen) => {
    console.table(data);
    let nodes = R.filter(x => x.generation == gen, data);
    return R.map(this.displayNodes, nodes);
  };
  lineChild = (obj, x) => {
    console.table(obj);
    console.log(x);
    return (
      <div>
        <LineTo
          delay={100}
          zIndex={Math.floor(Math.random() * 10000)}
          from={String(x)}
          to={obj.uuid}
          fromAnchor="bottom"
          toAnchor="top"
          {...style}
        />
      </div>
    );
  };
  childrenLines = data => {
    try {
      const drawChildrenForRow = row => {
        console.log("drawChildrenForRow f");
        const childs = row.children;
        console.table(childs);
        const childRows = R.filter(x => R.contains(x.uuid, childs), data);
        console.table(childRows);
        return R.map(x => this.lineChild(x, row.uuid), childRows);
      };
      console.table(data);
      return R.map(drawChildrenForRow, data);
    } catch (e) {
      console.log(e.message);
    }
  };

  linePartner = (obj, anchorID) => {
    const anchor = R.find(x => x.uuid === anchorID, this.state.data);
    const from = obj.left > anchor.left ? anchorID : obj.uuid;
    const to = obj.left > anchor.left ? obj.uuid : anchorID;
    return (
      <LineTo
        delay={100}
        zIndex={Math.floor(Math.random() * 1000)}
        from={from}
        to={to}
        fromAnchor="right"
        toAnchor="left"
        orientation="h"
        key={obj.uuid}
        {...stylePartner}
      />
    );
  };
  partnersLines = data => {
    try {
      const drawPartnersForRow = row => {
        const partners = row.partners;
        const partnerRows = R.filter(x => R.contains(x.uuid, partners), data);
        return R.map(x => this.linePartner(x, row.uuid), partnerRows);
      };
      return R.map(drawPartnersForRow, data);
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <div>
        <div>
          <Butts clear={this.props.clear} />
          {R.map(x => this.displayGeneration(this.props.data, x), generations)}
          {this.childrenLines(this.state.data)}
          {this.partnersLines(this.state.data)}
        </div>
      </div>
    );
  }
}

export default Display;
