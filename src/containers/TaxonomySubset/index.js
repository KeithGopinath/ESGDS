/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload, faEye } from '@fortawesome/free-solid-svg-icons';

const TaxonomySubset = () => {
  const sideBarRef = useRef();

  const subsetTaxonomyTableData = (props) => {
    const tableRowData = (data) => data.map(({ name, id }) => ({
      name,
      viewTaxonomy: <FontAwesomeIcon icon={faEye} size="lg" />,
      downloadTaxonomy: <FontAwesomeIcon icon={faDownload} size="lg" />,
      uploadTaxonomy: <FontAwesomeIcon icon={faUpload} size="lg" />,
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [{
        id: 'name',
        align: 'left',
        label: 'Name',
        dataType: 'string',
      },
      {
        id: 'viewTaxonomy',
        align: 'center',
        label: 'View',
        dataType: 'element',
      },
      {
        id: 'downloadTaxonomy',
        align: 'center',
        label: 'Download',
        dataType: 'element',
      },
      {
        id: 'uploadTaxonomy',
        align: 'center',
        label: 'Upload',
        dataType: 'element',
      },
      ],
      tableLabel: 'Taxonomy Subsets',
    };
  };

  const taxonomyList = [
    {
      name: 'TaxonomyOne',
      id: '1',
    },
    {
      name: 'TaxonomyTwo',
      id: '2',
    },
    {
      name: 'TaxonomyThree',
      id: '3',
    },
  ];

  const subsetTableData = subsetTaxonomyTableData(taxonomyList);

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="Subsets" />
          <div className="container-main">
            <div>
              <CustomTable tableData={subsetTableData} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaxonomySubset;
