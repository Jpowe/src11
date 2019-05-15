import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import "./Table.css";
import Divider from "material-ui/Divider";

class Paginated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    this.setState({});
  }
  render() {
    const styles = {};
    return (
      <div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "24px",
            color: this.props.muiTheme.palette.accent3Color
          }}
        >
          <div className="paginated-group">
            <div className="paginated">Rows per page:</div>
            <div className="paginated">{this.props.nRows}</div>
          </div>

          <div className="paginated-group">
            <div className="paginated">
              {this.props.currentPage}-{Math.ceil(
                this.props.totalRows / this.props.nRows
              )}{" "}
              of {this.props.totalRows}
            </div>
          </div>

          <div className="paginated-group">
            <div className="paginated">
              {this.props.currentPage > 1 ? (
                <span
                  className="pointer arrows"
                  onClick={() => this.props.onPaginated(-1)}
                >
                  &lt;
                </span>
              ) : (
                <span className="arrows" style={{ color: "#ccc" }}>
                  &lt;
                </span>
              )}
            </div>
            <div className="paginated">
              {this.props.currentPage <
              this.props.totalRows / this.props.nRows ? (
                <span
                  className="pointer arrows"
                  onClick={() => this.props.onPaginated(1)}
                >
                  &gt;
                </span>
              ) : (
                <span className="arrows" style={{ color: "#ccc" }}>
                  &gt;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default muiThemeable()(Paginated);
