/*eslint-disable*/
import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Task = () => {

  const dpCodeJson = [{
    dpCode:'AUDP001',
    boardMembers:['Shri Shashi Shanker',	'Shri M. Venkatesh',	'Shri Subhash Kumar', 	'Shri Vinod S. Shenoy'],
    type:'matrix',
  }, {
    dpCode:'AUDP002',
    boardMembers:['Shri Shashi Shanker',	'Shri M. Venkatesh',	'Shri Subhash Kumar'],
    type:'matrix',
  }];
  const tabs = ['Enviromental', 'Social', 'Governance'];

  const [imagePreview, setImagePreview] = useState(null);
  const [currentUser, setCurrentUser] = useState('analyst');
  const [submitShow, setsubmitShow] = useState(false);
  const [rejectShow, setrejectShow] = useState(false);
  const [currentDpCode, setCurrentDpCode] = useState(null);
  const [currentTab, setCurrentTab] = useState('Enviromental');

  const sideBarRef = useRef();
  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const handlesubmitClose = () => setsubmitShow(false);
  const handlesubmitShow = () => setsubmitShow(true);

  const handlerejectClose = () => setrejectShow(false);
  const handlerejectShow = () => setrejectShow(true);

  const onSelectDpCode = (event) => {
    console.log(event);
    const [filteredDpCode] = dpCodeJson.filter((e) => (event.value === e.dpCode));
    setCurrentDpCode(filteredDpCode);
  };
  const Image = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
    setCurrentTab(currentTarget.innerHTML);
    if(currentTarget !== "Governance"){
      setCurrentDpCode(null);
    }
  }
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
    <div className="task-main" >
      <div className="task-tabs-wrap">
        {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
      </div>
      <div style={{ padding: '20px 2%', backgroundColor: '#fff' }}>
        <div
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4%',
          }}
        >
          <div>Task Id:</div>
          <div style={{ width: '130px' }}>
            <Select
              name="userRole"
              placeholder="Year"
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
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Key Issue*
              </Form.Label>
              <Col sm={3} lg={8}>
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
            <Form.Group className="task-form-group">
              <Form.Label sm={4} lg={2}>
                DP Code*
              </Form.Label>
              <Col lg={8}>
                <Select
                  name="userRole"
                  onChange={onSelectDpCode}
                  options={currentTab === 'Governance' ? dpCodeJson.map((e)=>({ value: e.dpCode, label: e.dpCode })) : []}
                  value={currentDpCode ? {value: currentDpCode.dpCode, label: currentDpCode.dpCode} : null}
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
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Page No*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Page No" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                URL*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="xyz.com" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Publication Date*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="date" placeholder="dd/mm/yyyy" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Description*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Description" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Text Snippet*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Snippet" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Screen*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="text" placeholder="Description" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="task-form-group">
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
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                File Path*
              </Form.Label>
              <Col lg={8}>
                <Form.Control type="file" onChange={Image} placeholder="Snippet" />
              </Col>
            </Form.Group>
            {imagePreview ? <img width="50%" onClick={() => {window.open(imagePreview)}} src={imagePreview} alt="Not Found" ></img> : null}
          </Col>
          
          {currentDpCode ? currentDpCode.boardMembers.map((e) => {
            return(
              <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                {e}*
              </Form.Label>
              <Col sm={3} lg={8}>
                <Select
                  name="userRole"
                  // value={""}
                  // onChange={}
                  options={[{ value: 'Yes', label: 'Yes' },{ value: 'No', label: 'No' }]}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                // isDisabled={}
                />
              </Col>
            </Form.Group>
          </Col>
            )
          }) : <Col lg={6}>
          <Form.Group className="task-form-group">
            <Form.Label lg={2}>
              Response*
            </Form.Label>
            <Col lg={8}>
              <Form.Control type="text" placeholder="Response" />
            </Col>
          </Form.Group>
        </Col>}
          <Col lg={12} style={{ borderBottom: '2px solid #e6e9ee', margin: '1% 0 2% 0' }}></Col>
          {(currentUser === "QA") ? <React.Fragment>
          <Col lg={6}>
            <Form.Group className="task-form-group">
              <Form.Label lg={2}>
                Error Type*
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
            <Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Label lg={2}>
                Comments*
              </Form.Label>
              <Col lg={8}>
                <Form.Control as="textarea" aria-label="With textarea" placeholder="Comments" />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={12} style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>
            <Button style={{ marginRight: '1.5%' }} onClick={handlerejectShow} variant="danger" type="submit">Reject</Button>
            <Button variant="success" onClick={handlesubmitShow} type="submit">Submit</Button>
          </Col>
          </React.Fragment> : <Col lg={12} style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>
            <Button variant="success" type="submit">Submit To QA</Button>
          </Col> }
          <Modal show={submitShow} onHide={handlesubmitClose} aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to submit ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlesubmitClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesubmitClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={rejectShow} onHide={handlerejectClose} aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to reject ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerejectClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlerejectClose}>
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

export default Task;
