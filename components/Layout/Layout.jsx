import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import "../../assets/css/main.css";

const Header = props => {
  return (
    <div>
      <Head>
        <title>Welcome to totask !</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        <div>{props.children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Header;
