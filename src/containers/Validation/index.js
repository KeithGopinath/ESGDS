/*eslint-disable*/
import React, { useRef, useState, useEffect } from 'react';
import { Card, Row, Col, Container, Form, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import ValidationTypeEdit from '../ValidationTypeEdit';
import { ValidationJson } from './ValidationJsonStructure';

const Validation = () => {
  const sideBarRef = useRef();
  const [taxonomy, setTaxonomy] = useState('');
  const [dpCodeType, setDpCodeType] = useState('');
  const [dpCodeTypeOption, setDpCodeTypeOption] = useState([]);
  const [dpCode, setDpCode] = useState('');
  const [dpCodeOptions, setDpCodeOptions] = useState([]);
  const [description, setDescription] = useState('');
  const [validationType, setValidationType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [disableFileds, setDisableFileds] = useState(false);
  const [showEditType, setShowEditType] = useState(false);
  const [typeOfData, setTypeOfData] = useState('');
  const [conditionCheck, setConditionCheck] = useState('');
  const [criteria, setCriteria] = useState('');
  const [hasDependentCode, setHasDependentCode] = useState('');
  const [dependentCodes, setDependentCodes] = useState([]);
  const [methodName, setMethodName] = useState('');
  const [parameters, setParameters] = useState('');
  const [validationRule, setValidationRule] = useState('');

  const validateOptions = [
    {
      taxonomy: { label: 'Acuite', value: 'Acuite' },
      dpCodeTypeOptions: [
        {
          dpcodeTypeName: { label: 'Standalone', value: 'StandaloneId' },
          dpCodeOptions: [
            {
              dpcode: { label: '0001', value: '0001' },
              types: [
                { type: "Type 1", status: false },
                { type: "Type 2", status: false },
                { type: "Type 3", status: false }
              ]
            }
          ]
        },
        {
          dpcodeTypeName: { label: 'Matrix', value: 'Matrix' },
          dpCodeOptions: [
            {
              dpcode: { label: '0001', value: '0001' },
              types: [
                { type: "Type 2", status: false },
                { type: "Type 4", status: false },
                { type: "Type 5", status: false },
              ]
            },
            {
              dpcode: { label: '0002', value: '0002' },
              types: [
                { type: "Type 3", status: false }
              ]
            },
            {
              dpcode: { label: '0003', value: '0003' },
              types: [
                { type: "Type 2", status: false },
                { type: "Type 3", status: false },
                { type: "Type 4", status: false },
                { type: "Type 5", status: false }
              ]
            },
          ]
        },
      ]
    },
    {
      taxonomy: { label: 'Acuite1', value: 'Acuite1' },
      dpCodeTypeOptions: [
        {
          dpcodeTypeName: { label: 'KMP Board Members', value: 'KMP Board Members' },
          dpCodeOptions: [
            {
              dpcode: { label: '0002', value: '0002' },
              types: [
                { type: "Type 2", status: false },
                { type: "Type 3", status: false }
              ]
            }
          ]
        },
        {
          dpcodeTypeName: { label: 'Matrix', value: 'Matrix' },
          dpCodeOptions: [
            {
              dpcode: { label: '0001', value: '0001' },
              types: [
                { type: "Type 2", status: false },
                { type: "Type 4", status: false },
                { type: "Type 7", status: false },
                { type: "Type 8", status: false }
              ]
            },
            {
              dpcode: { label: '0002', value: '0002' },
              types: [
                { type: "Type 1", status: false },
                { type: "Type 2", status: false },
                { type: "Type 3", status: false },
                { type: "Type 4", status: false }
              ]
            },
            {
              dpcode: { label: '0003', value: '0003' },
              types: [

                { type: "Type 5", status: false },
                { type: "Type 6", status: false },
                { type: "Type 7", status: false },
                { type: "Type 8", status: false }
              ]
            },
          ]
        },
      ]
    }
  ];

  const onChangeTaxonomy = (e) => {
    setTaxonomy(e);
    console.log(" taxonomy : ", e);
    setDpCodeTypeOption(e.data.dpCodeTypeOptions);
    setDpCodeType('');
    setDpCode('');
    setValidationType('');
  };

  const onChangeDpCodeType = (e) => {
    setDpCodeType(e);
    setDpCodeOptions(e.data.dpCodeOptions);
    setDpCode('');
    setValidationType('');
  };

  const onChangeDpCode = (e) => {
    setDpCode(e);
    setValidationType('');
  };

  const onChangeThresholdValue = (e) => {
    setMin(e.target.value);
  };

  const onChangeThresholdValueMaximum = (e) => {
    setMax(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeTypeOfData = (e) => {
    setTypeOfData(e);
  };

  // type1 options
  const typeOneOptions = [
    { label: 'Text', value: 'Text' },
    { label: 'Boolean', value: 'Boolean' },
    { label: 'Numerical', value: 'Numerical' }
  ]

  // type 8
  const dependentCodeOptions = [
    { label: 'DP001', value: 'DP001' },
    { label: 'DP002', value: 'DP002' },
    { label: 'DP003', value: 'DP003' },
    { label: 'DP004', value: 'DP004' }
  ];

  const parameterOptions = [
    { label: 'Peram1', value: 'Peram1' },
    { label: 'Peram2', value: 'Peram2' },
    { label: 'Peram3', value: 'Peram3' },
    { label: 'Peram4', value: 'Peram4' }
  ];

  const onConditionCheck = (e) => {
    setConditionCheck(e.target.value);
  };

  const onChangeCriteria = (e) => {
    setCriteria(e.target.value);
  };

  const handleSelect = (e) => {
    setHasDependentCode(e.target.id);
  }

  const onChangeDependentCodes = (e) => {
    setDependentCodes(e);
  };

  const onChangeMethodName = (e) => {
    setMethodName(e.target.value);
  };

  const onChangeValidationRule = (e) => {
    setValidationRule(e.target.value);
  };

  const onChangeParameters = (e) => {
    setParameters(e);
  };

  // submit the data
  const onSubmitData = () => {
    const dpCodeUpdate = dpCode.data.types.map(item => {
      if (item.type === selectedType) {
        item.status = true;
        return item;
      }
      return item;
    })
    const updatedCode = {
      ...dpCode,
      types: dpCodeUpdate
    }
    setDpCode(updatedCode);
    setDisableFileds(true);
  };

  const onTypeClick = (e, data) => {
    setSelectedType(data.type);
    setSelectedItem(data);
    setValidationType(e.target.id);
  };

  const onNaClick = () => {
    onSubmitData();
  };

  // edit type model
  const editType = (data) => {
    setSelectedType(data);
    setShowEditType(true);
  };

  const handleClose = () => {
    setShowEditType(false)
  }

  const onEditSubmit = () => {
    handleClose();
    const dpCodeUpdate = dpCode.data.types.map(item => {
      if (item.type === selectedType) {
        item.status = false;
        return item;
      }
      return item;
    })
    const updatedCode = {
      ...dpCode,
      types: dpCodeUpdate
    }
    setDpCode(updatedCode);
    setDisableFileds(false);
  };

  const onSubmitSecondary = () => {
    setShowEditType(false);
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title="Validation" />
        <div className="container-main ">
          <Container>
            <Card>
              <Row className="d-flex m-4">
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Taxonomy<sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={validateOptions.map(e => ({ label: e.taxonomy.label, value: e.taxonomy.value, data: e }))}
                      name="taxonomy"
                      value={taxonomy}
                      onChange={onChangeTaxonomy}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>DP Code Type<sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={dpCodeTypeOption.map(e => ({ label: e.dpcodeTypeName.label, value: e.dpcodeTypeName.value, data: e }))}
                      name="dpcodetype"
                      value={dpCodeType}
                      onChange={onChangeDpCodeType}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>DP Code<sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={dpCodeOptions.map(e => ({ label: e.dpcode.label, value: e.dpcode.value, data: e }))}
                      name="dpcode"
                      value={dpCode}
                      onChange={onChangeDpCode}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Validation<sup className="text-danger">*</sup></Form.Label>
                    <Table responsive="sm" className="validation-table border-right-0 border-left-0" striped bordered >
                      <tbody>
                        {dpCode === '' ?
                          <tr>
                            <td class="MuiTableCell-root MuiTableCell-body" colspan="6">
                              <div class="ant-result ant-result-info">
                                <div class="ant-result-icon">
                                  <span role="img" aria-label="inbox" class="anticon anticon-inbox">
                                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="inbox" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                      <path d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0060.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr> : dpCode.data.types.map((data) => (
                            <tr key={data.type}>
                              <td className="d-flex">
                                <div className="tabledata-container">
                                  <span
                                    className="btn type-btn"
                                    id={data.type}
                                    onClick={(e) => onTypeClick(e, data)}>{data.type}</span>
                                  <span
                                    className={`validation-status font-weight-bold ${data.status === true ? ' text-success' : 'text-primary'}`}
                                    id={data.type}>{data.status ? 'Completed' : 'Initiate'}</span>
                                </div>
                                <div className="edit-icon-container">
                                  {data.status === true ? <FontAwesomeIcon className=" type-edit text-success" icon={faEdit} onClick={() => editType(data.type)} /> : null}
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Form.Group>
                </Col>
              </Row>
            </Card>
            {(validationType === 'Type 1' || validationType === 'Type 2' || validationType === 'Type 3' || validationType === 'Type 4' || validationType === 'Type 5' || validationType === 'Type 6' || validationType === 'Type 7' || validationType === 'Type 8') &&
              <Card className="mt-2">
                <h6 className="font-weight-bold text-primary m-3">{validationType}</h6>
                <Row className="d-flex m-4">
                  {validationType === 'Type 1' &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Data Type</Form.Label><sup className="text-danger">*</sup>
                        <Select
                          options={typeOneOptions}
                          isDisabled={validationType && disableFileds && selectedItem.status}
                          name="datatype"
                          id="datatype"
                          value={typeOfData}
                          onChange={onChangeTypeOfData}
                        />
                      </Form.Group>
                    </Col>}
                  {validationType === 'Type 2' && <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Threshold Value</Form.Label><sup className="text-danger">*</sup>
                      <Form.Control
                        disabled={validationType && disableFileds && selectedItem.status}
                        type="number"
                        name="thresholdValue"
                        id="thresholdValue"
                        value={min}
                        onChange={onChangeThresholdValue}
                      />
                    </Form.Group>
                  </Col>
                  }
                  {(validationType === 'Type 3' || validationType === 'Type 4' || validationType === 'Type 5' || validationType === 'Type 6') &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Description<sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                          disabled={validationType && disableFileds && selectedItem.status}
                          as="textarea"
                          // name={validationType === 'Type 3' ? 'type3description' : validationType === 'Type 4' ? 'type4description' : validationType === 'Type 5' ? 'type5description' : validationType === 'Type 6' ? 'type6description' : ''}
                          value={description}
                          onChange={onChangeDescription}
                        />
                      </Form.Group>
                    </Col>
                  }
                  {validationType === 'Type 7' &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Threshold Value(Max)<sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                          disabled={validationType && disableFileds && selectedItem.status}
                          type="number"
                          // name="thresholdValueMax"
                          id="thresholdValueMax"
                          value={max}
                          onChange={onChangeThresholdValueMaximum}
                        />
                      </Form.Group>
                    </Col>
                  }
                  {validationType === 'Type 8' &&
                    <React.Fragment>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>hasDependent Code<sup className="text-danger">*</sup></Form.Label>
                          <Row
                            className="w-100 justify-content-around"
                            disabled={validationType && disableFileds && selectedItem.status}
                          >
                            <Form.Check
                              type="radio"
                              label="True"
                              name="formHorizontalRadios"
                              id="true"
                              onChange={handleSelect}
                            />
                            <Form.Check
                              type="radio"
                              label="False"
                              name="formHorizontalRadios"
                              id="false"
                              onChange={handleSelect}
                            />
                          </Row>
                        </Form.Group>
                      </Col>
                      {hasDependentCode === 'true' ?
                        <React.Fragment>
                          <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                              <Form.Label>Condition Check<sup className="text-danger">*</sup></Form.Label>
                              <Form.Control
                                disabled={validationType && disableFileds && selectedItem.status}
                                type="text"
                                name="checkCondition"
                                id="checkCondition"
                                value={conditionCheck}
                                onChange={onConditionCheck}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                              <Form.Label>Criteria<sup className="text-danger">*</sup></Form.Label>
                              <Form.Control
                                disabled={validationType && disableFileds && selectedItem.status}
                                type="text"
                                name="criteria"
                                id="criteria"
                                value={criteria}
                                onChange={onChangeCriteria}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                              <Form.Label>Dependent Codes<sup className="text-danger">*</sup></Form.Label>
                              <Select
                                options={dependentCodeOptions}
                                isMulti
                                isDisabled={validationType && disableFileds && selectedItem.status}
                                name="dependentCodes"
                                id="dependentCodes"
                                value={dependentCodes}
                                onChange={onChangeDependentCodes}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                              <Form.Label>Method Name<sup className="text-danger">*</sup></Form.Label>
                              <Form.Control
                                disabled={validationType && disableFileds && selectedItem.status}
                                type="text"
                                name="methodName"
                                id="methodName"
                                value={methodName}
                                onChange={onChangeMethodName}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                              <Form.Label>Perameters<sup className="text-danger">*</sup></Form.Label>
                              <Select
                                // options={parameterOptions}
                                options={dependentCodeOptions}
                                isMulti
                                isDisabled={validationType && disableFileds && selectedItem.status}
                                name="parameters"
                                id="parameters"
                                value={parameters}
                                onChange={onChangeParameters}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                              <Form.Label>validation Rule<sup className="text-danger">*</sup></Form.Label>
                              <Form.Control
                                disabled={validationType && disableFileds && selectedItem.status}
                                type="text"
                                name="validationRule"
                                id="validationRule"
                                value={validationRule}
                                onChange={onChangeValidationRule}
                              />
                            </Form.Group>
                          </Col>
                        </React.Fragment>
                        : null
                      }
                    </React.Fragment>
                  }
                  <div className="d-flex justify-content-center w-100 ">
                    <Button className="save-continue"
                      onClick={onSubmitData}
                      disabled={validationType && disableFileds && selectedItem.status}
                    >Save</Button>
                    <Button className="ml-1 na-button"
                      onClick={onNaClick}
                      disabled={validationType === "Type 1" || (validationType && disableFileds && selectedItem.status)}
                    >NA</Button>
                  </div>
                </Row>
              </Card>
            }
          </Container>
          <ValidationTypeEdit
            show={showEditType}
            handleClose={handleClose}
            onEditSubmit={onEditSubmit}
            onSubmitSecondary={onSubmitSecondary}
            selectedType={selectedType}
          />
        </div>
      </div>
    </div>
  );
};

export default Validation;
