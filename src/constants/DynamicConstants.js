//  FIELDS REQ
/* Number, Text, TextArea, Select, Date, Image, Select*, Static* */
export default {
  dynamicFields: [
    {
      fieldName: 'SelectFieldName',
      name: 'Select Label',
      value: '001',
      inputType: 'Select',
      inputValues: [
        {
          value: '001', label: 'Select 1',
        },
        {
          value: '002', label: 'Select 2',
        },
        {
          value: '003', label: 'Select 3',
        },
      ],
    },
    {
      fieldName: 'StaticFieldName',
      name: 'Static Label',
      value: 'Static Value Here',
      inputType: 'Static',
      inputValues: [],
    },
    {
      fieldName: 'TextFieldName',
      name: 'Text Label',
      value: 'Text Value Here',
      inputType: 'Text',
      inputValues: [],
    },
    // {
    //   fieldName: 'DateFieldName',
    //   name: 'Date Label',
    //   value: '2021-08-02T07:33:52.020Z',
    //   inputType: 'Date',
    //   inputValues: [],
    // },
    {
      fieldName: 'TextAreaFieldName',
      name: 'TextArea Label',
      value: 'TextArea',
      inputType: 'TextArea',
      inputValues: [],
    },
    // {
    //   fieldName: 'NumberFieldName',
    //   name: 'Number Label',
    //   value: 56,
    //   inputType: 'Number',
    //   inputValues: [],
    // },
    // {
    //   fieldName: 'ImageFieldName',
    //   name: 'Image Label',
    //   value: 'https://media-exp1.licdn.com/dms/image/C4D0BAQHKpyO6vKHnpw/company-logo_200_200/0/1607960481276?e=2159024400&v=beta&t=ezbk5BVScq4vuRFa8PhqfVvFoBP8ABLmG5goz5GH2Nk',
    //   inputType: 'Image',
    //   inputValues: [],
    // },
  ],
};
