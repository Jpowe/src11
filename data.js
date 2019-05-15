import React from "react";
import Assessment from "material-ui/svg-icons/action/assessment";
import GridOn from "material-ui/svg-icons/image/grid-on";
import PermIdentity from "material-ui/svg-icons/action/perm-identity";
import Web from "material-ui/svg-icons/av/web";

import ExpandLess from "material-ui/svg-icons/navigation/expand-less";
import ExpandMore from "material-ui/svg-icons/navigation/expand-more";
import ChevronRight from "material-ui/svg-icons/navigation/chevron-right";
//import myTheme from './myTheme.js'

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    { text: "DECISIONS", icon: <Web />, link: "/" },
    { text: "Form Page", icon: <Web />, link: "/form" },
    { text: "Table Page?", icon: <GridOn />, link: "/table" },
    { text: "Login Page", icon: <PermIdentity />, link: "/login" },
    { text: "In and out app", icon: <PermIdentity />, link: "/InAndOut" },
    { text: "<not used>", icon: <PermIdentity />, link: "/InOutdatatable" },
    { text: "data table", icon: <PermIdentity />, link: "/datatables" }
  ],
  tablePage: {
    items: [
      { id: 1, name: "Product 1", price: "$50.00", category: "Category 1" },
      { id: 2, name: "Product 2", price: "$150.00", category: "Category 2" },
      { id: 3, name: "Product 3", price: "$250.00", category: "Category 3" },
      { id: 4, name: "Product 4", price: "$70.00", category: "Category 4" },
      { id: 5, name: "Product 5", price: "$450.00", category: "Category 5" },
      { id: 6, name: "Product 6", price: "$950.00", category: "Category 6" },
      { id: 7, name: "Product 7", price: "$550.00", category: "Category 7" },
      { id: 8, name: "Product 8", price: "$750.00", category: "Category 8" }
    ]
  },
  dashBoardPage: {
    recentProducts: [
      {
        id: 1,
        title: "Samsung TV",
        text: "Samsung 32 1080p 60Hz LED Smart HDTV."
      },
      { id: 2, title: "Playstation 4", text: "PlayStation 3 500 GB System" },
      {
        id: 3,
        title: "Apple iPhone 6",
        text: "Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G "
      },
      {
        id: 4,
        title: "Apple MacBook",
        text: "Apple MacBook Pro MD101LL/A 13.3-Inch Laptop"
      },
      {
        id: 5,
        title: "Samsung TV5",
        text: "Samsung 32 1080p 60Hz LED Smart HDTV."
      },
      { id: 6, title: "Playstation 4 6", text: "PlayStation 3 500 GB System" },
      {
        id: 7,
        title: "Apple iPhone 6 7",
        text: "Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G "
      },
      {
        id: 8,
        title: "Apple MacBook 8",
        text: "Apple MacBook Pro MD101LL/A 13.3-Inch Laptop"
      }
    ],
    monthlySales: [
      { name: "Jan", uv: 3700 },
      { name: "Feb", uv: 3000 },
      { name: "Mar", uv: 2000 },
      { name: "Apr", uv: 2780 },
      { name: "May", uv: 2000 },
      { name: "Jun", uv: 1800 },
      { name: "Jul", uv: 2600 },
      { name: "Aug", uv: 2900 },
      { name: "Sep", uv: 3500 },
      { name: "Oct", uv: 3000 },
      { name: "Nov", uv: 2400 },
      { name: "Dec", uv: 2780 }
    ],
    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],

    browserUsage: [
      { name: "Cash", value: 8, icon: <ExpandMore /> },
      { name: "Fixed Income", value: 20, icon: <ExpandMore /> },
      { name: "Hedge Funds", value: 4, icon: <ExpandMore /> },
      { name: "Private Equity", value: 8, icon: <ExpandMore /> },
      { name: "Alternatives", value: 4, icon: <ExpandMore /> },
      { name: "Investment real estate", value: 4, icon: <ExpandMore /> },
      { name: "Lario / Trailridge", value: 30, icon: <ExpandMore /> },
      { name: "Personal real estate", value: 22, icon: <ExpandMore /> }
    ]
  },
  genericTableData: [
    {
      name: "Frozen yogurt",
      calories: "155",
      fat: "6.0",
      carbs: "24",
      protein: "4.0",
      sodium: "87",
      calcium: "14%",
      iron: "1%"
    },
    {
      name: "Ice cream sandwich",
      calories: "159",
      fat: "6.0",
      carbs: "24",
      protein: "4.0",
      sodium: "87",
      calcium: "14%",
      iron: "1%"
    },
    {
      name: "baby ruth",
      calories: "158",
      fat: "6.0",
      carbs: "24",
      protein: "4.0",
      sodium: "87",
      calcium: "14%",
      iron: "1%"
    }
  ]
};

export default data;
