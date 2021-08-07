import React, { useEffect, useState } from "react";

import "./newStyle2.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewUploads() {
  const { register, handleSubmit, errors, watch } = useForm();

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [loading, setLoading] = useState(false);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let name = localStorage.getItem("name");
  let name2 = localStorage.getItem("name2");
  let email = localStorage.getItem("email");
  let email2 = localStorage.getItem("email2");

  function logout() {
    if (window.confirm("Would you like to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("name2");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("email2");

      window.location = "/login";
    }
  }

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://souvik-appointment-bookingapp.herokuapp.com/userbookings/search/" +
  //         email
  //     )
  //     .then((res) => {
  //       if (res.data == 0) {
  //         console.log("no data");
  //       } else {
  //         console.log(res.data);
  //       }
  //     });
  // }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    console.log("submitting");
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
    setLoading(true);
  };

  const uploadImage = (base64EncodedImage) => {
    let formData = new FormData();

    formData.append("name", name2);
    formData.append("email", email2);
    formData.append("isUploaded", true);

    formData.append("image", selectedFile);

    axios
      .post(
        "https://souvikimageuploaderapp.herokuapp.com/useruploads/upload",
        formData
      )
      .then((res) => {
        console.log(res);
        alert("Image has been uploaded");

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          UploadIt!
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/dashboard">
                Dashboard{" "}
              </Link>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                New Upload<span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/myuploads">
                My Uploads
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-danger navbar-btn ml-auto"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {!token && !role ? (
        (window.location = "/login")
      ) : (
        <>
          <div>
            <video
              src="/videos/eduvid2.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "auto" }}
            />

            <div className="register " class="registerback">
              <div
                className="register_container shadow"
                class="colorbox newcolorbox"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <form onSubmit={handleSubmitFile}>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                    style={{ marginBottom: "10px" }}
                  />
                  <button className="btn btn-success btn-block" type="submit">
                    {/* Upload */}
                    {loading === false ? (
                      "Upload"
                    ) : (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                  </button>

                  {previewSource && (
                    <div>
                      <img
                        src={previewSource}
                        alt="preview"
                        style={{ height: "300px" }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <p>
                      Go to{" "}
                      <i style={{ fontWeight: "bold" }}>
                        <Link to="/myuploads">My Uploads</Link>
                      </i>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
