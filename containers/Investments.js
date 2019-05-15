import React from "react";
import R from "ramda";
import SecondaryNav from "../components/SecondaryNav";
//import pic1 from "../images/demo/cash-flow.png";
import pic2 from "../images/demo/liquidated-positions.png";
import pic3 from "../images/demo/cash-flow-monthly.png";
import pic4 from "../images/demo/exec-summary.png";
//import pic5 from "../images/demo/hedge-fund-liquidity.png";
import pic6 from "../images/demo/weekly-macro-summary.png";
import ImageWithTitle from "../components/ImageWithTitle";
import Dialog from "material-ui/Dialog";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import ZoomOut from "material-ui/svg-icons/action/zoom-out";
import HighlightOff from "material-ui/svg-icons/action/highlight-off";
import { white } from "material-ui/styles/colors";
import { withRouter } from "react-router-dom";
class Investments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalSubNav: false,
      shownFile: "",
      zoomAmount: 0.6,
      subNavWidget: null,
      nShow: 2,
      width: window.innerWidth
    };
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

  render() {
    const style = { width: this.state.width < 500 ? `355px` : `400px` };
    const handle = (file, title) => {
      console.log("Demo handleImageWithTitle " + file);
      this.setState({
        modalOpen: !this.state.modalOpen,
        shownFile: file,
        showFileTitle: title
      });
    };
    const handleSecondaryNav = n => {
      console.log("Investments handleSecondary");
      this.setState({
        modalSubNav: !this.state.modalSubNav,
        subNavWidget: n
      });
    };
    const getImage = f => {
      return (
        <img
          src={f}
          style={{
            opacity: 0.7,
            paddingBottom: "50px"
          }}
        />
      );
    };
    const filterReportView = () => {
      const path = this.props.location.pathname;
      const picture4 = [
        { page: "/investments/portfolio" },
        { page: "/investments/michael" }
      ];
      const picture2 = [
        { page: "/investments/portfolio" },
        { page: "/investments/michael" }
      ];
      const picture3 = [{ page: "/investments/portfolio" }];
      const picture6 = [
        { page: "/investments/tara" },
        { page: "/investments/kaily" }
      ];

      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingLeft: "0px"
          }}
        >
          {!!R.find(x => x.page == path, picture4) && (
            <ImageWithTitle
              image={pic4}
              title="Executive summary"
              style={style}
              handle={handle}
            />
          )}
          {!!R.find(x => x.page == path, picture2) && (
            <ImageWithTitle
              image={pic2}
              title="Liquidated positions"
              style={style}
              handle={handle}
            />
          )}
          {!!R.find(x => x.page == path, picture3) && (
            <ImageWithTitle
              image={pic3}
              title="Cash flow monthly"
              style={style}
              handle={handle}
            />
          )}
          {!!R.find(x => x.page == path, picture6) && (
            <ImageWithTitle
              image={pic6}
              title="Weekly macro summary"
              style={style}
              handle={handle}
            />
          )}
        </div>
      );
    };
    return (
      <div style={{ width: "100%" }}>
        <SecondaryNav handleSecondaryNav={handleSecondaryNav} />
        {filterReportView()}
        <Dialog
          modal={false}
          open={this.state.modalOpen}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
          onRequestClose={() => this.setState({ modalOpen: false })}
          contentStyle={{
            position: "relative",
            width: "80vw",
            transform: ""
          }}
          repositionOnUpdate={false}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 0
          }}
          bodyStyle={{ paddingBottom: 0 }}
        >
          <div>
            <div
              style={{
                position: "absolute",
                top: "10px",
                backgroundColor: "rgba(32, 45, 21, 0.6)",
                color: "#990000",
                padding: "10px",
                borderRadius: "4px"
              }}
            >
              <span
                onClick={() =>
                  this.setState({ zoomAmount: this.state.zoomAmount + 0.2 })
                }
              >
                <ZoomIn color={white} style={{ width: "48px" }} />
              </span>
              <span
                onClick={() =>
                  this.setState({ zoomAmount: this.state.zoomAmount - 0.2 })
                }
              >
                <ZoomOut color={white} style={{ width: "48px" }} />
              </span>
              <span
                onClick={() =>
                  this.setState({ modalOpen: !this.state.modalOpen })
                }
              >
                <HighlightOff color={white} style={{ width: "48px" }} />
              </span>
            </div>
            <img
              src={this.state.shownFile}
              alt="alt shown file"
              style={{ zoom: this.state.zoomAmount }}
              onClick={() =>
                this.setState({ zoomAmount: this.state.zoomAmount + 0.2 })
              }
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(Investments);
