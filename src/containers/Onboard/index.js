/*eslint-disable*/
import React, { useState } from 'react';
import StepProgressBar from 'react-step-progress';
import { history } from './../../routes';
import { Container } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import ProofUpload from './ProofUpload';
import LoginCredentials from './LoginCredentials';

const Onboard = () => {
const [role, setRole] = useState('employee');
const onFormSubmit = () => {
    history.push('/');
};
  return (
    <Container>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        contentClass="step-content"
        nextBtnName="Save & Continue"
        previousBtnName="Back"
        primaryBtnClass="save-continue"
        secondaryBtnClass="back"
        steps={[
          {
            label: 'Personal Details',
            name: 'step 1',
            content: <PersonalDetails role={role} />,
          },
          {
            label: 'Proof Upload',
            name: 'step 2',
            content: <ProofUpload role={role} />,
          },
          {
            label: 'Login Credentials',
            name: 'step 3',
            content: <LoginCredentials role={role} />,
          },
        ]}
      />
    </Container>
  );
};

export default Onboard;
