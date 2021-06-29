/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Comment, List, Avatar } from 'antd';
import moment from 'moment';


const DataComment = (props) => {
  console.log(props);
  // const [showAllCmts, steShowAllCmts] = useState(false);
  const comments = props.reqCommentsList;

  // const latestCmts = comments.filter((e, i) => (i > comments.length - 3 && i < comments.length));
  return (
    // <React.Fragment>
    //   <List
    //     dataSource={latestCmts}
    //     header={<div style={{ display: 'flex', justifyContent: 'space-between' }}>{`${comments.length - latestCmts.length}+ ${(comments.length - latestCmts.length) > 1 ? 'replies' : 'reply'}`}<div style={{ cursor: 'pointer' }} onClick={() => steShowAllCmts(true)}>View more</div></div>}
    //     itemLayout="horizontal"
    //     renderItem={(eachCmt) => (
    //       <Comment
    //         author={<span style={{ color: '#2199c8' }}>{eachCmt.author}</span>}
    //         avatar={
    //           <Avatar style={{ backgroundColor: '#2199c8' }}>{eachCmt.author.split(' ').map((e) => (e[0])).join('')}</Avatar>}
    //         content={
    //           <p
    //             style={{
    //               background: 'rgb(222 222 222 / 34%)',
    //               padding: '10px',
    //               width: 'max-content',
    //               borderRadius: '5px',
    //             }}
    //           >{eachCmt.content}
    //           </p>}
    //         datetime={`${moment(eachCmt.datetime).fromNow()}, (${eachCmt.fiscalYear})`}
    //       />)}
    //   />
    //   <Modal
    //     title={`${comments.length > 1 ? 'All' : ''} ${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    //     centered
    //     visible={showAllCmts}
    //     footer={null}
    //     onCancel={() => steShowAllCmts(false)}
    //     width="100%"
    //     bodyStyle={{
    //       overflow: 'auto',
    //       maxHeight: '85vh',
    //     }}
    //   >
    //     {comments.map((eachCmt) => (<Comment
    //       author={<span style={{ color: '#2199c8' }}>{eachCmt.author}</span>}
    //       avatar={
    //         <Avatar style={{ backgroundColor: '#2199c8' }}>{eachCmt.author.split(' ').map((e) => (e[0])).join('')}</Avatar>}
    //       content={
    //         <p
    //           style={{
    //             background: 'rgb(222 222 222 / 34%)',
    //             padding: '10px',
    //             width: 'max-content',
    //             borderRadius: '5px',
    //           }}
    //         >{eachCmt.content}
    //         </p>}
    //       datetime={`${moment(eachCmt.datetime).fromNow()}, (${eachCmt.fiscalYear})`}
    //     />))}
    //   </Modal>
    // </React.Fragment>
    <List
      dataSource={comments}
      header={`${comments.length} ${(comments.length) > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(eachCmt) => (
        <Comment
          author={<span style={{ color: '#2199c8' }}>{eachCmt.author}</span>}
          avatar={
            <Avatar style={{ backgroundColor: '#2199c8' }}>{eachCmt.author.split(' ').map((e) => (e[0])).join('')}</Avatar>}
          content={
            <p
              style={{
                background: 'rgb(222 222 222 / 34%)',
                padding: '10px',
                width: 'max-content',
                borderRadius: '5px',
              }}
            >{eachCmt.content}
            </p>}
          datetime={`${moment(eachCmt.datetime).fromNow()}, (${eachCmt.fiscalYear})`}
        />)}
    />
  );
};

export default DataComment;
