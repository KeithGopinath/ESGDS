/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { Col } from 'react-bootstrap';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import DataAccordian from '../DataPage/DataAccordian';
import { DataSheetComponent } from '../DataPage/DataSheet';

const reqData = {
  dpCode: 'BIOP002',
  fiscalYear: '2018-2019',
  status: 'unknown',
  description: 'Are there any reported controversies on biodiversity for the fiscal year?',
  dataType: 'text',
  textSnippet: 'Snippet',
  pageNo: '45',
  screenShot: '',
  response: 'High',
  uploadedFile: '',
  source: { sourceName: 'The Hindu', url: 'https://admin.mrpl.co.in/img/UploadedFiles/AnnualReport/Files/1c7d3b3b1d7f4c65b46e50c3422a1bdb.pdf', publicationDate: 'Tue May 04 2017' },
};
const reqData2 = {
  dpCode: 'BIOP002',
  fiscalYear: '2018-2019',
  status: 'unknown',
  description: 'Are there any reported controversies on biodiversity for the fiscal year?',
  dataType: 'text',
  textSnippet: '',
  pageNo: '',
  screenShot: '',
  response: '',
  uploadedFile: '',
  source: null,
};
const ControversyPage = (props) => {
  const sideBarRef = useRef();
  const isNew = props.location.state.page === 'new';
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
            <DataAccordian header="Current" isActive >
              <DataSheetComponent
                reqData={isNew ? reqData2 : reqData}
              />
            </DataAccordian>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default ControversyPage;
