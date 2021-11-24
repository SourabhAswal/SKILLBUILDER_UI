import React, { Component } from "react";
import AssignmentService from "./AssignmentService";
import Alert from "react-s-alert";
import courseSubSecService from "../CourseSubSec/courseSubSecService";
import { Table } from "react-bootstrap";
import '../course.css';
export default class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      display_name: "",
      assignment_question: "",
      quesType: "",
      tabledata: [],
      subsection_id: this.props.subSectionId,
      redirect: false,
      editing: false,
    };
  }
  getSubsection(e) {
    courseSubSecService.getSubData(e.target.value).then((res) => {
      this.setState({
        subsectionData: res,
      });
    });
  }

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
    this.getAssignmentData(this.state.subsection_id);
  }

  async getAssignmentData(id) {
    await AssignmentService.getAssignment(id).then((Data) => {
      if (Data.status == "True") {
        this.setState({
          tabledata: Data.data,
        });
      }
      else {
        this.setState({
          tabledata: []
        })
      }
    });
  }

  assignmentSave() {
    let formData = new FormData();
    formData.append("subsectionid", this.state.subsection_id);
    formData.append("display_name", this.state.display_name);
    formData.append("question", this.state.assignment_question);
    formData.append("quesType", this.state.quesType);
    if (this.state.editing == true) {
      if (this.state.display_name == "" || this.state.assignment_question == "" || this.state.quesType == "") {
        Alert.warning("Provide Complete Data");
      }
      else {
        AssignmentService.editAssignment(formData, this.state.id)
          .then((res) => {
            this.getAssignmentData(this.state.subsection_id);
          })
          .then(
            this.setState({
              editing: false,
              display_name: "",
              assignment_question: "",
              quesType: ""
            })
          );
      }
    } else {
      if (this.state.display_name == "" || this.state.assignment_question == "" || this.state.quesType == "") {
        Alert.warning("Provide Complete Data");
      }
      else {
        AssignmentService.quesSave(formData).then((res) => {
          switch (res.success) {
            case "True": {
              Alert.success(res.message);
              this.getAssignmentData(this.state.subsection_id);
              this.setState({
                display_name: "",
                assignment_question: "",
                quesType: ""
              });
              break;
            }
            default:
              Alert.warning(res.fail);
              break;
          }
        });
      }
    }
  }

  changeAssignmentQuestionHandler(e) {
    this.setState({
      assignment_question: e.target.value,
    });
  }
  changeDisplayNameHandler(e) {
    this.setState({
      display_name: e.target.value,
    });
  }

  changeTypeHandler(e) {
    this.setState({
      quesType: e.target.value,
    });
  }

    deleteAssignment(id) {
      AssignmentService.deleteAssignment(id).then((res) => {
        Alert.success(res.message);
        this.getAssignmentData(this.state.subsection_id);
      });
    }

    editAssignment(data, id) {
      this.setState({
        display_name: data.display_name,
        assignment_question: data.question,
        quesType: data.quesType,
        id: id,
        editing: true,
      });
    }
    reset() {

      this.setState({

        display_name: "",
        assignment_question: "",
        quesType: "",
        editing: false
      })

    }
    render() {
      const tabledata = this.state.tabledata.map((Data) => {
        return (
          <tr>
            <td>{Data.display_name}</td>
            <td>{Data.question}</td>
            <td>{Data.quesType}</td>
            <td>

              <button
                style={{ marginRight: "50px" }}
                type="button"
                className="btn btn-primary btn-blue"

                onClick={this.editAssignment.bind(this, Data, Data.id)}
              >
                Edit
              </button>
            </td>
            <td>
              {/* <button
              type="button"
              className="btn btn-primary"
              style={{ display: "block", margin: "auto" }}
              onClick={this.deleteAssignment.bind(this, Data.id)}
            >
              Delete
            </button> */}
              <button
                style={{ marginRight: "50px" }}
                type="button"
                className="btn btn-primary btn-blue"

                onClick={this.deleteAssignment.bind(this, Data.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
      var session = window.localStorage.length;
      if (session != 0) {
        return (
          <div>
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-lg-4" style={{ marginLeft: '-15px' }}>
                    <div class="form-group">
                      <label for="display_name">Display Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="display_name"
                        name="display_name"
                        placeholder=""
                        value={this.state.display_name}
                        onChange={this.changeDisplayNameHandler.bind(this)}
                        style={{ width: '103%' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4" style={{ marginLeft: '10px' }}>
                    <div class="form-group">
                      <label for="assignment_question">Assignment Question</label>
                      <input
                        type="text"
                        class="form-control"
                        id="assignment_question"
                        name="assignment_question"
                        placeholder=""
                        value={this.state.assignment_question}
                        onChange={this.changeAssignmentQuestionHandler.bind(this)}
                        style={{ width: '103%' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3" style={{ marginLeft: '10px' }}>
                    <div className="form-group">
                      <label for="quesType">Question Type</label>
                      <select
                        className="form-select form-control"
                        id="quesType"
                        name="quesType"
                        onChange={this.changeTypeHandler.bind(this)}
                        value={this.state.quesType}
                      >
                        <option selected value="">Choose</option>
                        <option>Text</option>
                        <option>CODING</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-md-2" style={{ paddingTop: "4%" }}>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      this.assignmentSave();
                    }}
                  >
                    {" "}
                    Save
                  </button>
                </div> */}
                  <div className="btn-display">
                    <button
                      style={{ marginRight: "50px", marginLeft: '-11px' }}
                      type="button"
                      className="btn btn-primary btn-blue"

                      onClick={() => {
                        this.assignmentSave();
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-blue"
                      onClick={() => this.reset()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <br />
            <div className="card p-3">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Display Name</th>
                    <th>Question</th>
                    <th>Question Type</th>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{tabledata}</tbody>
              </Table>
            </div>
          </div>
        );
      } else {
        window.location.replace("/");
      }
    }
  }
