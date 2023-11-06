import React, { useState } from "react";
import axios from "axios";
import lodash from "lodash";
import { useToaster } from "react-hot-toast";

const LostItem = () => {
  const [show, setShow] = useState(false);
  const { addToast } = useToaster();
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [itemname, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [itemquestion, setItemQuestion] = useState("");
  const [itemimage, setItemImages] = useState([]);
  const [type, setType] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    setLoading(true);

    if (itemname && description && type) {
      const info = new FormData();
      info.append("name", itemname);
      info.append("description", description);
      info.append("question", itemquestion);
      info.append("type", type);
      itemimage.forEach((itemImage) => {
        info.append("itemPictures", itemImage, itemImage.name);
      });

      axios({
        url: "http://localhost:5000/postitem",
        method: "POST",
        data: info,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        },
      })
        .then((response) => {
          console.log(response);
          addToast("Wohoo 🤩! Item listed successfully.", {
            appearance: "success",
          });
          // Reset form and loading state
          setItemName("");
          setDescription("");
          setType("");
          setItemQuestion("");
          setItemImages([]);
        })
        .catch((err) => {
          console.log(err);
          addToast("Oops 😞! Check internet connection or try again later.", {
            appearance: "error",
          });
        })
        .finally(() => {
          setLoading(false);
          setShow(false);
        });
    } else {
      addToast("Did you miss any of the required fields 🙄?", {
        appearance: "error",
      });
      setLoading(false);
    }
  };

  const temporaryShut = () => {
    addToast("New item listing has been disabled temporarily.", {
      appearance: "warning",
    });
    setShow(false);
  };

  return (
    <div>
      <button className="btn-primary" onClick={handleShow}>
        Post Item
      </button>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h2>Post item</h2>
            <form>
              <div className="form-group">
                <label htmlFor="itemname">
                  Item name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="itemname"
                  placeholder="Enter item"
                  value={itemname}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Description<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="itemquestion">Enter a question based on the item</label>
                <input
                  type="text"
                  id="itemquestion"
                  placeholder="Ex:- What is the color of the phone ?"
                  value={itemquestion}
                  onChange={(e) => setItemQuestion(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  Item type<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="type"
                  required={true}
                  defaultValue="Choose..."
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Choose..</option>
                  <option value={"Lost"}>Lost It</option>
                  <option value={"Found"}>Found It</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="formimage">Upload Image</label>
                <input
                  type="file"
                  id="formimage"
                  onChange={(e) => {
                    let { files } = e.target;
                    const selectedImages = Array.from(files);
                    setItemImages(selectedImages);
                  }}
                  multiple
                />
              </div>
            </form>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn-primary" onClick={temporaryShut}>
                {loading ? <span>Loading...</span> : <span>Submit</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItem;
