/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DataAccordian = (props) => {
  const [isArrowDown, setIsArrowDown] = useState(false);
  return (
    <Accordion defaultActiveKey={props.isActive && '0'}>
      <Card>
        <Card.Header style={{ backgroundColor: '#2199c8', display: 'flex', justifyContent: 'space-between' }}>
          <Accordion.Toggle
            style={{
              border: 'none', background: 'none', fontWeight: 500, color: '#fff', fontSize: 'larger',
            }}
            eventKey="0"
            onClick={() => { setIsArrowDown(!isArrowDown); }}
          >{props.header}
          </Accordion.Toggle>
          <Accordion.Toggle
            style={{
              border: 'none', background: 'none', fontWeight: 500, color: '#fff', fontSize: 'larger',
            }}
            eventKey="0"
            onClick={() => { setIsArrowDown(!isArrowDown); }}
          ><FontAwesomeIcon icon={isArrowDown ? faAngleDown : faAngleUp} />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {props.children}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default DataAccordian;