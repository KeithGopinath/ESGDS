/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@material-ui/core';


const NotificationPanel = () => {
    const [count, setCount] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const notificationData = [
        {
            title: "Important message",
            message: "hari has raised sla request for - 3 days - DT98",
            path: "/tasklist"
        },
        {
            title: "Lorem ipsum dolor sit amet2",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet",
            path:"/createtask"
        },
        {
            title: "Lorem ipsum dolor sit amet3",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet",
            path:"/createtask"
        },
        {
            title: "Lorem ipsum dolor sit amet4",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,ipsum dolor sit amet",
            path:"/createtask"
        },
        {
            title: "Important message1",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ipsum dolor sit amet",
            path:"/createtask"
        },
        {
            title: "Lorem ipsum dolor sit amet5",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ipsum dolor sit amet",
            path:"/createtask"
        },
        {
            title: "Lorem ipsum dolor sit amet6",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet",
            path:"/createtask"
        },
        // {
        //     title: "Lorem ipsum dolor sit amet7",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet8",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet9",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet10",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet11",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet12",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet13",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet14",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet15",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
        // {
        //     title: "Lorem ipsum dolor sit amet16",
        //     message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        // },
    ]

    useEffect(() => {
        setCount(notificationData.length)
    }, []);

    const handler = () => {
        setCount(0)
    }
    const onHandleNotification =(arg)=> {
        console.log(arg, 'onHandleNotification');
        const splitingString = arg.message.split("-");
        const taskNumber = splitingString[splitingString.length - 1];
        dispatch({type:"NOTIFICATION_TYPE", payload: taskNumber })
        history.push({
            pathname: arg.path,
          })

    }
    const scrollStyle = { height: 620, width: 400 }

    return (
        <CDropdown className="c-header-nav-item mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <Badge badgeContent={count} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <FontAwesomeIcon className="bellicon" icon={faBell} onClick={handler} />
                </Badge>
            </CDropdownToggle>
            <CDropdownMenu className="pt-body" placement="bottom-end">
                <CDropdownItem header tag="div" color="danger">
                    <strong className="panel-header">You have {notificationData.length} messages to read</strong>
                </CDropdownItem>
                <Scrollbars thumbSize={500} style={scrollStyle}>
                    {notificationData.map((item) => {
                        return (
                            <div key={item.title} onClick={()=>{onHandleNotification(item)}}>
                                <CDropdownItem href="#">
                                    <div className="message">
                                        <div className="text-truncate font-weight-bold">
                                            <span className="fa fa-exclamation text-danger"></span>{item.title}
                                        </div>
                                        <div className="notification-message">
                                            {item.message}
                                        </div>
                                    </div>
                                </CDropdownItem>
                            </div>
                        );
                    })
                    }
                </Scrollbars>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default NotificationPanel;