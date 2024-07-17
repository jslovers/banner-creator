"use client";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./speaker-editor.module.scss";
import SpeakerBannerForm from "../speaker-banner-form/speaker-banner-form.component";
import SpeakerBanner, {
  Speaker,
  SpeakerBannerProps,
} from "../speaker-banner/speaker-banner.component";
import Nav from "@/components/nav/nav.component";

const SpeakerEditor: React.FC = () => {
  const [values, setValues] = useState<SpeakerBannerProps>({
    title: "WORKSHOP",
    subtitle: "This is a subtitle",
    date: "29th June",
    location: "Location, City Or Online",
    sponsor: "Company Name",
    eventLink: "https://jslovers.com",
    qrcodePosition: "bottomRight",
    isCollab: false,
    collabLogoSrc: "/path-to-your-image.jpg",
    speakers: [
      {
        speakerName: "John Doe",
        speakerTitle: "Senior Developer",
        topic: "Topic Name",
        company: "Company Name",
        speakerImageSrc: "/path-to-your-image.jpg",
      },
    ],
  });

  const handleFormChange = (newValues: SpeakerBannerProps) => {
    setValues(newValues);
  };

  const handleImageChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const updatedSpeakers = values.speakers.map((speaker, i) =>
          i === index
            ? { ...speaker, speakerImageSrc: reader.result as string }
            : speaker
        );
        setValues({ ...values, speakers: updatedSpeakers });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCollabImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setValues({ ...values, collabLogoSrc: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    const element = document.getElementById("banner");
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        allowTaint: true,
        height: element.clientHeight,
        width: element.clientWidth,
      });
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "banner.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner} id="banner">
        <SpeakerBanner {...values} />
      </div>
      <div className={styles.form}>
        <Nav />
        <SpeakerBannerForm
          values={values}
          onChange={handleFormChange}
          onImageChange={handleImageChange}
          onCollabImageChange={handleCollabImageChange}
        />
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

export default SpeakerEditor;
