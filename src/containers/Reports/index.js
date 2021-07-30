/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Select } from 'antd';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { history } from '../../routes';

const Reports = (props) => {
  const sideBarRef = useRef();
  const [tabFlag, setTabFlag] = useState();
  const [completedCompanies, setCompletedCompanies] = useState([]);
  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [selectItem, setSelectItem] = useState(false);
  const [taxonomy, setTaxonomy] = useState('');
  const { Option } = Select;

  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch({type:'GET_REPORTS_REQUEST'});
  },[]);

  // const compantData = useSelector((reports) => reports.reports); 

  const companyData = {
    completed: [
      {
        taxonomy: 'Rel Acute',
        companyName: 'Reliance ltd.',
        completedDate: '10-07-2021',
        companyRepresentative: 'Praveen',
        clientRrepresentative: 'Balaji',
        isChecked: false,
      },
      {
        taxonomy: 'Rel Acute1',
        companyName: 'Reliance',
        completedDate: '10-07-2021',
        companyRepresentative: 'Praveen',
        clientRrepresentative: 'Balaji',
        isChecked: false,
      },
      {
        taxonomy: 'HPCL Acute',
        companyName: 'HPCL',
        completedDate: '10-07-2021',
        companyRepresentative: 'Balaji',
        clientRrepresentative: 'Praveen',
        isChecked: false,
      }
    ],
    pending: [
      {
        taxonomy: 'IDEA Acute',
        companyName: 'IDEA Ltd.',
        completedDate: '10-07-2021',
        companyRepresentative: 'Praveen',
        clientRrepresentative: 'Jerin',
        isChecked: false,
      },
      {
        taxonomy: 'ONGC Acute',
        companyName: 'ONGC',
        completedDate: '10-07-2021',
        companyRepresentative: 'Balaji',
        clientRrepresentative: 'Praveen',
        isChecked: false,
      },
      {
        taxonomy: 'Indian Acute',
        companyName: 'Indian Gas',
        completedDate: '10-07-2021',
        companyRepresentative: 'Rajesh',
        clientRrepresentative: 'Gopi',
        isChecked: false,
      },
      {
        taxonomy: 'Indian Acute',
        companyName: 'Indian Oil',
        completedDate: '10-07-2021',
        companyRepresentative: 'Rajesh',
        clientRrepresentative: 'Gopi',
        isChecked: false,
      },
    ]
  }

  // tabs activate
  useEffect(() => {
    if (tabsRefs.current[0]) {
      tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Pending Companies');
    } else {
      tabsRefs.current[1].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Completed Companies');
    }
  }, []);

  // shifted the tabs checking data empty
  useEffect(() => {
    if (tabFlag === 'Pending Companies') {
      setPendingCompanies(companyData.pending);
    } else if (tabFlag === 'Completed Companies') {
      setCompletedCompanies(companyData.completed);
    }
    setSelectItem(false);
  }, [tabFlag]);

  const pendingCompaniesFilter = pendingCompanies.map(e => e.taxonomy).filter((val,id,array) => array.indexOf(val) == id);
  const completedCompaniesFilter = completedCompanies.map(e => e.taxonomy).filter((val,id,array) => array.indexOf(val) == id);

  // completed company table
  const CompletedCompanyTableData = (props) => {
    const tableRowData = (data) => data.filter(val => taxonomy ? val.taxonomy === taxonomy : val === val).map((data, id) => ({
      key:data.companyName+id,
      companyName: data.companyName ? <Checkbox checked={data.isChecked} onChange={() => onCompanyCheck(data, "complete")}>{data.companyName}</Checkbox> : '',
      completedDate: new Date().toDateString(),
      clientRep: data.clientRrepresentative,
      companyRep: data.companyRepresentative,
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'left',
          label: 'Company Name',
          dataType: 'element',
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
        <Select className="choose-reports-taxonomy" placeholder="Choose taxonomy" allowClear onChange={onTaxonomyChange} >{completedCompaniesFilter.map((data,id) => (
          <Option value={data} key={data[id]}>{data}</Option>
        ))}</Select>
      </div>,
    };
  };

  // checked companies list

  const onCompanyCheck = (data, status) => {
    if (status === "pending") {
      const newCompanies = [...pendingCompanies]
      const itemIndex = newCompanies.findIndex(item => item.companyName === data.companyName);
      newCompanies[itemIndex].isChecked = !newCompanies[itemIndex].isChecked;
      setPendingCompanies(newCompanies);
      setSelectItem(newCompanies.filter(company => company.isChecked === true).length !== 0);
    } else if (status === "complete") {
      const newCompanies = [...completedCompanies]
      const itemIndex = newCompanies.findIndex(item => item.companyName === data.companyName);
      newCompanies[itemIndex].isChecked = !newCompanies[itemIndex].isChecked;
      setPendingCompanies(newCompanies);
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
    }
  }

  // pending company table
  const PendingCompanyTableData = (props) => {
    
    const tableRowData = (data) => data.filter(val => taxonomy ? val.taxonomy === taxonomy : val === val).map((dataTaxonomy,id) => ({
            key:dataTaxonomy.companyName+dataTaxonomy.taxonomy,
            companyName: dataTaxonomy.companyName ? <Checkbox checked={dataTaxonomy.isChecked} onChange={() => onCompanyCheck(dataTaxonomy, "pending")}>{dataTaxonomy.companyName}</Checkbox> : '',
            allocatedDate: dataTaxonomy.completedDate,
            clientRep: dataTaxonomy.clientRrepresentative,
            companyRep: dataTaxonomy.companyRepresentative,
        }))

    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'left',
          label: 'Company Name',
          dataType: 'element',
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
          {pendingCompaniesFilter.map((data,id) => (
            <Option value={data} key={data[id]}>{data}</Option>
          ))}</Select>
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


  const selectTab = tabFlag === 'Pending Companies' ? PendingCompanyTableData(pendingCompanies) : CompletedCompanyTableData(completedCompanies);

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
            <CustomTable tableData={selectTab} showDatePicker selectItem={selectItem} viewCheckedCompanies={viewCheckedCompanies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
