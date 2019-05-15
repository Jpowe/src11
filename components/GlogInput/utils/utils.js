import * as R from "ramda";

export const isNumber = str => {
  const pattern = /^\d+$/;
  return pattern.test(str); // returns a boolean
};

export const numberAddCommas = x => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
};
export const prependDollarSign = n => {
  return R.test(/^[$]/, n) ? n : `$${n}`;
};

export const numberDeleteCommas = x => {
  return x.split(",").join("");
};
export const deleteDollarSign = x => {
  if (x.indexOf("$") === -1) {
    return x;
  }
  return R.replace("$", "", x);
};

export const filterAndProps = (filterVal, propsVals, arr) => {
  const a = R.filter(x => x.name == filterVal, arr);
  const b = R.props([propsVals], a[0]);
  return b;
};
export const findAndProp = (filterVal, propsVals, arr) => {
  const a = R.find(x => x.id == filterVal, arr);
  const b = R.prop(propsVals, a);
  return b;
};

export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//export const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/;
export const dateFormat = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/;

export const capitalizeFirstLtr = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatPhone = input => {
  try {
    let str = input.replace(/[^\d]/g, "");
    const getAreaCode = str => {
      return `${str.substr(0, 3)}`;
    };
    const getPrefix = str => {
      console.log("getPRex " + str.length);
      if (str.length < 3) {
        return "";
      }
      return `.${str.substr(3, 3)}`;
    };
    const getSuffix = str => {
      if (str.length < 6) {
        return "";
      }
      return `.${str.substr(6)}`;
    };
    return getAreaCode(str) + getPrefix(str) + getSuffix(str);
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
export const formatDate = input => {
  let str = input.replace(/[^\d]/g, "");
  const getFirstPart = str => {
    return `${str.substr(0, 2)}`;
  };
  const getSecondPart = str => {
    if (str.length < 2) {
      return "";
    }
    return `/${str.substr(2, 2)}`;
  };
  const getThirdPart = str => {
    if (str.length < 4) {
      return "";
    }
    return `/${str.substr(4)}`;
  };
  return getFirstPart(str) + getSecondPart(str) + getThirdPart(str);
};

export const formatCurrency = input => {
  console.log("formatCurrency input== " + input);
  console.log(typeof input);
  let str;
  if (typeof input == "number") {
    str = input;
  } else {
    str = input.replace(/[^\d]/g, "");
  }

  return prependDollarSign(numberAddCommas(str));
};
export const removeFormatting = str => {
  console.log("removeFormatting str: " + str);
  if (typeof str == "number") {
    return str;
  } else {
    return str.replace(/[^\d]/g, "");
  }
};
