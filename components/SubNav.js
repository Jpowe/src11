import React, { Component } from "react";
import "./App.css";
import { CSSTransitionGroup } from "react-transition-group";
import {Link} from 'react-router';

const SubNav = ({ items, onClick }) => {
  const styles={
    itm: {
      margin: 1,
      paddingLeft: 10,
      color:'white',
    }
  }
  const cb = (item) => {

     onClick(item.id, item.level,item.endpoint)
  }
  const showItems = items.map((item, i) => (
    <div style={styles.itm}
      className="item"
      key={item.id}
      onClick={() => cb(item)}

    >
      {item.name}
    </div>
  ));

  return (
    <div>
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}
      >
      {showItems}
      </CSSTransitionGroup>
    </div>
  );
};

export default SubNav;
