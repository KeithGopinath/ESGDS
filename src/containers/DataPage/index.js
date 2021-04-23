/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Modal, Accordion, Card } from 'react-bootstrap';
import { DatePicker } from 'antd';
import Select from 'react-select';
import 'antd/dist/antd.css';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';


const DataPage = () => {
  const currentUser = 'analyst';
  const currentDpCode = {
    dpCode: 'AUDP002',
    boardMembers: ['Shri Shashi Shanker', 'Shri M. Venkatesh', 'Shri Subhash Kumar'],
    isMatrix: false,
  };

  const sideBarRef = useRef();

  const [showAnalystSaveModal, setShowAnalystSaveModal] = useState(false);
  const [showAnalystCloseModal, setShowAnalystCloseModal] = useState(false);
  const [showQASaveModal, setShowQASaveModal] = useState(false);
  const [showQACloseModal, setShowQACloseModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);

  const analystShowSaveModal = () => setShowAnalystSaveModal(true);
  const analystCloseSaveModal = () => setShowAnalystSaveModal(false);
  const analystShowCloseModal = () => setShowAnalystCloseModal(true);
  const analystCloseCloseModal = () => setShowAnalystCloseModal(false);

  const qAShowSaveModal = () => setShowQASaveModal(true);
  const qACloseSaveModal = () => setShowQASaveModal(false);
  const qAShowCloseModal = () => setShowQACloseModal(true);
  const qACloseCloseModal = () => setShowQACloseModal(false);

  const imageBrowser = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const BoardMembers = () => {
    const boardMembers = currentDpCode.boardMembers.map((e) => (
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            {e}*
          </Form.Label>
          <Col sm={7}>
            <Select
              name="userRole"
              // value={""}
              // onChange={}
              options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
              // isSearchable={}
              // className={}
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
    ));
    
    return (
      <Col lg={12}>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle style={{ border: 'none', background: 'none' }} eventKey="0">Board Members</Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>{boardMembers}</Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    );
  };

  const pillarOption = [
    { value: 'Annual Report', label: 'Annual Report' },
    { value: 'Integrated Report', label: 'Integrated Report' },
    { value: 'Sustainability Report', label: 'Sustainability Report' },
    { value: 'Policy documents', label: 'Policy documents' },
    { value: 'Webpages', label: 'Webpages' },
    { value: 'News', label: 'News' },
    { value: 'Press release', label: 'Press release' },
    { value: 'Meeting Notice & Vote results', label: 'Meeting Notice & Vote results' },
    { value: 'Others', label: 'Others' },
  ];

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="datapage-main" >
          <div className="datapage-info-group">
            <Row>
              {/* --------------------------------------------------------------------------------------------- DPCODE */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    DP Code*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" readOnly value="AUDP001" />
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Report*
                  </Form.Label>
                  <Col sm={7}>
                    <Select
                      name="userRole"
                      // value={""}
                      // onChange={}
                      options={pillarOption}
                      // isSearchable={}
                      // className={}
                      maxLength={30}
                    />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- LINE */}
              <Col lg={12} className="datapage-horizontalLine"></Col>
              {/* --------------------------------------------------------------------------------------------- PAGE NO */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Page No*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" placeholder="Page No" />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- URL */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    URL*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" placeholder="Url" />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- PUBLICATION DATE */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Publication Date*
                  </Form.Label>
                  <Col sm={7}>
                    <DatePicker className="datapage-datepicker" size="large" />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- DESCRIPTION */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Description*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" placeholder="Description" />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- TEXT SNIPPET */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Text Snippet*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" placeholder="Snippet" />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- SCREEN */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Screen*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" placeholder="Screen" />
                  </Col>
                </Form.Group>
              </Col>
              {/* --------------------------------------------------------------------------------------------- SOURCE */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    Source*
                  </Form.Label>
                  <Col sm={7}>
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
              {/* --------------------------------------------------------------------------------------------- FILE PATH */}
              <Col lg={6}>
                <Form.Group as={Row} >
                  <Form.Label column sm={5}>
                    File Path*
                  </Form.Label>
                  <Col sm={7}>
                    <Form.File
                      id="custom-file"
                      label="Browse"
                      custom
                      onChange={imageBrowser}
                    />
                  </Col>
                </Form.Group>
                {/* --------------------------------------------------------------------------------------------- IMAGE PREVIEW */}
                {imagePreview ? <img width="50%" onClick={() => { window.open(imagePreview); }} src={imagePreview} alt="Not Found" ></img> : null}
              </Col>
              {currentDpCode.isMatrix ? BoardMembers() :
                (
              /* --------------------------------------------------------------------------------------------- Response */
                  <Col lg={6}>
                    <Form.Group as={Row} >
                      <Form.Label column sm={5}>
                        Response*
                      </Form.Label>
                      <Col sm={7}>
                        <Form.Control type="text" placeholder="Response" />
                      </Col>
                    </Form.Group>
                  </Col>
                )
              }
              {/* --------------------------------------------------------------------------------------------- LINE */}
              <Col lg={12} className="datapage-horizontalLine"></Col>
              {(currentUser === 'QA') ?
                <React.Fragment>
                  {/* --------------------------------------------------------------------------------------------- CHECK ERROR FLAG */}
                  <Col lg={12}>
                    <Form.Group as={Row} >
                      <Col sm={7}>
                        <Form.Check type="checkbox" onChange={(e) => { console.log(e); }} label="Error Found" />
                      </Col>
                    </Form.Group>
                  </Col>
                  {/* --------------------------------------------------------------------------------------------- ERROR TYPE */}
                  <Col lg={6}>
                    <Form.Group as={Row} >
                      <Form.Label column sm={5}>
                        Error Type*
                      </Form.Label>
                      <Col sm={7}>
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
                  {/* --------------------------------------------------------------------------------------------- COMMENTS */}
                  <Col lg={6}>
                    <Form.Group as={Row} >
                      <Form.Label column sm={5}>
                        Comments*
                      </Form.Label>
                      <Col sm={7}>
                        <Form.Control as="textarea" aria-label="With textarea" placeholder="Comments" />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="datapage-button-wrap">
                    <Button style={{ marginRight: '1.5%' }} onClick={qAShowCloseModal} variant="danger" type="submit">Close</Button>
                    <Button variant="success" onClick={qAShowSaveModal} type="submit">Save</Button>
                  </Col>
                </React.Fragment> :
                (
                  <Col lg={12} className="datapage-button-wrap">
                    <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={analystShowCloseModal} type="submit">Close</Button>
                    <Button variant="success" onClick={analystShowSaveModal} type="submit">Save</Button>
                  </Col>
                ) }
              {/* ----------------------------------------------ANALYST MODALS-------------------------------------------------- */}
              <Modal
                show={showAnalystSaveModal}
                onHide={analystCloseSaveModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to save ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={analystCloseSaveModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={analystCloseSaveModal}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={showAnalystCloseModal}
                onHide={analystCloseCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to Close ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={analystCloseCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={analystCloseCloseModal}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* ----------------------------------------------QA MODALS-------------------------------------------------- */}
              <Modal
                show={showQASaveModal}
                onHide={qACloseSaveModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to save ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={qACloseSaveModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={qACloseSaveModal}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={showQACloseModal}
                onHide={qACloseCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to Close ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={qACloseCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={qACloseCloseModal}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
