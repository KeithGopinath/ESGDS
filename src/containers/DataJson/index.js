/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExport } from '@fortawesome/free-solid-svg-icons';

const DataJson = ({ flag }) => {
    const sideBarRef = useRef();
    const [tabFlag, setTabFlag] = useState();
    const [taxonomy, setTaxonomy] = useState('');

    const dispatch = useDispatch();
    const { Option } = Select;
    // const dataJson = useSelector((state) => state.dataJson.dataJson);
    // const controversyJson = useSelector((state) => state.controversyJson.controversyJson);

    useEffect(() => {
        tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Pending Companies');
    }, []);

    // useEffect(() => {
    //     if (flag) {
    //         dispatch({ type: 'GET_CONTROVERSY_JSON_REQUEST' });
    //     } else {
    //         dispatch({ type: 'GET_DATA_JSON_REQUEST' });
    //     }
    // }, []);

    const onTaxonomyChange = (taxonomy) => {
        setTaxonomy(taxonomy)
    }

    const onGenerateJson = (data) => {
        if (flag) {
            const controversyPayload = {
                taxonomyId: data.taxonomyId,
                companyId: data.companyId,
            }
            //dispatch({ type: 'GET_REPORTS_REQUEST' });
        } else {
            const dataPayload = {
                taxonomyId: data.taxonomyId,
                companyId: data.companyId,
                year: data.year
            }
            // dispatch({ type: 'GET_REPORTS_REQUEST' });
        }
    }

    const onDownloadJson = (data) => {
        if (flag) {
            const controversyPayload = {
                taxonomyId: data.taxonomyId,
                companyId: data.companyId,
            }
            //dispatch({ type: 'GET_REPORTS_REQUEST' });
        } else {
            const dataPayload = {
                taxonomyId: data.taxonomyId,
                companyId: data.companyId,
                year: data.year
            }
            // dispatch({ type: 'GET_REPORTS_REQUEST' });
        }
    }

    const pendingCompaniesTableData = (props) => {
        const tableRowData = (data) => flag ? data.map((data, index) => ({
            key: index,
            companyName: data.companyName,
            modifiedDate: new Date(data.modifiedDate).toDateString(),
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
            modifiedDate: new Date(data.modifiedDate).toDateString(),
            download: <FontAwesomeIcon icon={faDownload} size="lg" className="taxonomy-subset-icons" onClick={() => { onDownloadJson(data) }} />
        }))
            :
            data.map((data, index) => ({
                key: index,
                companyName: data.companyName,
                year: data.year,
                generatedDate: new Date(data.generatedDate).toDateString(),
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

    const tabLabelSets = [
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

    const dummyData = {
        "pendingCompaniesData": [
            {
                "companyId": "60bf7d08b09656fa36050322",
                "companyName": "Reliance LTD",
                "year": "2019-2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa36050322",
                "companyName": "Reliance LTD",
                "year": "2018-2019",
                "taxonomyId": "60bf7d08b09656fa36050323",
                "taxonomyName": "B-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa36050312",
                "companyName": "Adani Gas",
                "year": "2019-2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa36018975",
                "companyName": "Infosys",
                "year": "2018-2019",
                "taxonomyId": "60bf7d08b09656fa36050324",
                "taxonomyName": "C-Taxonomy"
            }
        ],
        "completedCompaniesData": [
            {
                "companyId": "60bf7d08b09656fa3j532789",
                "companyName": "Tata Power",
                "year": "2019-2020",
                "generatedDate": "Fri Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532788",
                "companyName": "Flipkart",
                "year": "2018-2019",
                "generatedDate": "Tue Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532787",
                "companyName": "Indian Oil",
                "year": "2019-2020",
                "generatedDate": "Wed Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050323",
                "taxonomyName": "B-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532786",
                "companyName": "Byjus",
                "year": "2018-2019",
                "generatedDate": "Fri Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050323",
                "taxonomyName": "B-Taxonomy"
            }
        ]
    }

    const dummyControversyData = {
        "pendingCompaniesData": [
            {
                "companyId": "60bf7d08b09656fa3j532781",
                "companyName": "Oppo",
                "modifiedDate": "Fri Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532782",
                "companyName": "Kitex",
                "modifiedDate": "Fri Aug 05 2020",
                "taxonomyId": "60bf7d08b09656fa36050323",
                "taxonomyName": "B-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532783",
                "companyName": "Spice Jet",
                "modifiedDate": "Fri Aug 03 2020",
                "taxonomyId": "60bf7d08b09656fa36050324",
                "taxonomyName": "C-Taxonomy"
            }
        ],
        "completedCompaniesData": [
            {
                "companyId": "60bf7d08b09656fa3j532784",
                "companyName": "Bajaj",
                "modifiedDate": "Fri Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532785",
                "companyName": "Maruti suzuki india Ltd",
                "modifiedDate": "Tue Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050322",
                "taxonomyName": "A-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532786",
                "companyName": "HDFC Bank",
                "modifiedDate": "Wed Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050323",
                "taxonomyName": "B-Taxonomy"
            },
            {
                "companyId": "60bf7d08b09656fa3j532787",
                "companyName": "Ambuja Cements",
                "modifiedDate": "Fri Aug 07 2020",
                "taxonomyId": "60bf7d08b09656fa36050323",
                "taxonomyName": "B-Taxonomy"
            }
        ]
    }

    const activeData = flag ? (tabFlag == 'Pending Companies' ? dummyControversyData.pendingCompaniesData : dummyControversyData.completedCompaniesData) :
        (tabFlag == 'Pending Companies' ? dummyData.pendingCompaniesData : dummyData.completedCompaniesData);

    const filterData = activeData && activeData.filter(val => val.taxonomyId == taxonomy);

    const tableData = tabFlag == 'Pending Companies' ? pendingCompaniesTableData(filterData) : completedCompaniesTableData(filterData);

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