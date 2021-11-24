import React from 'react';
import './DiscussionForm.css';
import DiscussionFormService from './DiscussionFormService';
import Alert from 'react-s-alert';
import { Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import * as ReactQuill from 'react-quill'; // Typescript
require('react-quill/dist/quill.snow.css'); // CommonJS



export default class DiscussionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // to redirect
            redirect: false,
            // for posts
            postList: [],
            activePosts: {
                id: null,
                username: JSON.stringify(localStorage.getItem("username")),
                title: '',
                body: '',
            },
            foreignKey: null,
            // for comments
            commentList: [],
            activeComments: {
                id: null,
                username: JSON.stringify(localStorage.getItem("username")),
                postId: null,
                comment: '',
            },
            // to edit posts and comments
            editing: false,
            // to split in pages
            pages: null,
            currentPageNo: 1,
            postPerPage: 5,
            currentPost: [],
        }

        this.getCookie = this.getCookie.bind(this)

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
    };

    componentDidMount() {
        console.log(this.props)
        this.fetchPost()
        this.fetchComment()
        this.props.userAuthenticated(true);
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }


    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    fetchPost() {
        DiscussionFormService.fetchPost()
            .then(data =>
                this.setState({
                    postList: data
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
        formData.append("username", this.state.activePosts.username);
        formData.append("title", this.state.activePosts.title);
        formData.append("body", this.state.activePosts.body)
        if (this.state.editing == true) {
            formData.append("id", this.state.activePosts.id);
            this.setState({
                editing: false,
            })
            DiscussionFormService.editPost(formData, this.state.activePosts.id)
                .then((response) => {
                    this.fetchPost()
                    this.setState({
                        activePosts: {
                            id: null,
                            title: '',
                            body: '',
                        }
                    })
                }).catch(error => {
                    Alert.warning("Some problem occured !!!")
                })
        } else {
            DiscussionFormService.createPost(formData).then((response) => {
                this.fetchPost()
                this.setState({
                    activePosts: {
                        id: null,
                        title: '',
                        body: '',
                    }
                })
            }).catch(error => {
                Alert.warning("Some problem occured !!!")
            })
        }
    }

    handleEdit(post) {
        this.setState(Object.assign({
            activePosts: post,
            editing: true,
        }))
    }

    handleDelete(post) {
        DiscussionFormService.deletePost(post.id).then((response) => {
            this.fetchPost()
        })
    }

    fetchComment() {
        DiscussionFormService.fetchComment()
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
                username: JSON.stringify(localStorage.getItem("username"))
            }
        })
    }

    handleCommentPost(e) {
        let formData = new FormData();
        formData.append("username", this.state.activeComments.username);
        formData.append("comment", this.state.activeComments.comment);
        if (this.state.editing == true) {
            formData.append("id", this.state.activeComments.id);
            formData.append("postId", this.state.foreignKey);
            this.setState({
                editing: false,
            })
            DiscussionFormService.editComment(formData, this.state.activeComments.id)
                .then((response) => {
                    this.fetchComment()
                    this.setState({
                        activeComments: {
                            id: null,
                            postId: null,
                            comment: '',
                        }
                    })
                }).catch(error => {
                    Alert.warning("Some problem occured !!!")
                })
        }
        else {
            formData.append("postId", this.state.activeComments.postId);
            DiscussionFormService.createComment(formData).then((response) => {
                this.fetchPost()
                this.setState({
                    activeComments: {
                        id: null,
                        postId: null,
                        comment: '',
                    }
                })
            }).catch(error => {
                Alert.warning("Some problem occured !!!")
            })
        }
    }

    handleCommentEdit(comm) {
        this.setState(Object.assign({
            activeComments: comm,
            editing: true,
            foreignKey: JSON.parse(JSON.stringify(comm)).discussion,
        }))
    }

    handleCommentDelete(comment) {
        DiscussionFormService.deleteComment(comment.id).then((response) => {
            this.fetchComment()
        })
    }

    render() {
        // var session = window.localStorage.length;
        // if (session != 0) {
            var self = this
            var posts = Array.from(this.state.postList)
            var comments = Array.from(this.state.commentList)

            if (this.state.redirect) {
                return (
                    <Redirect to={{ pathname: "/dashboard", state: { from: this.props.location } }} />
                )
            }

            return (
                <div>
                    <div className='container scroll'>
                        <div className="text-left">
                            <h1 style={{ fontWeight: "bold", color: "#5a5c69" }}>Discussion</h1></div>
                        <div id='task-container'>
                            <div id='form-wrapper'>
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
                            <div id='list-wrapper'>
                                {posts.map(function (post, index) {
                                    return (
                                        <div>
                                            <div>{post.username}</div>
                                            <div key={index} className='task-wrapper flex-wrapper'>
                                                <div style={{ flex: 7 }}>
                                                    <div className='font-weight-bold'>{post.title}</div><br />
                                                    <span>{ReactHtmlParser(post.body)}</span>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {post.username === self.state.activePosts.username ?
                                                        <a href='#' onClick={() => self.handleEdit(post)} className='btn btn-sm btn-outline-info'>Edit</a> : null}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {post.username === self.state.activePosts.username ?
                                                        <a href='#' onClick={() => self.handleDelete(post)} className='btn btn-sm btn-outline-dark delete'>-</a> : null}
                                                </div>
                                                <div>
                                                    {/* <!-- Button trigger modal --> */}
                                                    <a href='#' type="button" onClick={() => self.handleForeignKey(post)} class="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#exampleModal">
                                                        Comment
                                                    </a>

                                                    {/* <!-- Modal --> */}
                                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div id='form-wrapper'>
                                                                    <form onSubmit={self.handleCommentPost} id='form'>
                                                                        <div className='flex-wrapper'>
                                                                            <div style={{ flex: 6 }}>
                                                                                <input onChange={self.handleComment} className='form-control' value={self.state.activeComments.comment} id='comment' type='text' name='comment' placeholder='Add comment...' />
                                                                            </div>
                                                                            <div style={{ flex: 1 }}>
                                                                                <button type='submit' class='btn btn-warning' id='submit'>Comment</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div >
                                            <div id='comment-container'>
                                                <div id='list-wrapper'>
                                                    {comments.map(function (comm, index) {
                                                        if (post.id == comm.discussion) {
                                                            return (
                                                                <div>
                                                                    <div>{comm.username}</div>
                                                                    <div key={index} className='task-wrapper flex-wrapper'>
                                                                        <div style={{ flex: 7 }}>
                                                                            <span>{comm.comment}</span><br />
                                                                        </div>
                                                                        <div style={{ flex: 1 }}>
                                                                            {comm.username === self.state.activeComments.username ?
                                                                                <a href='#' onClick={() => self.handleCommentEdit(comm)} className='btn btn-sm btn-outline-info' data-toggle="modal" data-target="#exampleModal">Edit</a> : null}
                                                                        </div>
                                                                        <div style={{ flex: 1 }}>
                                                                            {comm.username === self.state.activeComments.username ?
                                                                                <a href='#' onClick={() => self.handleCommentDelete(comm)} className='btn btn-sm btn-outline-dark delete'>-</a> : null}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div >
                                    )
                                })
                                }
                            </div >
                        </div >
                    </div >
                </div>
            )
        // }
        // else {
        //     window.location.replace("/");
        // }
    }
}