/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Select } from 'antd';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExport } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const DataJson = ({ flag }) => {
    const sideBarRef = useRef();
    const [tabFlag, setTabFlag] = useState();
    const [taxonomy, setTaxonomy] = useState('');
    const role = sessionStorage.role;

    const dispatch = useDispatch();
    const { Option } = Select;
    const dataJson = useSelector((state) => state.dataJson.dataJson);
    const controversyJson = useSelector((state) => state.controversyJson.controversyJson);
    const generateJson = useSelector((state) => state.generateJson.generateJson);
    const generateJsonError = useSelector((state) => state.generateJson.error);
    const downloadJson = useSelector((state) => state.downloadJson.downloadJson);
    const downloadJsonError = useSelector((state) => state.downloadJson.error);

    useEffect(() => {
        if (flag) {
            dispatch({ type: 'GET_CONTROVERSY_JSON_REQUEST' });
        } else {
            dispatch({ type: 'GET_DATA_JSON_REQUEST' });
        }
        tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Pending Companies');
    }, []);

    // To display Generate Json messege and refresh the page
    useEffect(() => {
        if (generateJson) {
            message.success(generateJson.message);
            flag ? dispatch({ type: 'GET_CONTROVERSY_JSON_REQUEST' }) : dispatch({ type: 'GET_DATA_JSON_REQUEST' });
            dispatch({ type: 'GENERATE_JSON_RESET' });
        } else if (generateJsonError) {
            message.error(generateJsonError.message);
            dispatch({ type: 'GENERATE_JSON_RESET' });
        }
    }, [generateJson, generateJsonError]);

    // To  Download Json file and show messege
    useEffect(() => {
        if (downloadJson) {
            message.success(downloadJson.message);
            var file = downloadJson && downloadJson.signedUrl;
            window.location.href = file;
            dispatch({ type: 'DOWNLOAD_JSON_RESET' });
        } else if (downloadJsonError) {
            message.error(downloadJsonError.message);
            dispatch({ type: 'DOWNLOAD_JSON_RESET' });
        }
    }, [downloadJson, downloadJsonError]);

    const onGenerateJson = (data) => {
        if (flag) {
            const payload = {
                companyId: data.companyId,
                type: 'controversy',
            }
            dispatch({ type: 'GENERATE_JSON_REQUEST', payload });
        } else {
            const payload = {
                companyId: data.companyId,
                year: data.year,
                type: 'data',
            }
            dispatch({ type: 'GENERATE_JSON_REQUEST', payload });
        }
    }

    const onDownloadJson = (data) => {
        const payload = {
            fileName: data.fileName
        }
        dispatch({ type: 'DOWNLOAD_JSON_REQUEST', payload });
    }

    const onTaxonomyChange = (taxonomy) => {
        setTaxonomy(taxonomy)
    }

    const pendingCompaniesTableData = (props) => {
        const tableRowData = (data) => flag ? data.map((data, index) => ({
            key: index,
            companyName: data.companyName,
            modifiedDate: moment(data.modifiedDate).format('DD/MM/YYYY') || new Date(data.modifiedDate).toDateString(),
            generate: <FontAwesomeIcon icon={faFileExport} size="lg" className="taxonomy-subset-icons" onClick={() => { onGenerateJson(data) }} />
        }))
            :
            data.map((data, index) => ({
                key: index,
                companyName: data.companyName,
                year: data.year,
                generate: <FontAwesomeIcon icon={faFileExport} size="lg" className="taxonomy-subset-icons" onClick={() => { onGenerateJson(data) }} />
            }))
        return {
            rowsData: tableRowData(props),
            columnsHeadData: flag ? [
                {
                    id: 'companyName',
                    align: 'center',
                    label: 'Company Name',
                    dataType: 'string',
                },
                {
                    id: 'modifiedDate',
                    align: 'center',
                    label: 'Modified Date',
                    dataType: 'date',
                },
                {
                    id: 'generate',
                    align: 'center',
                    label: 'Generate',
                    dataType: 'element',
                },
            ]
                :
                [
                    {
                        id: 'companyName',
                        align: 'center',
                        label: 'Company Name',
                        dataType: 'string',
                    },
                    {
                        id: 'year',
                        align: 'center',
                        label: 'Year',
                        dataType: 'date',
                    },
                    {
                        id: 'generate',
                        align: 'center',
                        label: 'Generate',
                        dataType: 'element',
                    },
                ],
            tableLabel: <div className="w-100">
                <Select className="choose-reports-taxonomy" placeholder="Choose Taxonomy" onChange={onTaxonomyChange} allowClear >
                    {activeData && activeData.filter((v, i, a) => a.findIndex(t => (t.taxonomyId === v.taxonomyId)) === i).map((data, index) => (
                        <Option key={index} value={data.taxonomyId}>{data.taxonomyName}</Option>
                    ))}
                </Select>
            </div>,
        };
    };

    const completedCompaniesTableData = (props) => {
        const tableRowData = (data) => flag ? data.map((data, index) => ({
            key: index,
            companyName: data.companyName,
            modifiedDate: moment(data.modifiedDate).format('DD/MM/YYYY') || new Date(data.modifiedDate).toDateString(),
            download: <FontAwesomeIcon icon={faDownload} size="lg" className="taxonomy-subset-icons" onClick={() => { onDownloadJson(data) }} />
        }))
            :
            data.map((data, index) => ({
                key: index,
                companyName: data.companyName,
                year: data.year,
                generatedDate: moment(data.modifiedDate).format('DD/MM/YYYY') || new Date(data.modifiedDate).toDateString(),
                download: <FontAwesomeIcon icon={faDownload} size="lg" className="taxonomy-subset-icons" onClick={() => { onDownloadJson(data) }} />
            }))
        return {
            rowsData: tableRowData(props),
            columnsHeadData: flag ? [
                {
                    id: 'companyName',
                    align: 'center',
                    label: 'Company Name',
                    dataType: 'string',
                },
                {
                    id: 'modifiedDate',
                    align: 'center',
                    label: 'Modified Date',
                    dataType: 'date',
                },
                {
                    id: 'download',
                    align: 'center',
                    label: 'Download',
                    dataType: 'element',
                },
            ]
                :
                [
                    {
                        id: 'companyName',
                        align: 'center',
                        label: 'Company Name',
                        dataType: 'string',
                    },
                    {
                        id: 'year',
                        align: 'center',
                        label: 'Year',
                        dataType: 'date',
                    },
                    {
                        id: 'generatedDate',
                        align: 'center',
                        label: 'Generated Date',
                        dataType: 'date',
                    },
                    {
                        id: 'download',
                        align: 'center',
                        label: 'Download',
                        dataType: 'element',
                    },
                ],
            tableLabel: <div className="w-100">
                <Select className="choose-reports-taxonomy" placeholder="Choose Taxonomy" onChange={onTaxonomyChange} allowClear >
                    {activeData && activeData.filter((v, i, a) => a.findIndex(t => (t.taxonomyId === v.taxonomyId)) === i).map((data, index) => (
                        <Option key={index} value={data.taxonomyId}>{data.taxonomyName}</Option>
                    ))}
                </Select>
            </div>,
        };
    };

    const tabLabelSets = role ==='Client Representative' ? [{ label: 'Completed Companies' }] : [
        { label: 'Pending Companies' },
        { label: 'Completed Companies' },
    ];

    const tabsRefs = useRef(tabLabelSets.map(() => React.createRef()));

    const tabsClickHandler = (event, label) => {
        tabsRefs.current.forEach((element) => {
            const target = element.current;
            target.classList.remove('tabs-label-count-wrap-active');
        });
        const target = event.currentTarget;
        target.classList.add('tabs-label-count-wrap-active');
        setTabFlag(label);
    };

    const dataJsoncompanies = dataJson && dataJson.data;
    const controversyJsoncompanies = controversyJson && controversyJson.data;

    const activeData = flag ? (tabFlag == 'Pending Companies' ? controversyJsoncompanies && controversyJsoncompanies.pendingCompaniesData : controversyJsoncompanies && controversyJsoncompanies.completedCompaniesData) :
        (tabFlag == 'Pending Companies' ? dataJsoncompanies && dataJsoncompanies.pendingCompaniesData : dataJsoncompanies && dataJsoncompanies.completedCompaniesData);

    const filterData = activeData && activeData.filter(val => val.taxonomyId == taxonomy);

    const tableData = (flag && role === 'Client Representative' ?  completedCompaniesTableData(filterData || []) :  tabFlag == 'Pending Companies' ? pendingCompaniesTableData(filterData || []) : completedCompaniesTableData(filterData || []));

    return (
        <div className="main">
            <SideMenuBar ref={sideBarRef} />
            <div className="rightsidepane">
                <Header title={flag ? 'Controversy JSON' : 'Data JSON'} />
                <div className="container-main">
                    <div className="reports-tabs-stack">
                        {tabLabelSets.map(({ label }, index) => (
                            <div key={label} ref={tabsRefs.current[index]} onClick={(event) => (tabsClickHandler(event, label))} className="tabs-label-count-wrap">
                                <div className="tabs-label">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <CustomTable tableData={tableData} showDatePicker />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataJson;