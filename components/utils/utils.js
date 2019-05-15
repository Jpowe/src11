import * as R from "ramda";

export const isNumber = str => {
  const pattern = /^\d+$/;
  return pattern.test(str); // returns a boolean
};

export const numberAddCommas = x => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
};
export const prependDollarSign = n => {
  if (n == null) {
    return;
  }
  return R.test(/^[$]/, n) ? n : `$${n}`;
};

export const numberDeleteCommas = x => {
  return x.split(",").join("");
};
export const deleteDollarSign = x => {
  return R.replace("$", "", x);
};

export const filterAndProps = (filterVal, propsVals, arr) => {
  const a = R.filter(x => x.name == filterVal, arr);
  const b = R.props([propsVals], a[0]);
  return b;
};
