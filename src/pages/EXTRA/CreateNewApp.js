import React, { useState } from "react";
import styles from "../assets/css/CreateNewApp.module.css";

const CreateNewApp = () => {
  const [formData, setFormData] = useState({
    appName: "",
    logo: null,
    icon: null,
    color: "",
    fontStyle: "",
    fontSize: "",
    splashScreen: null,
    orgType: "sandbox",
    orgUserName: "",
    orgPassword: "",
    orgClientID: "",
    orgSecret: "",
    approachType: "Heroku",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:3000/api/create-app", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create New App</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          App Name:
          <input
            type="text"
            name="appName"
            value={formData.appName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Logo:
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>
          Icon:
          <input
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>
          Color:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Font Style:
          <input
            type="text"
            name="fontStyle"
            value={formData.fontStyle}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Font Size:
          <input
            type="number"
            name="fontSize"
            value={formData.fontSize}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Splash Screen (GIF):
          <input
            type="file"
            name="splashScreen"
            accept="image/gif"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>
          Salesforce Org Type:
          <select
            name="orgType"
            value={formData.orgType}
            onChange={handleChange}
          >
            <option value="sandbox">Sandbox</option>
            <option value="production">Production</option>
          </select>
        </label>

        <label>
          Salesforce Org User Name:
          <input
            type="text"
            name="orgUserName"
            value={formData.orgUserName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Salesforce Org Password:
          <input
            type="password"
            name="orgPassword"
            value={formData.orgPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Org Client ID:
          <input
            type="text"
            name="orgClientID"
            value={formData.orgClientID}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Org Secret:
          <input
            type="password"
            name="orgSecret"
            value={formData.orgSecret}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Approach Type:
          <select
            name="approachType"
            value={formData.approachType}
            onChange={handleChange}
          >
            <option value="Heroku">Heroku</option>
            <option value="SDK">SDK</option>
          </select>
        </label>

        <button type="submit" className={styles.submitBtn}>
          Create App
        </button>
      </form>
    </div>
  );
};

export default CreateNewApp;
