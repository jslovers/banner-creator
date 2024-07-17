import React from "react";
import Styles from "./nav.module.scss";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <span className={`${Styles["nav"]}`}>
      <Link
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        href="/speaker"
      >
        Speaker Banner
      </Link>
      <Link
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        href="/collab"
      >
        Collab Banner
      </Link>
    </span>
  );
};

export default Nav;
