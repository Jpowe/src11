import React, { Component } from "react";

import * as R from "ramda";
import Display from "./Display";
import { generations } from "./data/data.js";

const addCoords = (data, screenWidth) => {
  console.table(data);
  const removeSecondPartnerRef = data => {
    try {
      const f = row => {
        const f2 = uuid => {
          let a = R.find(x => x.uuid == uuid, data);
          a.partners = [];
          return a;
        };
        return R.map(f2, row.partners);
      };
      return R.map(f, data);
    } catch (e) {
      console.log(e.message);
      return data;
    }
  };
  const addCoordsGen = (data, gen) => {
    let top = 90 + gen * 100;
    let left = (screenWidth - 1200) / 2 + 300;
    const rows = R.filter(x => x.generation == gen, data);
    const process = obj => {
      let newObj = { ...obj, top: top, left: left };
      left += 300;
      return newObj;
    };
    return R.map(process, rows);
  };
  let updatedData = R.flatten(R.map(x => addCoordsGen(data, x), generations));
  console.table(updatedData);
  updatedData = R.uniq(
    R.flatten([updatedData, removeSecondPartnerRef(updatedData)])
  );
  console.table(updatedData);
  return updatedData;
};

class Geneology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
      //selectedPerson: "c6f6dc814fe2",
      data: this.props.data,
      screenWidth: window.innerWidth
    };
    console.log(window.innerWidth);
  }
  componentWillReceiveProps(nextProps) {
    console.table(nextProps);
    this.setState({
      data: nextProps.data,
      selectedPerson: nextProps.selectedPerson
    });
  }

  clear = () => {
    console.log("clear f");
    this.setState(prevState => ({
      data: []
    }));
  };
  allowParentChildRelationship = (obj1, obj2) => {
    return Math.abs(obj1.generation - obj2.generation) === 1 ? true : false;
  };
  /*
  addParentChildRelationship = uuid => {
    console.log("App addParentChildRelationship " + uuid);
    try {
      let anchorRow = R.find(x => x.uuid === uuid, this.state.data);
      let targetRow = R.find(
        x => x.uuid === this.state.selectedPerson,
        this.state.data
      );   
      if (!this.allowParentChildRelationship(anchorRow, targetRow)) {
        throw "PARENT CHILD RELATIONSHIP NOT ALLOWED";
      }
      let row =
        targetRow.generation < anchorRow.generation ? targetRow : anchorRow;
      let otherRow = row == targetRow ? anchorRow : targetRow;
      row.children.push(otherRow.uuid);
      let updatedData = R.map(
        x => (x.uuid == row.uuid ? row : x),
        this.state.data
      );
      this.setState({
        data: updatedData
      });
    } catch (e) {
      console.log(e);
    }
  };
  */

  addParentChildRelationship = uuid => {
    console.log("Geneology addParentChildRelationship " + uuid);
    this.props.parentChildRelationship(uuid, this.state.selectedPerson, "add");
  };
  removeParentChildRelationship = uuid => {
    console.log("Geneology removeParentChildRelationship " + uuid);
    this.props.parentChildRelationship(
      uuid,
      this.state.selectedPerson,
      "remove"
    );
  };
  parentChildPath = uuid => {
    console.log("parentChildPath uuid " + uuid);
    console.log("this.state.selectedPerson " + this.state.selectedPerson);
    console.table(this.state.data);
    try {
      let anchorRow = R.find(x => x.uuid === uuid, this.state.data);
      console.table(anchorRow);
      let targetRow = R.find(
        x => x.uuid === this.state.selectedPerson,
        this.state.data
      );
      console.table(targetRow);
      const exists = uuid => {
        return (
          R.contains(this.state.selectedPerson, anchorRow.children) ||
          R.contains(uuid, targetRow.children)
        );
      };
      console.log("parentChildPath exists " + exists(uuid));
      exists(uuid)
        ? this.removeParentChildRelationship(uuid)
        : this.addParentChildRelationship(uuid);
    } catch (e) {
      console.log(e.message);
    }
  };

  addPartnerRelationship = uuid => {
    console.log("App addPartnersRelationship " + uuid);
    this.props.partnerRelationship("add", uuid, this.state.selectedPerson);
  };
  removePartnerRelationship = uuid => {
    console.log("App removePartnersRelationship " + uuid);
    this.props.partnerRelationship("remove", uuid, this.state.selectedPerson);
  };
  /*
  removePartnerRelationship = uuid => {
    console.log("App removePartnersRelationship " + uuid);
    let updatedData;
    let anchorRow = R.find(x => x.uuid === uuid, this.state.data);
    let targetRow = R.find(
      x => x.uuid === this.state.selectedPerson,
      this.state.data
    );
    console.table(targetRow);
    console.table(anchorRow);
    targetRow.partners = R.without([uuid], targetRow.partners);
    anchorRow.partners = R.without(
      [this.state.selectedPerson],
      targetRow.partners
    );
    console.table(targetRow);
    console.table(anchorRow);
    updatedData = R.map(
      x => (x.uuid == targetRow.uuid ? targetRow : x),
      this.state.data
    );
    updatedData = R.map(
      x => (x.uuid == anchorRow.uuid ? anchorRow : x),
      this.state.data
    );
    this.setState({
      data: updatedData
    });
  };
  */
  partnerPath = uuid => {
    let anchorRow = R.find(x => x.uuid === uuid, this.state.data);
    let targetRow = R.find(
      x => x.uuid === this.state.selectedPerson,
      this.state.data
    );
    const exists = uuid => {
      return (
        R.contains(this.state.selectedPerson, anchorRow.partners) ||
        R.contains(uuid, targetRow.partners)
      );
    };
    console.log("partnersPath exists " + exists(uuid));
    exists(uuid)
      ? this.removePartnerRelationship(uuid)
      : this.addPartnerRelationship(uuid);
  };
  generationMatch = uuid => {
    const rowSelectedPerson = R.find(
      x => x.uuid === this.state.selectedPerson,
      this.state.data
    );
    const otherRow = R.find(x => x.uuid === uuid, this.state.data);
    return rowSelectedPerson.generation === otherRow.generation;
  };
  updateRelationship = uuid => {
    this.generationMatch(uuid)
      ? this.partnerPath(uuid)
      : this.parentChildPath(uuid);
  };
  /*
  expandSelection = uuid => {
    this.addParent(uuid);
    this.addChild(uuid);
    this.addPartner(uuid);
  };
  */
  setCurrentSelection = uuid => {
    console.log("App setCurrentSelection uuid: " + uuid);
    /*
    this.setState(prevState => ({
      selectedPerson: uuid
    }));
    */
    this.props.setCurrentSelection(uuid);
  };

  render() {
    return (
      <div>
        <div>
          <Display
            data={addCoords(this.state.data, this.state.screenWidth)}
            setCurrentSelection={this.setCurrentSelection}
            selectedPerson={this.state.selectedPerson}
            clear={this.clear}
            attach={uuid => this.updateRelationship(uuid)}
            expand={uuid => this.props.expandSelection(uuid)}
          />
        </div>
      </div>
    );
  }
}

export default Geneology;
