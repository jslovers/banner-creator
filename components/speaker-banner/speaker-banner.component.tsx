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
}

const SpeakerBanner: React.FC<SpeakerBannerProps> = ({
  title,
  subtitle,
  date,
  location,
  sponsor,
  eventLink,
  speakers,
}: SpeakerBannerProps) => {

    console.log(Styles);

  return (
    <div
      className={`${Styles["speaker-banner"]} ${
        speakers.length > 1 ? Styles["multi-speaker"] : ""
      }`}
    >
      <div className={Styles["header"]}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className={Styles["content"]}>
        {speakers.map((speaker, index) => (
          <div key={index} className={Styles["speaker"]}>
            <img src={speaker.speakerImageSrc} alt={speaker.speakerName} />
            <div className={Styles["details"]}>
              <h3>{speaker.speakerName}</h3>
              <p>{speaker.speakerTitle}</p>
              <p>{speaker.topic}</p>
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
        <div className={Styles["sponsor"]}>
          <p>Sponsor: {sponsor}</p>
        </div>
      </div>
      <div className={Styles["logo"]}>
        <Image
          src={"/jslovers-logo.png"}
          width={100}
          height={100}
          alt="JSLovers Logo"
        />
      </div>
      <div className={Styles["qr-code"]}>
        <QRCode value={eventLink} />
      </div>
    </div>
  );
};

export default SpeakerBanner;
