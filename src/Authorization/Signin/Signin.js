import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../Signin/actions";
import { useSelector, useDispatch } from "react-redux";

const Signin = ({ closeModal }) => {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const handleInputChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
  console.log(show,"test")
  }, [])
  // useEffect(() => {
  //   if (Object.keys(userInfo).length > 0) {
  //     history.push("/");
  //   }
  // }, [userInfo, history]);

  // useEffect(() => {
  //   if (!isEmpty(userInfo)) {
  //     history.push("/");
  //   }
  // }, [userInfo, history]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Modal show={show} onHide={handleClose} className="signin">
            <Modal.Header closeButton>
              <Modal.Title>Hesaba daxil ol</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span> Hesabınız yoxdur?</span>
              <Link to="/register" className="redirect"
                onClick={closeModal}>
                Qeydiyyatdan keç
              </Link>
              <Form onSubmit={handleSubmitForm}>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, "email")}
                    className="form-control"
                    placeholder="E-mailinizi daxil edin"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) => handleInputChange(e, "password")}
                    className="form-control"
                    placeholder="Şifrənizi daxil edin"
                  />
                </div>

                {userInfo.error && (
                  <p className="text-danger">{userInfo.error}</p>
                )}
          
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onSubmit={handleSubmitForm}
                className="enter"
                onClick={closeModal}
              >
                Daxil ol
              </Button>
              <Button className="reject" onClick={closeModal}>
                İmtina et
              </Button>
            </Modal.Footer>
          </Modal>
    
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
