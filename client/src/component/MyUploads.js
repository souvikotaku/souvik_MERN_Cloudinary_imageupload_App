import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";

import "./newStyle2.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyUploads() {
  const { register, handleSubmit, errors, watch } = useForm();
  const [name3, setName] = useState("");
  const [email3, setEmail] = useState("");
  const [imageid, setImageId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [specId, setSpecId] = useState("");

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

  useEffect(() => {
    axios
      .get(
        "https://souvikimageuploaderapp.herokuapp.com/useruploads/search/" +
          email
      )
      .then((res) => {
        if (res.data == 0) {
          console.log("no data");
        } else {
          console.log(res.data);
          setImageId(res.data);
        }
      })
      .catch((err) => console.log(err));

    // axios
    //   .get("http://localhost:5003/userbookings/getimages")
    //   .then((res) => {
    //     console.log(res);

    //     setImageId(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  function clickDelete(id) {
    if (window.confirm("Are you sure you want to delete the image?")) {
      axios
        .delete(
          "https://souvikimageuploaderapp.herokuapp.com/useruploads/" + id
        )
        .then((res) => {
          // console.log(res.data);

          window.location.reload();
        });
    }
  }

  const showModal = (imgid) => {
    setVisible(true);
    setSpecId(imgid);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
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
            <li class="nav-item">
              <Link class="nav-link" to="/newuploads">
                New Upload
              </Link>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                My Uploads<span class="sr-only">(current)</span>
              </a>
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
        <div>
          <img
            class="fillpic"
            src="/pokemon2.png"
            style={{ width: "100%", height: "auto" }}
          />
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Image ID</th>
                <th scope="col">Preview Link</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {imageid &&
              imageid.map((imgid, index) => (
                <>
                  <tbody style={{ backgroundColor: " rgba(0, 0, 0, 0.637)" }}>
                    <tr style={{ color: "white" }}>
                      <th scope="row">{index + 1}</th>
                      <td>{imgid.cloudinary_id.slice(11)}</td>
                      <td>
                        <a
                          href="#"
                          onClick={() => showModal(imgid.cloudinary_id)}
                        >
                          Preview Image
                        </a>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm dltbtn"
                          onClick={() => {
                            clickDelete(imgid._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </>
              ))}
          </table>
        </div>
      )}

      <Modal
        visible={visible}
        title="Preview Image"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            type="primary"
            onClick={handleCancel}
            style={{ width: "6rem" }}
          >
            Ok
          </Button>,
        ]}
      >
        <Image
          cloudName="souvikpunk"
          publicId={specId}
          crop="scale"
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
}
