/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "./collab-banner.module.scss";
import Image from "next/image";

export interface CollabBannerProps {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  sponsorLogoSrc: string;
  footer: string;
}

const CollabBanner: React.FC<CollabBannerProps> = ({
  title,
  subtitle,
  date,
  location,
  sponsorLogoSrc,
  footer,
}: CollabBannerProps) => {
  return (
    <div className={`${Styles["collab-banner"]}`}>
      <div className={Styles["header"]}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className={Styles["details"]}>
        <div className={Styles["block"]}>
          <span className={Styles["icon"]}>
            <Image
              src={"/calendar.svg"}
              width={20}
              height={20}
              alt="JSLovers Logo"
            />
          </span>
          <span className={Styles["value"]}>{date}</span>
        </div>
        <div className={Styles["block"]}>
          <span className={Styles["icon"]}>
            <Image
              src={"/location.svg"}
              width={20}
              height={20}
              alt="JSLovers Logo"
            />
          </span>
          <span className={Styles["value"]}>{location}</span>
        </div>
      </div>
      <div className={Styles["content"]}>
        <div className={Styles["logo-1"]}>
          <Image
            src={sponsorLogoSrc}
            width={130}
            height={130}
            alt="JSLovers Logo"
          />
        </div>
        <div className={Styles["logo-2"]}>
          <Image
            src={"/jslovers-logo.svg"}
            width={130}
            height={130}
            alt="JSLovers Logo"
          />
        </div>
      </div>
      <div className={Styles["footer"]}>{footer}</div>
    </div>
  );
};

export default CollabBanner;
