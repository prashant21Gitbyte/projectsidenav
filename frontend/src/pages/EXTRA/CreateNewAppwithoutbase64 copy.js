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
    console.log(name, value);
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
      /*
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }*/
      /* with files input print
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }*/

      const response = await fetch("http://localhost:5000/api/create-app", {
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
        <div>
          <div className={styles.formGroup}>
            <label>App Name:</label>
            <input
              type="text"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Logo:</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Icon:</label>
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Font Style:</label>
            <input
              type="text"
              name="fontStyle"
              value={formData.fontStyle}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Font Size:</label>
            <input
              type="number"
              name="fontSize"
              value={formData.fontSize}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Splash Screen (GIF):</label>
            <input
              type="file"
              name="splashScreen"
              accept="image/gif"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.formGroup}>
            <label>Salesforce Org Type:</label>
            <select
              name="orgType"
              value={formData.orgType}
              onChange={handleChange}
            >
              <option value="sandbox">Sandbox</option>
              <option value="production">Production</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Salesforce Org User Name:</label>
            <input
              type="text"
              name="orgUserName"
              value={formData.orgUserName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Salesforce Org Password:</label>
            <input
              type="password"
              name="orgPassword"
              value={formData.orgPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Org Client ID:</label>
            <input
              type="text"
              name="orgClientID"
              value={formData.orgClientID}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Org Secret:</label>
            <input
              type="password"
              name="orgSecret"
              value={formData.orgSecret}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Approach Type:</label>
            <select
              name="approachType"
              value={formData.approachType}
              onChange={handleChange}
            >
              <option value="Heroku">Heroku</option>
              <option value="SDK">SDK</option>
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create App
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewApp;
