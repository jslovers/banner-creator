import React from "react";
import { SpeakerBannerProps } from "../speaker-banner/speaker-banner.component";

interface SpeakerBannerFormProps {
  values: SpeakerBannerProps;
  onChange: (values: SpeakerBannerProps) => void;
  onImageChange: (index: number, file: File) => void;
  onCollabImageChange: (file: File) => void;
}

const SpeakerBannerForm: React.FC<SpeakerBannerFormProps> = ({
  values,
  onChange,
  onImageChange,
  onCollabImageChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
  };

  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    onChange({
      ...values,
      collabLogoSrc: "",
      [name]: values.isCollab ? false : true,
    });
  };

  const handleSpeakerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedSpeakers = values.speakers.map((speaker, i) =>
      i === index ? { ...speaker, [name]: value } : speaker
    );
    onChange({ ...values, speakers: updatedSpeakers });
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(index, e.target.files[0]);
    }
  };

  const handleCollabImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCollabImageChange(e.target.files[0]);
    }
  };

  const addSpeaker = () => {
    onChange({
      ...values,
      speakers: [
        ...values.speakers,
        {
          speakerName: "John Doe",
          speakerTitle: "Senior Developer",
          topic: "Topic Name",
          company: "Company Name",
          speakerImageSrc: "/path-to-your-image.jpg",
        },
      ],
    });
  };

  return (
    <form className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="subtitle" className="mb-1 font-semibold">
          Subtitle
        </label>
        <input
          id="subtitle"
          name="subtitle"
          value={values.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="date" className="mb-1 font-semibold">
          Date
        </label>
        <input
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          placeholder="Date"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="location" className="mb-1 font-semibold">
          Location
        </label>
        <input
          id="location"
          name="location"
          value={values.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sponsor" className="mb-1 font-semibold">
          Sponsor
        </label>
        <input
          id="sponsor"
          name="sponsor"
          value={values.sponsor}
          onChange={handleChange}
          placeholder="Sponsor"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="eventLink" className="mb-1 font-semibold">
          Event Link - QRCode
        </label>
        <input
          id="eventLink"
          name="eventLink"
          value={values.eventLink}
          onChange={handleChange}
          placeholder="Event Link"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <fieldset>
          <legend className="mb-1 font-semibold">QRCode Position</legend>
          <div>
            <input
              type="radio"
              id="bottomRight"
              name="qrcodePosition"
              value="bottomRight"
              className="mr-1"
              checked={values.qrcodePosition === "bottomRight"}
              onChange={handleChange}
            />
            <label htmlFor="bottomRight">Bottom Right</label>
          </div>
          <div>
            <input
              type="radio"
              id="topLeft"
              name="qrcodePosition"
              value="topLeft"
              className="mr-1"
              checked={values.qrcodePosition === "topLeft"}
              onChange={handleChange}
            />
            <label htmlFor="topLeft">Top Left</label>
          </div>
          <div>
            <input
              type="radio"
              id="hide"
              name="qrcodePosition"
              value="hide"
              className="mr-1"
              checked={values.qrcodePosition === "hide"}
              onChange={handleChange}
            />
            <label htmlFor="hide">Hide</label>
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col">
        <fieldset>
          <legend className="mb-1 font-semibold">
            Info About Collaboration
          </legend>
          <div>
            <input
              type="checkbox"
              id="isCollab"
              name="isCollab"
              checked={values.isCollab}
              onChange={handleBooleanChange}
              className="mr-1"
            />
            <label htmlFor="scales">Is this Collab Event</label>
          </div>
        </fieldset>
      </div>

      {values.isCollab && (
        <div className="flex flex-col">
          <label htmlFor="collabImage" className="mb-1 font-semibold">
            Collab Company Image
          </label>
          <input
            id="collabImageSrc"
            name="collabImageSrc"
            type="file"
            onChange={(e) => handleCollabImageChange(e)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      )}
      {values.speakers.map((speaker, index) => (
        <div key={index} className="space-y-4 bg-slate-500 p-4">
          <div className="flex flex-col">
            <label
              htmlFor={`speakerName-${index}`}
              className="mb-1 font-semibold"
            >
              Speaker Name
            </label>
            <input
              id={`speakerName-${index}`}
              name="speakerName"
              value={speaker.speakerName}
              onChange={(e) => handleSpeakerChange(index, e)}
              placeholder="Speaker Name"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor={`speakerTitle-${index}`}
              className="mb-1 font-semibold"
            >
              Speaker Title
            </label>
            <input
              id={`speakerTitle-${index}`}
              name="speakerTitle"
              value={speaker.speakerTitle}
              onChange={(e) => handleSpeakerChange(index, e)}
              placeholder="Speaker Title"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`topic-${index}`} className="mb-1 font-semibold">
              Topic
            </label>
            <input
              id={`topic-${index}`}
              name="topic"
              value={speaker.topic}
              onChange={(e) => handleSpeakerChange(index, e)}
              placeholder="Topic"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`company-${index}`} className="mb-1 font-semibold">
              Company
            </label>
            <input
              id={`company-${index}`}
              name="company"
              value={speaker.company}
              onChange={(e) => handleSpeakerChange(index, e)}
              placeholder="Company"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor={`speakerImageSrc-${index}`}
              className="mb-1 font-semibold"
            >
              Speaker Image
            </label>
            <input
              type="file"
              id={`speakerImageSrc-${index}`}
              name="speakerImageSrc"
              onChange={(e) => handleFileChange(index, e)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addSpeaker}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Speaker
      </button>
    </form>
  );
};

export default SpeakerBannerForm;
