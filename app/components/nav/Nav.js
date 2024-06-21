import React, { Component } from "react";
import "./nav.css";
import logo from "../../bg.png";
import Image from "next/image";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__blocks">
          <Image src={logo}></Image>
        </div>
        <div className="nav__blocks"></div>
        <div className="nav__blocks"></div>
      </div>
    );
  }
}
