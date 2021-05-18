/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@material-ui/core';


const NotificationPanel = () => {
    const [count, setCount] = useState();

    const notificationData = [
        {
            title: "Important message",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet,"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,ipsum dolor sit amet"
        },
        {
            title: "Important message",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit amet"
        },
    ]

    useEffect(() => {
        setCount(notificationData.length)
    }, []);

    const handler = () => {
        setCount(0)
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
                    {notificationData.map((item, index) => {
                        return (
                            <div>
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