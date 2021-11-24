import React from 'react'
import './Discussion.css'
import DiscussionService from './DiscussionService';
import Alert from 'react-s-alert';
import ReactHtmlParser from 'react-html-parser';
import * as ReactQuill from 'react-quill';
import Encryption from '../Routing/Encryption';
import LoadingIndicator from '../../common/LoadingIndicator';
require('react-quill/dist/quill.snow.css');

export default class Discussion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            name: '',
            // to redirect
            redirect: false,
            // for posts
            postList: [],
            activePosts: {
                id: null,
                courseId: JSON.parse(localStorage.getItem("course_id")),
                title: '',
                body: '',
            },
            foreignKey: null,
            // for comments
            commentList: [],
            activeComments: {
                id: null,
                postId: null,
                comment: '',
            },
            likeList: [],
            likeUserId: [],
            likeDic: {},
            activeLike: {
                id: null,
                postId: null,
                from_username: '',
                to_username: '',
                message: '',
                read: false
            },
            // to edit posts and comments
            editing: false,
            currentPost: [],
            commentState: false,
            commentId: null,
            showDiv: false,
            loader: false,
        }

        // this.getCookie = this.getCookie.bind(this)

        this.fetchPost = this.fetchPost.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleBody = this.handleBody.bind(this)
        this.handlePost = this.handlePost.bind(this)
        this.handleEdit = this.handleEdit.bind(this)

        this.fetchComment = this.fetchComment.bind(this)
        this.handleComment = this.handleComment.bind(this)
        this.handleForeignKey = this.handleForeignKey.bind(this)
        this.handleCommentPost = this.handleCommentPost.bind(this)
        this.handleCommentEdit = this.handleCommentEdit.bind(this)

        this.fetchLike = this.fetchLike.bind(this)
        this.changeLike = this.changeLike.bind(this)
    };

    async componentDidMount() {

        // this.fetchComment()
        // this.fetchLike()
        // this.props.userAuthenticated(true);
        const encryptedData = localStorage.getItem("encrypted")
        await this.setState({
            userId: new Encryption().decrypt(encryptedData).userId,
            name: new Encryption().decrypt(encryptedData).first_name
            // + " " + new Encryption().decrypt(encryptedData).last_name
        })
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });

    }


    // getCookie(name) {
    //     var cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         var cookies = document.cookie.split(';');
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = cookies[i].trim();
    //             // Does this cookie string begin with the name we want?
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }

    fetchPost() {
        if (this.state.showDiv) {
            this.setState({ showDiv: false })
        }
        else {
            this.setState({ loader: true })
            DiscussionService.fetchPost(JSON.parse(localStorage.getItem("course_id")))
                .then((data) => {
                    this.setState({
                        showDiv: true,
                        postList: data,
                        loader: false,
                    })
                })
        }
    }

    fetchLike() {
        DiscussionService.fetchLike()
            .then(data =>
                this.setState({
                    likeList: data
                }))
    }

    handleTitle(e) {
        var value = e.target.value
        this.setState({
            activePosts: {
                ...this.state.activePosts,
                title: value
            }
        })
    }

    handleBody(e) {
        this.setState({
            activePosts: {
                ...this.state.activePosts,
                body: e
            }
        })
    }

    handlePost(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append("course", JSON.parse(localStorage.getItem("course_id")));
        formData.append("title", this.state.activePosts.title);
        formData.append("body", this.state.activePosts.body)
        formData.append("name", this.state.name);
        formData.append("user", this.state.userId);
        if (this.state.editing == true) {
            formData.append("id", this.state.activePosts.id);
            this.setState({
                editing: false,
                showDiv: false,
            })
            DiscussionService.editPost(formData, this.state.activePosts.id)
                .then((response) => {
                    if (response.success === 'True') {
                        // this.fetchPost()
                        Alert.success(response.message)
                        this.setState({
                            activePosts: {
                                id: null,
                                courseId: JSON.parse(localStorage.getItem("course_id")),
                                title: '',
                                body: '',
                            }
                        }, () => { this.fetchPost() })
                    }
                    else
                        Alert.warning(response.message)
                }).catch(error => {
                    Alert.warning("Some problem occured !!!")
                })
        } else {
            DiscussionService.createPost(formData)
                .then((response) => {
                    if (response.success === 'True') {
                        Alert.success(response.message)
                        this.setState({
                            activePosts: {
                                id: null,
                                courseId: JSON.parse(localStorage.getItem("course_id")),
                                title: '',
                                body: '',
                                showDiv: false,
                            }
                        }, () => { this.fetchPost() })
                    }
                    else
                        Alert.warning(response.message)
                }).catch(error => {
                    Alert.warning("Some problem occured !!!")
                })
        }
    }

    handleEdit(post) {
        this.setState({
            activePosts: post,
            editing: true,
        })
    }

    handleDelete(post) {
        DiscussionService.deletePost(post.id).then((response) => {
            if (response.success === 'True') {
                Alert.success(response.message)
                this.setState({ showDiv: false }, () => { this.fetchPost() })
            }
            else
                Alert.warning(response.message)
        })
    }

    fetchComment() {
        DiscussionService.fetchComment()
            .then(data =>
                this.setState({
                    commentList: data
                }))
    }

    handleComment(e) {
        var value = e.target.value
        this.setState({
            activeComments: {
                ...this.state.activeComments,
                comment: value,
            }
        })
    }

    handleForeignKey(post) {
        this.setState({
            activeComments: {
                ...this.state.activeComments,
                postId: post.id,
            },
            commentState: true,
        })
    }

    handleCommentPost(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append("comment", this.state.activeComments.comment);
        formData.append("name", this.state.name);
        formData.append("discussion", this.state.activeComments.postId);
        formData.append("user", this.state.userId);
        if (this.state.editing === true) {
            formData.append("id", this.state.activeComments.id);
            // this.setState({
            //     editing: false,
            //     showDiv: false,
            // })
            DiscussionService.editComment(formData, this.state.activeComments.id)
                .then((response) => {
                    if (response.success === 'True') {
                        Alert.success(response.message)
                        this.setState({
                            activeComments: {
                                id: null,
                                postId: null,
                                comment: '',
                            },
                            editing: false,
                            showDiv: false,
                            commentState: false,
                        }, () => { this.fetchPost() })
                    }
                    else
                        Alert.warning(response.message)
                }).catch(error => {
                    Alert.warning("Some problem occured !!!")
                })
        }
        else {
            DiscussionService.createComment(formData)
                .then((response) => {
                    if (response.success === 'True') {
                        Alert.success(response.message)
                        this.setState({
                            activeComments: {
                                id: null,
                                postId: null,
                                comment: '',
                            },
                            commentState: false,
                            showDiv: false,
                        }, () => { this.fetchPost() })
                    }
                    else
                        Alert.warning(response.message)
                }).catch(error => {
                    Alert.warning("Some problem occured !!!")
                })
        }
    }

    handleCommentEdit(comm) {
        this.setState(Object.assign({
            activeComments: {
                ...this.state.activeComments,
                id: comm.id,
                postId: comm.discussion,
                comment: comm.comment
            },
            editing: true,
            foreignKey: JSON.parse(JSON.stringify(comm)).discussion,
            commentState: true,
            commentId: JSON.parse(JSON.stringify(comm)).id,
            name: JSON.parse(JSON.stringify(comm)).name
        }))
    }

    handleCommentDelete(comment) {
        DiscussionService.deleteComment(comment.id).then((response) => {
            if (response.success === 'True') {
                Alert.success(response.message)
                this.setState({ showDiv: false }, () => { this.fetchPost() })
            }
            else
                Alert.warning(response.message)
        })
    }

    fetchLike() {
        DiscussionService.fetchLike()
            .then((data) => {
                var l = []
                for (var i = 0; i < data.length; i++)
                    l = l.concat(data[i].toUser)
                this.setState({
                    likeList: data,
                    likeUserId: l
                })
            })
    }

    changeLike(like) {
        // var l = this.state.likeUserId
        // if (l.includes(like.user.id)) {
        //     var ll = []
        //     for (var i = 0; i < l.length; l++) {
        //         if (l[i] !== like.user.id)
        //             ll.concat(l[i])
        //     }
        //     l = ll
        // }
        // else {
        //     l.concat(like.user.id)
        // }
        // this.setState({ likeUserId: l })
        let formData = new FormData();
        formData.append("postId", like.id);
        formData.append("userId", like.user.id);
        formData.append("name", like.name);
        DiscussionService.editLike(formData, like.id)
            .then(res => {
                if (res.success === 'False')
                    Alert.warning(res.message)
                else {
                    this.setState({ showDiv: false }, () => this.fetchPost())
                }
            })
    }


    render() {
        var self = this
        var posts = Array.from(this.state.postList)
        return (
            <div>
                {/*<!--comment box------------->*/}
                <div class="card mb-3 comment-card">
                    <div class="card-header d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0">Dicussion form</h6>
                    </div>

                    <div class="card-body">
                        <div class="comment-box text-right">
                            <form onSubmit={this.handlePost} id='form'>
                                <div class='flex-wrapper'>
                                    <div style={{ flex: 6 }}>
                                        <input onChange={this.handleTitle} className='form-control' id='title' value={this.state.activePosts.title} type='text' name='title' placeholder='Add title...' />
                                    </div>
                                </div>
                                <br />
                                <div class='flex-wrapper'>
                                    <div style={{ flex: 6 }}>
                                        <ReactQuill value={this.state.activePosts.body}
                                            onChange={this.handleBody} placeholder='Add Post...' />
                                    </div>
                                </div>
                                <br />
                                <button type='submit' class='btn btn-warning' id='submit'>Post</button>
                            </form>
                        </div>

                        <div id="accordion">
                            <a class="btn btn-link btn-drop" onClick={this.fetchPost}>
                                {this.state.showDiv ?
                                    <div><i class="fas fa-comments"></i> Hide all posts</div> :
                                    <div><i class="fas fa-comments"></i> View all posts</div>}
                            </a>
                            {this.state.showDiv && (
                                <div>
                                    {this.state.loader ?
                                        <LoadingIndicator /> :
                                        <div class="card-body card-comment">

                                            <div class="result_comment col-md-12">
                                                <div id='list-wrapper' className="postScroll">
                                                    {posts.length === 0 ?
                                                        <div style={{ textAlign: "center" }}>
                                                            <div className="pt-5">Nothing to show</div>
                                                        </div> : null
                                                    }
                                                    {posts.map(function (post, index) {
                                                        var s = new Date(post.time)
                                                        var comments = post.comments
                                                        var likeCount = post.likes.length
                                                        var likes = post.likes
                                                        var li = []
                                                        likes.map(function (like, index) {
                                                            li = li.concat(like.toUser)
                                                        })
                                                        return (
                                                            <div>
                                                                <div className="flex-wrapper">
                                                                    <div class="avatar_comment col-md-1" style={{ flex: 1 }}>
                                                                        <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg"
                                                                            alt="avatar" />
                                                                    </div>
                                                                    <div class="result_comment col-md-11" style={{ flex: 7 }}>
                                                                        <h6 className="small">{post.name}</h6>
                                                                        <h6>{post.title}</h6>
                                                                        <p>{ReactHtmlParser(post.body)}</p>
                                                                    </div>
                                                                </div>

                                                                <div class="tools_comment pl-4 task-wrapper flex-wrapper">
                                                                    <div style={{ flex: 5, width: "10px", height: "1px" }}>
                                                                        {JSON.stringify(post.user.id) === self.state.userId ?
                                                                            <div>
                                                                                <a href='#' style={{ textDecoration: "none", color: "#22b1ed" }} onClick={() => self.handleEdit(post)} class="like">Edit</a>
                                                                                <span aria-hidden="true"> · </span>
                                                                                <a href='#' style={{ textDecoration: "none", color: "#22b1ed" }} onClick={() => self.handleDelete(post)} class="reply">Delete</a>
                                                                            </div>
                                                                            :
                                                                            <div style={{ flex: 1, textAlign: "left" }} className="pr-3">
                                                                                <a href="#" onClick={() => self.changeLike(post)}>
                                                                                    {li.includes(post.user.id) ?
                                                                                        <i class="fas fa-thumbs-up"></i> :
                                                                                        <i class="far fa-thumbs-up"></i>
                                                                                    }
                                                                                </a>
                                                                                <div style={{ flex: 1 }}>
                                                                                    {likeCount}
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        <span aria-hidden="true"> · </span>
                                                                    </div>
                                                                    <div style={{ flex: 5 }}>
                                                                        {s.getHours()}:{s.getMinutes()}&nbsp;-&nbsp;{s.getDate()}/{s.getMonth()}/{s.getFullYear()}
                                                                    </div>
                                                                    <div style={{ flex: 10 }}></div>
                                                                </div>
                                                                <div>
                                                                    {comments.map(function (comm, index) {
                                                                        return (
                                                                            <div style={{ border: "1px solid lightgray" }}>
                                                                                <div className="small pl-2">{comm.name}</div>
                                                                                <div key={index} className='task-wrapper flex-wrapper'>
                                                                                    <div style={{ flex: 7 }}>
                                                                                        <div>{comm.comment}</div>
                                                                                    </div>
                                                                                    <div style={{ flex: 1 }}>
                                                                                        {JSON.stringify(comm.user) === self.state.userId ?
                                                                                            <a href='#' style={{ textDecoration: "none", color: "#22b1ed" }} onClick={() => self.handleCommentEdit(comm)}>Edit</a> : null}
                                                                                    </div>
                                                                                    <span aria-hidden="true"> · </span>
                                                                                    <div style={{ flex: 1 }}>
                                                                                        {JSON.stringify(comm.user) === self.state.userId ?
                                                                                            <a href='#' style={{ textDecoration: "none", color: "#22b1ed" }} onClick={() => self.handleCommentDelete(comm)}>Delete</a> : null}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                                <div>
                                                                    {/* {comments.map(function (comm, index) {
                                                                if (post.id == comm.discussion) {
                                                                    return (
                                                                        <div style={{ border: "1px solid lightgray" }}>
                                                                            <div className="small pl-2">{comm.name}</div>
                                                                            <div key={index} className='task-wrapper flex-wrapper'>
                                                                                <div style={{ flex: 7 }}>
                                                                                    {self.state.commentState === false && self.state.commentId === comm.id ?
                                                                                        <form onSubmit={self.handleCommentPost} id='form'>
                                                                                            <div>
                                                                                                <div style={{ flex: 6 }}>
                                                                                                <input onChange={self.handleComment} style={{ width: "500px" }} value={self.state.activeComments.comment} id='comment' type='text' name='comment' placeholder='Add comment...' />
                                                                                                </div>
                                                                                                <div style={{ flex: 1 }}>
                                                                                                <button style={{ marginLeft: "2%", width: "60px", height: "35px", color: "white", backgroundColor: "#22b1ed", border: "1px", fontSize: "15px", borderColor: "#e3aeef", fontFamily: "sans-serif" }} type='submit'>Reply</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </form> :
                                                                                        <div>{comm.comment}</div>
                                                                                    }
                                                                                </div>
                                                                                <div style={{ flex: 1 }}>
                                                                                    {JSON.stringify(comm.username) === self.state.activeComments.username ?
                                                                                        <a href='#' style={{ textDecoration: "none", color: "#22b1ed" }} onClick={() => self.handleCommentEdit(comm)}>Edit</a> : null}
                                                                                </div>
                                                                                <span aria-hidden="true"> · </span>
                                                                                <div style={{ flex: 1 }}>
                                                                                    {JSON.stringify(comm.username) === self.state.activeComments.username ?
                                                                                        <a href='#' style={{ textDecoration: "none", color: "#22b1ed" }} onClick={() => self.handleCommentDelete(comm)}>Delete</a> : null}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })} */}
                                                                </div>
                                                                <div className="pl-5">
                                                                    {self.state.commentState === false ?
                                                                        <a style={{ textDecoration: "none", color: "#22b1ed" }} href="#" role="button" id="dropdownMenuLink" onClick={() => self.handleForeignKey(post)} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                            Reply
                                                                        </a> :
                                                                        <div style={{ paddingTop: "2%" }}>
                                                                            {post.id === self.state.activeComments.postId ||
                                                                                (self.state.editing === true && self.state.commentId === post.comments.id) ?
                                                                                <form onSubmit={self.handleCommentPost} id='form'>
                                                                                    <div>
                                                                                        <input onChange={self.handleComment} style={{ width: "85%" }} value={self.state.activeComments.comment} id='comment' type='text' name='comment' placeholder='Add comment...' />
                                                                                        <button style={{ marginLeft: "2%", width: "60px", height: "35px", color: "white", backgroundColor: "#22b1ed", border: "1px", fontSize: "15px", borderColor: "#e3aeef", fontFamily: "sans-serif" }} type='submit'>Reply</button>
                                                                                    </div>
                                                                                </form> :
                                                                                <a href="#" style={{ textDecoration: "none", color: "#22b1ed" }} role="button" id="dropdownMenuLink" onClick={() => self.handleForeignKey(post)} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                                    Reply
                                                                                </a>
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <hr />
                                                            </div>
                                                        )
                                                    })}
                                                </div >

                                            </div>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                        {/*<!--comment box------------->*/}
                    </div>
                </div>
            </div >
        )
    }
}
