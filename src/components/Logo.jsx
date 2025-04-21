import React from "react";

function Logo({ width = "100px" }) {
  return (
    <img src="/assets/logo.png" alt="E-Gallery Logo" width={width} />
  );
}

export default Logo;
