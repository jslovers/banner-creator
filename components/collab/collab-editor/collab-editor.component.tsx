"use client";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./collab-editor.module.scss";
import CollabBanner, {
  CollabBannerProps,
} from "../collab-banner/collab-banner.component";
import Nav from "@/components/nav/nav.component";

const CollabEditor: React.FC = () => {
  const [values, setValues] = useState<CollabBannerProps>({
    title: "thegeekconf'24",
    subtitle: "thegeekconf.com",
    date: "29th June 2024",
    location: "Berlin, Germany",
    sponsorLogoSrc: "/jslovers-logo.svg",
    footer: "thegeekconf'24 x JSLovers Community Partnership 🔥",
  });

  const handleFormChange = (newValues: CollabBannerProps) => {
    setValues(newValues);
  };

  const handleImageChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setValues({ ...values, sponsorLogoSrc: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    const element = document.getElementById("banner");
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "collabBanner.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner} id="banner">
        <CollabBanner {...values} />
      </div>
      <div className={styles.form}>
        <Nav />
        {/* <SpeakerBannerForm
          values={values}
          onChange={handleFormChange}
          onImageChange={handleImageChange}
        /> */}
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download as PNG
        </button>
      </div>
    </div>
  );
};

export default CollabEditor;
