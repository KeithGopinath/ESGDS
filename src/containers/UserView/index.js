/*eslint-disable*/
import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import PersonalDetails from '../../containers/Onboard/PersonalDetails';

const UserView = (props) => {
    const sideBarRef = useRef();
    const userType = props.location.state.userType;
    const role = userType == 'Client Representative' ? 'client' : userType == 'Employee' ? 'employee' : 'company';
    const userID = props.location.state.id;

    return (
        <React.Fragment>
            <div className="main">
                <SideMenuBar ref={sideBarRef} />
                <div className="rightsidepane">
                    <Header title="User View" />
                    <div className="container-main">
                        <PersonalDetails
                            role={role}
                            flag={true}
                            userID={userID}
                        // firstName={firstName}
                        // onFirstName={onFirstNameChange}
                        // onMiddleName={onMiddleNameChange}
                        // onLastName={onLastNameChange}
                        // onEmail={onEmailChange}
                        // onPhone={onPhoneNumberChange}
                        // onPancard={onPancardChange}
                        // onAadhar={onAadharChange}
                        // onBankAccount={onBankAccountNumberChange}
                        // onBankIfsc={onBankIfscChange}
                        // onCompanyName={onCompanyNameChange}
                        // setActiveStep={setActiveStep}
                        // activeStep={activeStep}
                        // validatingSpaces={validatingSpaces}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserView;


