/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload, faEye } from '@fortawesome/free-solid-svg-icons';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import UploadTaxonomy from '../../containers/UploadTaxonomy';
import Taxonomy from '../../containers/Taxonomy';


const TaxonomySubset = () => {
  const sideBarRef = useRef();
  const [show, setShow] = useState(false);
  const [showList, setShowList] = useState(false);
  const [subsetName, setSubsetName] = useState('');
  const [subsetId, setsubsetId] = useState('');
  const [subsetList, setSubsetList] = useState('');
  const [taxonomyName, setTaxonomyName] = useState('');
  const [downloadSubset, setDownloadSubset] = useState(false);

  const dispatch = useDispatch();
  const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);
  const loading = useSelector((state) => state.clientTaxonomy.isLoading);
  const subsetTaxonomyFromStore = useSelector((state) => state.subsetTaxonomyDownload);
  const subsetTaxonomyDownloadData = subsetTaxonomyFromStore && subsetTaxonomyFromStore.subsetTaxonomy ? subsetTaxonomyFromStore.subsetTaxonomy.data : [];

  useEffect(() => {
    dispatch({ type: 'ClientTaxonomy_REQUEST' });
  }, []);

  useEffect(() => {
    if (subsetTaxonomyFromStore.subsetTaxonomy && !subsetTaxonomyFromStore.error && !subsetTaxonomyFromStore.isLoading && subsetTaxonomyDownloadData && downloadSubset) {
      const fileName = taxonomyName;
      const currentData = [];
      const obj = {};
      taxonomyData && taxonomyData.rows.filter((val) => val.taxonomyName == taxonomyName).map((data) => (
        data.headers.filter((val) => val.inputType == 'Static').map((value) => {
          obj[value.name] = '';
        })
      ));
      currentData.push(obj);
      const downloadableData = subsetTaxonomyDownloadData.length > 0 ? subsetTaxonomyDownloadData : currentData;
      const ws = XLSX.utils.json_to_sheet(downloadableData);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      setDownloadSubset(false);
      message.success(subsetTaxonomyFromStore.subsetTaxonomy ? subsetTaxonomyFromStore.subsetTaxonomy.message : 'Downloaded Successfully.');
    } else if (subsetTaxonomyFromStore.error) {
      message.error(subsetTaxonomyFromStore.error.message ? subsetTaxonomyFromStore.error.message : 'Something went wrong, try again later.');
      setDownloadSubset(false);
    }
  }, [subsetTaxonomyFromStore]);

  // File handling
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const onViewTaxonomy = (id, taxonomyName) => {
    const temp = [];
    let obj = {};
    taxonomyData && taxonomyData.rows.filter((val) => val._id == id).map((data) => (
      data.headers.map((value) => {
        obj = {};
        obj.name = value.name;
        obj.id = value.id;
        temp.push(obj);
      })
    ));
    setSubsetList(temp);
    setShowList(true);
    setTaxonomyName(taxonomyName);
  };

  const onDownloadTaxonomy = (id, taxonomyName) => {
    // const currentData = [];
    // const obj = {};
    dispatch({
      type: 'SUBSET_TAXONOMY_DOWNLOAD_GET_REQUEST',
      subsetTaxonomyId: id,
    });
    setTaxonomyName(taxonomyName);
    setDownloadSubset(true);
    // taxonomyData && taxonomyData.rows.filter((val) => val._id == id).map((data) => (
    //   data.headers.filter((val) => val.inputType == 'Static').map((value) => {
    //     obj[value.name] = '';
    //   })
    // ));
    // currentData.push(obj);
    // console.log(currentData);
    // const fileName = taxonomyName;
    // const ws = XLSX.utils.json_to_sheet(currentData);
    // const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // const data = new Blob([excelBuffer], { type: fileType });
    // FileSaver.saveAs(data, fileName + fileExtension);
  };

  const onUploadTaxonomy = (id) => {
    taxonomyData && taxonomyData.rows.filter((val) => val._id == id).map((data) => {
      setSubsetName(data.taxonomyName);
      setsubsetId(data._id);
    });
    handleShow();
  };

  const subsetTaxonomyTableData = (props) => {
    const tableRowData = (data) => data.map(({ name, id }) => ({
      key: id,
      name,
      viewTaxonomy: <FontAwesomeIcon key={id} icon={faEye} size="lg" className="taxonomy-subset-icons" onClick={() => { onViewTaxonomy(id, name); }} />,
      downloadTaxonomy: <FontAwesomeIcon icon={faDownload} size="lg" className="taxonomy-subset-icons" onClick={() => { onDownloadTaxonomy(id, name); }} />,
      uploadTaxonomy: <FontAwesomeIcon icon={faUpload} size="lg" className="taxonomy-subset-icons" onClick={() => { onUploadTaxonomy(id); }} />,
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
      // tableLabel: 'Taxonomy Subsets',
    };
  };

  const clientTaxonomyData = taxonomyData && taxonomyData.rows.map((data) => ({
    name: data.taxonomyName,
    id: data._id,
  }));

  const subsetTableData = clientTaxonomyData ? subsetTaxonomyTableData(clientTaxonomyData) : subsetTaxonomyTableData([]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleListClose = () => {
    setShowList(false);
  };

  return (
    <React.Fragment>
      {showList ?
        <Taxonomy subsetList={subsetList} showList={showList} handleListClose={handleListClose} taxonomyName={taxonomyName} />
        :
        <div className="main">
          <SideMenuBar ref={sideBarRef} />
          <div className="rightsidepane">
            <Header title="Subset Taxonomy" />
            <div className="container-main">
              <div>
                <CustomTable tableData={subsetTableData} isLoading={loading} />
                <UploadTaxonomy show={show} handleClose={handleClose} subsetName={subsetName} subsetId={subsetId} />
              </div>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default TaxonomySubset;
