import React, { Component } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

export default class SuspenseProgress extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    return <></>;
  }
}
