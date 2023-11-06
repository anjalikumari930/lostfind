import React, { useState } from "react";
import axios from "axios";
import lodash from "lodash";
import "../css/modal.css";
import { toast } from "react-hot-toast";

const LostItem = () => {
  const [show, setShow] = useState(false);
  const token = window.localStorage.getItem("token");
  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [type, settype] = useState("");

  const handleSubmit = () => {
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
          toast.success("Wohoo 🤩! Item listed successfully.");
          setitemname("");
          setdescription("");
          settype("");
          setitemquestion("");
          setitemimage([]);
          setShow(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Oops 😞! Check internet connection or try again later.");
        });
    } else {
      toast.error("Did you miss any of the required fields 🙄?");
    }
  };

  const temporaryShut = () => {
    toast.error("New item listing has been disabled temporarily.");
    setShow(false);
  };

  return (
    <div>
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
            onChange={(e) => setitemname(e.target.value)}
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
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemquestion">Enter a question based on the item</label>
          <input
            type="text"
            id="itemquestion"
            placeholder="Ex:- What is the color of the phone ?"
            value={itemquestion}
            onChange={(e) => setitemquestion(e.target.value)}
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
            onChange={(e) => settype(e.target.value)}
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
              lodash.forEach(files, (file) => {
                setitemimage((item) => [...item, file]);
              });
            }}
            multiple
          />
        </div>
      </form>
      <div className="modal-footer">
        <button className="btn-primary" onClick={handleSubmit}>
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
};

export default LostItem;
