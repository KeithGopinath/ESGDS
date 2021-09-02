/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { history } from '../../routes';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@material-ui/core';

const NotificationPanel = () => {
    const [count, setCount] = useState();
    const [flag, setFlag] = useState(true);

    const dispatch = useDispatch();
    const notificationData = useSelector((state) => state.notification.message);
    const loginDetails = useSelector((state) => state.login.login);
    const otpDetails = useSelector((state) => state.otp.otp);

    const userId = otpDetails && otpDetails.user._id || loginDetails && loginDetails.user._id || sessionStorage.userId;

    useEffect(() => {
        dispatch({ type: 'NOTIFICATION_REQUEST', userId });
        setTimeout(() => {
            setFlag(!flag);
        }, 300000);
    }, [flag]);

    useEffect(() => {
        setCount(notificationData && notificationData.count);
    }, [notificationData]);

    const handler = () => {
        setCount(0)
    }
    const onHandleNotification =(arg)=> {     
        console.log(arg, 'arg notification');   
        const splitingString = arg.content.split("-");
        const taskNumber = splitingString[splitingString.length - 1];
        dispatch({type:"NOTIFICATION_TYPE", payload: taskNumber.trim() })
        history.push({
            pathname: arg.notificationType,
            state: arg.notificationTitle
          });
      
        }
    
    const scrollStyle = { height: 620, width: 400 }

    return (
        <CDropdown className="c-header-nav-item mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <Badge
                    badgeContent={count}
                    color="error"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    invisible={count ? false : true} >
                    <FontAwesomeIcon
                        className="bellicon"
                        icon={faBell}
                        onClick={handler} />
                </Badge>
            </CDropdownToggle>
            <CDropdownMenu className="pt-body" placement="bottom-end">
                <CDropdownItem header tag="div" color="danger">
                    <strong className="panel-header">You have {notificationData && notificationData.count > 0 ? notificationData && notificationData.count : 'no'} messages to read</strong>
                </CDropdownItem>
                <Scrollbars thumbSize={500} style={scrollStyle}>
                    {notificationData && notificationData.rows.map((item, index) => {
                        return (
                            <div key={index} onClick={() => { onHandleNotification(item) }}>
                                <CDropdownItem href="#">
                                    <div className="message">
                                        <div className="text-truncate font-weight-bold">
                                            <span className="fa fa-exclamation text-danger"></span>{item.notificationTitle}
                                        </div>
                                        <div className="notification-message">
                                            {item.content}
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