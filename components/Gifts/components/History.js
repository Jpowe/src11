import React, { Component } from "react";
import * as R from "ramda";
import HistoryPart from "./HistoryPart";
import { typography } from "material-ui/styles";
import {
  fieldsGift,
  fieldsGiftOrder,
  fieldsGiftDelivery
} from "../common/data";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(JSON.stringify(this.props.headers));
  }

  test2 = () => {
    console.log("test2  ");

    console.log(JSON.stringify(R.map(x => x.title, fieldsGift)));

    //R.pick(["value", "description", "giftNotes"], data);
    console.log(JSON.stringify(R.map(x => x.title, fieldsGift)));
    return R.map(x => x.title, fieldsGift);
  };

  render() {
    const { data } = this.props;
    return (
      <div
        style={{
          height: "450px",
          padding: "4px"
          //alignItems: "flex-end"
          //  border: "4px solid #6076A9"
          //  backgroundColor: "#f4dfb7"
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: typography.fontWeightBold,
            marginTop: "30px",
            textDecoration: "underline"
          }}
        >
          HISTORY:
        </div>
        <HistoryPart
          title="GIFTS"
          data={data}
          headers={this.test2(fieldsGift)}
        />
        <HistoryPart
          title="ORDERS"
          data={[
            { year: "2018", column2: "c2", column3: "c3", column4: "c4" },
            { year: "2017", column2: "c2", column3: "c3", column4: "c4" }
          ]}
          headers={this.test2(fieldsGiftOrder)}
        />
        <HistoryPart
          title="DELIVERIES"
          data={[
            { year: "2018", column2: "c2", column3: "c3", column4: "c4" },
            { year: "2017", column2: "c2", column3: "c3", column4: "c4" }
          ]}
          headers={this.test2(fieldsGiftDelivery)}
        />
      </div>
    );
  }
}

export default History;
