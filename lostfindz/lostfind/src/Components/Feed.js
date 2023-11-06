import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/feed.css";
import "../css/item_card.css";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import LostItem from "./LostItems";

export default function Feed() {
  // console.log("Status :", LOGGED_IN)
  // const [user_info,setuser_info]=useState(localStorage.getItem("user"))
  // const [user_info,setuser_info]=useState(localStorage.getItem('user'))
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p style={{ fontSize: "1rem" }} className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };
  setConstraint(true);

  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState([]);

  useEffect(() => {
    // console.log("Test");
    Axios({
      url: "http://localhost:5000/getitem",
      method: "GET",
    })
      .then((response) => {
        console.log("Axios Response1:",response.data);
        // console.log(response);
        console.log("Axios Response:", response); // Log the entire response
         // Log the response for debugging

        let data = response.data.postitems;
        let items = [];
        let Found_items = [];
        data.map((item) => {
          let created_date = new Date(item.createdAt);
          // console.log(created_date);
          // console.log(created_date.getDate()+"/"+created_date.getMonth()+"/"+created_date.getFullYear()+" "+created_date.getHours()+":"+created_date.getMinutes());
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
            
          if (item.type === "Lost" && item.status === true) {
            let user = false;
            if (item.createdBy === user_info._id) {
              user = true;
            }
            // console.log(item)
            // console.log("Lost item "+user+item.name)
            // console.log(`http://localhost:5000/${item.itemPictures[0].img}`)
            items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
              >
                <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                  {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                  <Card bsPrefix="item-card">
                    <Card.Img
                      variant="top"
                      src={item.itemPictures[0].img}

                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Item :{item.name}
                      </Card.Title>
                      {/* <Card.Text>Type :{item.type}</Card.Text> */}
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Created at : {createdAt}
                      </Card.Text>
                      {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                    </Card.Body>
                    {/* 
                  </Card.Body> */}
                  </Card>
                </Col>
              </a>
            );
          } else {
            var user1 = false;
            if (item.createdBy === user_info._id) {
              user1 = true;
            }
            // console.log("Lost item "+user1+item.name)
              console.log("Axios Response2:",response.data);
              console.log(item._id);
            Found_items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user1}`}
              >
                <Col style={{ marginTop: "2%" }} md={3}>
                  {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                  <Card bsPrefix="item-card" key={item.name}>
                    <Card.Img
                      variant="top"
                      src={item.itemPictures[0].img}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Item :{item.name}
                      </Card.Title>
                      {/* <Card.Text>Type :{item.type}</Card.Text> */}
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Created at : {createdAt}
                      </Card.Text>
                      {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                    </Card.Body>
                    {/* 
                  </Card.Body> */}
                  </Card>
                </Col>
              </a>
            );
          }
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <h2
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            marginLeft: "5px",
          }}
        >
          Welcome {user_info.firstname} 👋!
        </h2>
        <LostItem/>
      </div>
      <div>
        <Container fluid>
          <h2 style={{ textAlign: "center" }}>Lost items :</h2>
          <div className="title-border"></div>
          <Row>{item}</Row>
        </Container>
      </div>
      <div>
        <Container fluid>
          {Found_item ? (
            <div>
              <h2 style={{ textAlign: "center" }}>Found items :</h2>
              <div className="title-border"></div>
              <Row>{Found_item}</Row>
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    </div>
  );
}
