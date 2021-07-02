/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import SideMenuBar from '../../components/SideMenuBar';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';

const GroupView = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(20);
  const history = useHistory();
  const searchtheme = createMuiTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });

  const grpList = [
    {
      grpName:"group1",
      grpAdmin:{
         value:"Praveen",
         label:"Praveen"
      },
      grpMembers:[
         {
            userDetail:{
               value:"24dgdsf4",
               label:"user1"
            },
            roleDetails:{
               primaryRole:{
                  value:"dfgvsf4",
                  label:"analyst"
               },
               secRole:[
                  {
                     value:"dfgvsf4",
                     label:"qa"
                  },
                  {
                     value:"dfgvsf4",
                     label:"emp"
                  }
               ]
            }
         },
         {
          userDetail:{
             value:"24dsdgdsf4",
             label:"user2"
          },
          roleDetails:{
             primaryRole:{
                value:"dfgvsf4",
                label:"analyst"
             },
             secRole:[
                {
                   value:"dfgvsf4",
                   label:"qa"
                },
                {
                   value:"dfgvsf4",
                   label:"emp"
                }
             ]
          }
       },
         
        
      ],
      "assignedBatches":[]
   },
   {
    grpName:"group1",
    grpAdmin:{
       value:"Praveen",
       label:"Praveen"
    },
    grpMembers:[
       {
          userDetail:{
             value:"24dgdsf4",
             label:"user1"
          },
          roleDetails:{
             primaryRole:{
                value:"dfgvsf4",
                label:"analyst"
             },
             secRole:[
                {
                   value:"dfgvsf4",
                   label:"qa"
                },
                {
                   value:"dfgvsf4",
                   label:"emp"
                }
             ]
          }
       },
       {
        userDetail:{
           value:"24dsdgdsf4",
           label:"user2"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
       
      
    ],
    "assignedBatches":[]
 },
 {
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
{
  grpName:"group1",
  grpAdmin:{
     value:"Praveen",
     label:"Praveen"
  },
  grpMembers:[
     {
        userDetail:{
           value:"24dgdsf4",
           label:"user1"
        },
        roleDetails:{
           primaryRole:{
              value:"dfgvsf4",
              label:"analyst"
           },
           secRole:[
              {
                 value:"dfgvsf4",
                 label:"qa"
              },
              {
                 value:"dfgvsf4",
                 label:"emp"
              }
           ]
        }
     },
     {
      userDetail:{
         value:"24dsdgdsf4",
         label:"user2"
      },
      roleDetails:{
         primaryRole:{
            value:"dfgvsf4",
            label:"analyst"
         },
         secRole:[
            {
               value:"dfgvsf4",
               label:"qa"
            },
            {
               value:"dfgvsf4",
               label:"emp"
            }
         ]
      }
   },
     
    
  ],
  "assignedBatches":[]
},
  
  ]
  

  const groupCount =  grpList.length;
  

  const cardPerPage = 20;
  const onhandlePage = (e, page) => {
    const minValue = (page - 1) * cardPerPage;
    const maxValue = page * cardPerPage;
    console.log(minValue, maxValue, 'min max cal val');
    setmin(minValue);
    setmax(maxValue);
  };
  const onSearchBatch = (data) => {
    const searchData = data.target.value;
    setSearchQuery(searchData);

  };
  const onhandeleGrpPage = () => {
    history.push("/groups");
  }
  const searchfilter = (search, card) => {
    const filteredData = card.filter((e) => {
      if ((e.grpName.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredData;
  };
  const calculateCount = grpList && (searchQuery ? searchfilter(searchQuery, grpList).length : groupCount) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = grpList && (searchQuery ? searchfilter(searchQuery, grpList) : grpList).slice(min, max).map(({ grpName }) => (
    <Col lg={3} md={6}>
      <Card className="batch-card batchbox" key={grpName} >
        <ListItemText primary={grpName} />
      </Card>
    </Col>
  ));

  const sideBarRef = useRef();
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title="Group List" />
        <div className="container-main">
          <Container className="wrapper">
            <div className="head-tab">
              <div>
                <ThemeProvider theme={searchtheme}>
                  <TextField
                    placeholder="search"
                    style={{ padding: '20px' }}
                    autoComplete="off"
                    onChange={onSearchBatch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faSearch} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </ThemeProvider>
              </div>
              <div>
                <Button variant="primary" className="imp-btn" onClick={onhandeleGrpPage}>
                  <div>Create Group</div>
                </Button>
              </div>
            </div>
            <div className="view-min-height">
              <Row >
                {batchlist}
              </Row>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="batch-footer">
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default GroupView;
