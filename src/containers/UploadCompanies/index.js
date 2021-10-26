/*eslint-disable*/
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col, Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { message } from 'antd';
import PageLoader from '../../components/PageLoader';

const UploadCompanies = () => {
  const sideBarRef = useRef();
  const [taxonomy, setTaxonomy] = useState();
  const [companyDataFile, setCompanyDataFile] = useState();
  const [companyLabel, setCompanyLabel] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [fileErrorAlert, setFileErrorAlert] = useState('');
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);
  const taxonomyDataLoading = useSelector((state) => state.clientTaxonomy.isLoading);
  const uploadCompanies = useSelector((state) => state.uploadCompanies.uploadCompanies);
  const uploadCompaniesError = useSelector((state) => state.uploadCompanies.error);

  useEffect(() => {
    dispatch({ type: 'ClientTaxonomy_REQUEST' });
  }, []);

  useEffect(() => {
    if (uploadCompanies && flag) {
      message.success(uploadCompanies.message)
    }
    else if (uploadCompaniesError && flag) {
      message.error(uploadCompaniesError.message)
    }
  }, [uploadCompanies, uploadCompaniesError]);

  const onTaxonomyChange = (taxonomy) => {
    setTaxonomy(taxonomy)
  }

  const onCompanyDataFileChange = (e) => {
    let file = e.target.files[0];
    if (file.type.match('^.*\.(xls|xlsx|sheet)$')) {
      setCompanyLabel(file.name);
      let reader = new FileReader();
      reader.onloadend = function () {
        setCompanyDataFile(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const onSubmitCompanyData = () => {
    if (!taxonomy) {
      message.error('Please select a taxonomy')
      setFileErrorAlert('file-not-upload');
      setErrorAlert('border-danger dropdown-alert');
    } else if (!companyDataFile) {
      message.error('Please upload a valid file')
      setFileErrorAlert('file-not-upload');
      setErrorAlert('border-danger dropdown-alert');
    } else {
      const payload = {
        companiesFile: companyDataFile,
        clientTaxonomyId: taxonomy.value,
      }
      dispatch({ type: 'UPLOAD_COMPANIES_REQUEST', payload });
      setFlag(true);
    }
  }

  const taxonomyOptions = taxonomyData && taxonomyData.rows.map((data) => ({
    value: data._id,
    label: data.taxonomyName
  }))

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="Upload Company" />
          <div className="container-main">
            <Container>
              <Card className="upload-container">
                {taxonomyDataLoading ? <PageLoader /> : <React.Fragment>
                  <Row>
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Select Taxonomy <sup className="text-danger">*</sup></Form.Label>
                        <Select
                          options={taxonomyOptions}
                          name="taxonomy"
                          value={taxonomy}
                          onChange={onTaxonomyChange}
                          className={!taxonomy && errorAlert}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Upload Company Data <sup className="text-danger">*</sup></Form.Label>
                        <Form.File
                          type="file"
                          accept="*/.xlxs,*/.xls"
                          className={!companyDataFile && fileErrorAlert}
                          label={companyLabel === '' ? 'Drag and drop a file or click' : companyLabel}
                          onChange={onCompanyDataFileChange}
                          custom
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="upload-button-container">
                    <Button variant="primary" className="upload-data-button" onClick={onSubmitCompanyData}>Submit</Button>
                  </Row>
                </React.Fragment>}
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadCompanies;
