import React from 'react';

const controversyJSONList = [
  {
    id: '001',
    dpCode: 'BUSN001',
    year: '2018-2019, 2019-2020',
    indicator: 'Biodiversity Controversies',
    avgResponseUnit: 'High', // it can high/medium/low/na
    currentData: [
      {
        dpCode: 'BUSN001',
        year: '2018-2019',
        controversyList: [
          {
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
            source: null,
          },
          {
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
            source: null,
          },
        ],
      },
      {
        dpCode: 'BUSN001',
        year: '2019-2020',
        controversyList: [
          {
            dpCode: 'BIOP002',
            fiscalYear: '2019-2020',
            status: 'unknown',
            description: 'Are there any reported controversies on biodiversity for the fiscal year?',
            dataType: 'text',
            textSnippet: 'Snippet',
            pageNo: '45',
            screenShot: '',
            response: 'High',
            uploadedFile: '',
            source: null,
          },
        ],
      },
    ],
  },
];
const Controversy = () => (controversyJSONList.map((e) => (<div>{e.id}</div>)));

export default Controversy;
