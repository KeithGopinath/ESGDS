/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DataAccordian = (props) => {
  const [isArrowDown, setIsArrowDown] = useState(false);
  useEffect(() => {
    setIsArrowDown(props.isActive);
  }, [props.isActive]);
  return (
    <Accordion defaultActiveKey={props.isActive && '0'}>
      <Card>
        <Card.Header style={{ backgroundColor: '#2199c8', display: 'flex', justifyContent: 'space-between' }}>
          <Accordion.Toggle
            style={{
              border: 'none', background: 'none', color: '#fff', fontSize: 'larger',
            }}
            eventKey="0"
            onClick={() => { setIsArrowDown(!isArrowDown); }}
          >{props.header}
          </Accordion.Toggle>
          <Accordion.Toggle
            style={{
              border: 'none', background: 'none', color: '#fff', fontSize: 'larger',
            }}
            eventKey="0"
            onClick={() => { setIsArrowDown(!isArrowDown); }}
          ><FontAwesomeIcon icon={isArrowDown ? faAngleUp : faAngleDown} />
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
