/*eslint-disable*/
import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import Select from 'react-select';

const Task = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const sideBarRef = useRef();
  const Image = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
    <div
      style={{
        display: 'flex', padding: '40px 5%', backgroundColor: '#f0f0f0', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '30px 0' }}>
        <div className="task-tabs active">Enviromental</div>
        <div className="task-tabs">Social</div>
        <div className="task-tabs">Governance</div>
      </div>
      <div style={{ padding: '20px 2%', backgroundColor: '#fff' }}>
        <div
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4%',
          }}
        >
          <div>Enviromental</div>
          <div style={{ width: '130px' }}>
            <Select
              name="userRole"
              // value={""}
              // onChange={}
              // options={}
              // isSearchable={}
              // className={}
              maxLength={30}
            />
          </div>
        </div>
        <Row>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Key Issue*
              </Form.Label>
              <Col lg={8}>
                <Select
                  name="userRole"
                  // value={""}
                  // onChange={}
                  // options={}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                // isDisabled={}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Function*
              </Form.Label>
              <Col lg={8}>
                <Select
                  name="userRole"
                  // value={""}
                  // onChange={}
                  // options={}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={12} style={{ borderBottom: '2px solid #e6e9ee', margin: '1% 0 2% 0' }}>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                DP Code*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="BIOS001" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Page No*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Page No" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                URL*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="xyz.com" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Publication Date*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="dd/mm/yyyy" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Description*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Description" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Text Snippet*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Snippet" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Screen*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Description" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                File Path*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="file" onChange={Image} placeholder="Snippet" />
              </Col>
            </Form.Group>
            {imagePreview ? <img width="50%" onClick={() => {window.open(imagePreview)}} src={imagePreview} alt="Not Found" ></img> : null}
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Source*
              </Form.Label>
              <Col lg={8}>
                <Select
                  name="userRole"
                  // value={""}
                  // onChange={}
                  // options={}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Answer*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Snippet" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={12} style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>
            <Button style={{ marginRight: '1.5%' }} variant="danger" type="submit">Reject</Button>
            <Button variant="success" type="submit">Save&Continue</Button>
          </Col>
        </Row>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Task;
