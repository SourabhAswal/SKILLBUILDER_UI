// import React from 'react';
// import NotificationService from './NotificationService.js';
// import './Notification.css'
// import Alert from 'react-s-alert';
// import Encryption from '../Routing/Encryption.jsx';

// export default class Notification extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             notifyList: [],
//             activeNotification: {
//                 id: null,
//                 postId: null,
//                 from_username: '',
//                 to_username: '',
//                 message: '',
//                 read: false
//             },
//             username: JSON.stringify(localStorage.getItem("username")),
//             foreignKey: null,
//         }

//         this.fetchNotification = this.fetchNotification.bind(this)
//         this.changeRead = this.changeRead.bind(this)
//     };

//     componentWillMount() {
//         // console.log(this.props.arr)
//         this.fetchNotification()
//     }

//     fetchNotification() {
//         NotificationService.fetchNotification()
//             .then(data =>
//                 this.setState({
//                     notifyList: JSON.parse(JSON.stringify(data))
//                 })
//             )

//     }

//     changeRead(notify) {
//         this.setState({
//             activeNotification: {
//                 ...this.state.activeNotification,
//                 id: JSON.parse(JSON.stringify(notify)).id,
//                 postId: JSON.parse(JSON.stringify(notify)).discussion,
//                 from_username: JSON.parse(JSON.stringify(notify)).from_username,
//                 to_username: JSON.parse(JSON.stringify(notify)).to_username,
//                 message: JSON.parse(JSON.stringify(notify)).message,
//                 read: true,
//             }
//         }, () => {
//             // console.log(this.state.activeNotification.postId);
//             let formData = new FormData();
//             formData.append("id", this.state.activeNotification.id);
//             formData.append("postId", this.state.activeNotification.postId)
//             formData.append("from_username", this.state.activeNotification.from_username);
//             formData.append("to_username", this.state.activeNotification.to_username);
//             formData.append("message", this.state.activeNotification.message);
//             formData.append("read", this.state.activeNotification.read);
//             NotificationService.editNotification(formData, this.state.activeNotification.id)
//                 .then((response) => {
//                     this.fetchNotification()
//                     this.setState({
//                         activeNotification: {
//                             id: null,
//                             postId: null,
//                             from_username: '',
//                             to_username: '',
//                             message: '',
//                             read: false
//                         }
//                     })
//                 }).catch(error => {
//                     Alert.warning("Some problem occured !!!")
//                 })
//         })
//     }

//     render() {

//         var self = this
//         var notifies = Array.from(this.state.notifyList)
//         var count = 0 //notifies.length
//         notifies.map(function (notify, index) {
//             if (notify.read === false && self.state.username === notify.to_username && localStorage.getItem("role") === 'Student')
//                 count++
//         })

//         return (
//             <div>
//                 <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown"
//                     aria-haspopup="true" aria-expanded="false">
//                     <i class="fas fa-envelope fa-fw"></i>
//                     <span class="badge badge-warning badge-counter">{count}</span>
//                 </a>
//                 <div class="dropdown-list dropdown-menu dropdown-menu-lg-right shadow animated--grow-in"
//                     aria-labelledby="messagesDropdown">
//                     <h6 class="dropdown-header">
//                         Message Center
//                     </h6>
//                     <div class='notificationMsgCard'>
//                         {notifies.map(function (notify, index) {
//                             if (notify.to_username === self.state.username && localStorage.getItem("role") === 'Student') {
//                                 return (
//                                     <div class="card pb-1">
//                                         <a href="#" class="dropdown-item align-items-left" onClick={() => self.changeRead(notify)}>
//                                             <div className="d-flex flex-column">
//                                                 <div class="status-indicator small">{notify.name}</div>
//                                                 {notify.read === false ?
//                                                     <div style={{ backgroundColor: "lightblue" }}>{notify.message}</div> :
//                                                     <div>{notify.message}</div>}
//                                             </div>
//                                         </a>
//                                     </div>
//                                 )
//                             }
//                             // else {
//                             //     return (
//                             //         <div>No messages to show</div>
//                             //     )
//                             // }
//                         })}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
