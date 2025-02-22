/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "./speaker-banner.module.scss";
import Image from "next/image";
import QRCode from "qrcode.react";

export interface Speaker {
  speakerName: string;
  speakerTitle: string;
  topic: string;
  company: string;
  speakerImageSrc: string;
}

export interface SpeakerBannerProps {
  speakers: Speaker[];
  title: string;
  subtitle: string;
  date: string;
  location: string;
  sponsor: string;
  eventLink: string;
  isCollab?: boolean;
  collabLogoSrc?: string;
  qrcodePosition: "topLeft" | "bottomRight" | "hide";
}

const SpeakerBanner: React.FC<SpeakerBannerProps> = ({
  title,
  subtitle,
  date,
  location,
  sponsor,
  eventLink,
  speakers,
  isCollab,
  collabLogoSrc,
  qrcodePosition,
}: SpeakerBannerProps) => {
  console.log(Styles);

  return (
    <div
      className={`${Styles["speaker-banner"]} ${
        speakers.length > 2 ? Styles["multi-speaker"] : ""
      }`}
    >
      <div
        className={`${Styles["header"]} ${
          isCollab ? Styles["header-with-collab"] : ""
        }`}
      >
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className={Styles["content"]}>
        {speakers.map((speaker, index) => (
          <div key={index} className={Styles["speaker"]}>
            <img src={speaker.speakerImageSrc} alt={speaker.speakerName} />
            <div
              className={`${
                speakers.length > 2
                  ? Styles["details-multi"]
                  : Styles["details"]
              }`}
            >
              <h3>{speaker.speakerName}</h3>
              {speakers.length <= 2 && (
                <>
                  <p>{speaker.speakerTitle}</p>
                  <p>{speaker.topic}</p>
                </>
              )}
              <p>{speaker.company}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={Styles["footer"]}>
        <div className={Styles["info"]}>
          <p>
            <span className={Styles["icon"]}>📅</span> {date}
          </p>
          <p>
            <span className={Styles["icon"]}>📍</span> {location}
          </p>
        </div>
        {sponsor && (
          <div className={Styles["sponsor"]}>
            <p>Sponsor: {sponsor}</p>
          </div>
        )}
      </div>
      <div className={Styles["logo"]}>
        <Image
          src={"/jslovers-logo.png"}
          width={100}
          height={100}
          alt="JSLovers Logo"
        />
      </div>
      {isCollab && collabLogoSrc && (
        <div className={Styles["collab-logo"]}>
          <Image
            src={collabLogoSrc}
            width={100}
            height={100}
            alt="Collab Logo"
          />
        </div>
      )}
      <div
        className={`${
          qrcodePosition === "topLeft"
            ? Styles["qr-code-top"]
            : qrcodePosition === "hide"
            ? Styles["qr-code-hide"]
            : Styles["qr-code-bottom"]
        }`}
      >
        <QRCode value={eventLink} />
      </div>
    </div>
  );
};

export default SpeakerBanner;
