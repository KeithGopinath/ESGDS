/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Select } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { history } from '../../routes';

const Reports = (props) => {
  const sideBarRef = useRef();
  const [tabFlag, setTabFlag] = useState();
  const [completedCompanies, setCompletedCompanies] = useState([]);
  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [controversy, setContorversy] = useState([]);
  const [selectItem, setSelectItem] = useState(false);
  const [taxonomy, setTaxonomy] = useState('');
  const { Option } = Select;

  const dispatch = useDispatch();

  const compData = useSelector((state) => state.reports.reports);
  const loading = useSelector((state) => state.reports.isLoading);
  const pendingComp = compData && compData.pending;
  const completedComp = compData && compData.completed;
  const controversyData = compData && compData.controversy;

  useEffect(() => {
    dispatch({ type: 'GET_REPORTS_REQUEST' });
  }, []);

  useEffect(() => {
    tabFlag === 'Controversy' ? dispatch({ type: 'GET_CONTROVERSY_REPORTS_REQUEST' }) : '';
  }, [tabFlag]);

  // tabs activate
  useEffect(() => {
    const tabLabel = props.location.tabFlag && props.location.tabFlag;
    if (tabLabel) {
      if (tabLabel === 'Pending Companies') {
        tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Pending Companies');
      } else if (tabLabel === 'Completed Companies') {
        tabsRefs.current[1].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Completed Companies');
      } else if (tabLabel === 'Controversy') {
        tabsRefs.current[2].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Controversy');
      }
    } else {
      if (tabsRefs.current[0]) {
        tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Pending Companies');
      } else if (tabsRefs.current[1]) {
        tabsRefs.current[1].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Completed Companies');
      } else if (tabsRefs.current[2]) {
        tabsRefs.current[2].current.classList.add('tabs-label-count-wrap-active');
        setTabFlag('Controversy');
      }
    }
  }, []);

  // shifted the tabs checking data empty
  useEffect(() => {
    if (tabFlag === 'Pending Companies' && pendingComp) {
      setPendingCompanies(pendingComp);
    } else if (tabFlag === 'Completed Companies' && completedComp) {
      setCompletedCompanies(completedComp);
    } else if (tabFlag === 'Controversy' && controversyData) {
      setContorversy(controversyData);
    }
    setSelectItem(false);
  }, [tabFlag, compData]);

  const pendingCompaniesFilter = pendingCompanies && pendingCompanies.map(e => e.taxonomy).filter((val, id, array) => array.indexOf(val) == id);
  const completedCompaniesFilter = completedCompanies.map(e => e.taxonomy).filter((val, id, array) => array.indexOf(val) == id);
  const controversyTaxonomyFilter = controversy.map(e => e.taxonomy).filter((val, id, array) => array.indexOf(val) == id);

  // completed company table
  const CompletedCompanyTableData = (props) => {
    const tableRowData = (data) => data.filter(val => taxonomy ? val.taxonomy === taxonomy : val === val).map((data) => ({
      key: data.companyId,
      companyName: data.companyName ? { value: data.companyName, content: <div> <Checkbox checked={data.isChecked} onChange={() => onCompanyCheck(data, "complete")}>{data.companyName}</Checkbox> </div> } : { value: '', content: '' },
      completedDate: data.complatedDate ? moment(data.complatedDate).format('DD-MM-YYYY') : '-',
      clientRep: data.clientRrepresentative ? data.clientRrepresentative : '-',
      companyRep: data.companyRepresentative ? data.companyRepresentative : '-',
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'left',
          label: 'Company Name',
          dataType: 'stringSearchSortElement',
        },
        {
          id: 'completedDate',
          align: 'center',
          label: 'Completed Date',
          dataType: 'date',
        },
        {
          id: 'clientRep',
          align: 'center',
          label: 'Client Representative',
          dataType: 'string',
        },
        {
          id: 'companyRep',
          align: 'center',
          label: 'Company Representative',
          dataType: 'string',
        },
      ],
      tableLabel: <div className="w-100">
        <Select className="choose-reports-taxonomy" placeholder="Choose taxonomy" allowClear onChange={onTaxonomyChange} >{completedCompaniesFilter.map((data, id) => (
          <Option value={data} key={data[id]}>{data}</Option>
        ))}</Select>
      </div>,
    };
  };

  // checked companies list
  const onCompanyCheck = (data, status) => {
    if (status === "pending") {
      const newCompanies = [...pendingCompanies]
      const itemIndex = newCompanies.findIndex(item => (item.companyId === data.companyId && item.taxonomy === data.taxonomy));
      newCompanies[itemIndex].isChecked = !newCompanies[itemIndex].isChecked;
      setPendingCompanies(newCompanies);
      setSelectItem(newCompanies.filter(company => company.isChecked === true).length !== 0);
    } else if (status === "complete") {
      const newCompanies = [...completedCompanies]
      const itemIndex = newCompanies.findIndex(item => item.companyName === data.companyName);
      newCompanies[itemIndex].isChecked = !newCompanies[itemIndex].isChecked;
      setCompletedCompanies(newCompanies);
      setSelectItem(newCompanies.filter(company => company.isChecked === true).length !== 0);
    } else if (status === "controversy") {
      const newCompanies = [...controversy]
      const itemIndex = newCompanies.findIndex(item => item.companyName === data.companyName);
      newCompanies[itemIndex].isChecked = !newCompanies[itemIndex].isChecked;
      setCompletedCompanies(newCompanies);
      setSelectItem(newCompanies.filter(company => company.isChecked === true).length !== 0);
    }
  };

  // taxonomy filter
  const onTaxonomyChange = (e) => {
    setTaxonomy(e);
  };

  // view multiple companies task
  const viewCheckedCompanies = () => {
    if (tabFlag === 'Pending Companies') {
      const selectedCompanies = pendingCompanies.filter(company => company.isChecked === true);
      history.push({ pathname: '/tasklist', state: selectedCompanies, tabFlag: tabFlag, multiSelect: true });
    } else if (tabFlag === 'Completed Companies') {
      const selectedCompanies = completedCompanies.filter(company => company.isChecked === true);
      history.push({ pathname: '/tasklist', state: selectedCompanies, tabFlag: tabFlag, multiSelect: true });
    } else if (tabFlag === 'Controversy') {
      const selectedCompanies = controversy.filter(company => company.isChecked === true);
      history.push({ pathname: '/tasklist', state: selectedCompanies, tabFlag: tabFlag, multiSelect: true });
    }
  }

  // pending company table
  const PendingCompanyTableData = (props) => {
    const tableRowData = (data) => data.filter(val => taxonomy ? val.taxonomy === taxonomy : val === val).map((dataTaxonomy) => ({
      key: dataTaxonomy.companyId + dataTaxonomy.companyName,
      companyName: dataTaxonomy.companyName ? { value: dataTaxonomy.companyName, content: <div> <Checkbox checked={dataTaxonomy.isChecked} onChange={() => onCompanyCheck(dataTaxonomy, "pending")}>{dataTaxonomy.companyName}</Checkbox> </div> } : { value: '', content: '' },
      allocatedDate: dataTaxonomy.allocatedDate ? moment(dataTaxonomy.allocatedDate).format('DD-MM-YYYY') : '-',
      clientRep: dataTaxonomy.clientRrepresentative ? dataTaxonomy.clientRrepresentative : '-',
      companyRep: dataTaxonomy.companyRepresentative ? dataTaxonomy.companyRepresentative : '-',
    }))

    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'left',
          label: 'Company Name',
          dataType: 'stringSearchSortElement',
        },
        {
          id: 'allocatedDate',
          align: 'center',
          label: 'Allocated Date',
          dataType: 'date',
        },
        {
          id: 'clientRep',
          align: 'center',
          label: 'Client Representative',
          dataType: 'string',
        },
        {
          id: 'companyRep',
          align: 'center',
          label: 'Company Representative',
          dataType: 'string',
        },
      ],
      tableLabel: <div className="w-100">
        <Select className="choose-reports-taxonomy" placeholder="Choose taxonomy" allowClear onChange={onTaxonomyChange} >
          {pendingCompaniesFilter && pendingCompaniesFilter.map((data, id) => (
            <Option value={data} key={data[id]}>{data}</Option>
          ))}</Select>
      </div>,
    };
  };

  // Controversy
  const ControversyTable = (props) => {
    const tableRowData = (data) => data.filter(val => taxonomy ? val.taxonomy === taxonomy : val === val).map((e) => ({
      key: e.companyId + e.taskId,
      companyName: e.companyName ? { value: e.companyName, content: <div> <Checkbox checked={e.isChecked} onChange={() => onCompanyCheck(e, "controversy")}>{e.companyName}</Checkbox> </div> } : { value: '', content: '' },
      taskid: e.taskId ? e.taskId : '-',
      allocatedDate: e.allocatedDate ? moment(e.allocatedDate).format('DD-MM-YYYY') : '-',
    }))

    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'left',
          label: 'Company Name',
          dataType: 'stringSearchSortElement',
        },
        {
          id: 'taskid',
          align: 'center',
          label: 'Task ID',
          dataType: 'string',
        },
        {
          id: 'allocatedDate',
          align: 'center',
          label: 'Allocated Date',
          dataType: 'date',
        },
      ],
      tableLabel: <div className="w-100">
        <Select className="choose-reports-taxonomy" placeholder="Choose taxonomy" allowClear onChange={onTaxonomyChange} >{controversyTaxonomyFilter && controversyTaxonomyFilter[0] === null ? 'No Data' : controversyTaxonomyFilter && controversyTaxonomyFilter.map((data) => (
          <Option value={data.taxonomy} key={data.taxonomy}>{data.taxonomy}</Option>
        ))}</Select>
      </div>,
    };
  }

  const tabLabelSets = [
    { label: 'Pending Companies' },
    { label: 'Completed Companies' },
    { label: 'Controversy' },
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

  const selectTab = (tabFlag === "Controversy" ? ControversyTable(controversy && controversy) : tabFlag === 'Pending Companies' ? PendingCompanyTableData(pendingCompanies && pendingCompanies) : CompletedCompanyTableData(completedCompanies && completedCompanies));

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Reports" />
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
            <CustomTable tableData={selectTab} showDatePicker selectItem={selectItem} viewCheckedCompanies={viewCheckedCompanies} tabFlag={tabFlag} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
