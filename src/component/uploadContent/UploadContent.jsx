import React, { Component } from "react";
import courseFormService from "../Course/courseFormService";
import courseSecService from "../CourseSec/courseSecService";
import courseSubSecService from "../CourseSubSec/courseSubSecService";
import UploadContentService from "./UploadContentService";
import Alert from "react-s-alert";
import Assignment from "../assignment/Assignment";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import BulkUpload from "../BulkUpload/BulkUpload";
import DataGridTableComponent from "../../common/DataGridComponent/DataGridTableComponent";
import { confirmAlert } from "react-confirm-alert";
import "../course.css";
import Encryption from "../Routing/Encryption";


class UploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: [],
      secData: [],
      subsectionData: [],
      subSectionId: "",
      sectionId: "",
      setSubSection: false,
      uploadPdf: false,
      uploadPresentation: false,
      pdfName: "",
      pptName: "",
      pdfFile: null,
      pptFile: null,
      subVideo: null,
      loading: false,
      isOpenAssignment: false,
      isOpenQuiz: false,
      isOpenBulkQuiz: false,
      pdfList: [],
      pptList: [],
      subvideoList: [],
      pdfs: [],
      isEditing: false,
      uploadPdfId: "",
      uploadSubVideoId: null,
      uploadpptId: null,
      currentUser: null,
      uploadSubSectionVideo: false,
      subvideoName: "",
      extVideo: false,
      extVidName: '',
      extVidLink: '',
      ext: false,

      columns: [
        {
          dataField: "display_name",
          text: "Pdf Name",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
        },
        {
          dataField: "pdf",
          text: "pdf",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.pdfFormatter,
        },
        {
          dataField: "update",
          text: "Update",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.linkUpdate,
        },
        {
          dataField: "delete",
          text: "Delete",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.linkDelete,
        },
      ],

      columnssubvideo: [
        {
          dataField: "subvideoName",
          text: "Sub video Name",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
        },
        {
          dataField: "subVideo",
          text: "Sub Video",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.videoFormatter,
        },
        {
          dataField: "update",
          text: "Update",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.linkUpdateVideo,
        },
        {
          dataField: "delete",
          text: "Delete",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.linkDeleteVideo,
        },
      ],

      pptcolumns: [
        {
          dataField: "display_name",
          text: "PPT Name",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
        },
        {
          dataField: "ppt",
          text: "PPT",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.pptFormatter,
        },
        {
          dataField: "update",
          text: "Update",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.linkUpdateppt,
        },
        {
          dataField: "delete",
          text: "Delete",
          sort: true,
          sortCaret: (order) => {
            if (!order) return <span>&nbsp;&nbsp; ⇓⇑ </span>;
            else if (order === "asc")
              return (
                <span>
                  &nbsp;&nbsp;⇓<font color="#808080">⇑</font>
                </span>
              );
            else if (order === "desc")
              return (
                <span>
                  &nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑
                </span>
              );
            return null;
          },
          formatter: this.linkDeleteppt,
        },
      ],
    };
    this.getSection = this.getSection.bind(this);
    this.getSubsection = this.getSubsection.bind(this);
    this.showUploadPdf = this.showUploadPdf.bind(this);
    this.showAssignment = this.showAssignment.bind(this);
    this.showSubSectionVideo = this.showSubSectionVideo.bind(this);
    this.changePdfHandler = this.changePdfHandler.bind(this);
    this.pdfNameHandler = this.pdfNameHandler.bind(this);
    this.setSubSection = this.setSubSection.bind(this);
    this.reset = this.reset.bind(this);
    this.resetState = this.resetState.bind(this);
    this.showUploadPresentation = this.showUploadPresentation.bind(this);
    this.pptNameHandler = this.pptNameHandler.bind(this);
    this.changePptHandler = this.changePptHandler.bind(this);
    this.savePpt = this.savePpt.bind(this);
    this.saveOrUpdatePdf = this.saveOrUpdatePdf.bind(this);
    this.getList = this.getList.bind(this);
    this.SubVideoNameHandler = this.SubVideoNameHandler.bind(this);
    this.sub_vid_handler = this.sub_vid_handler.bind(this);
    this.resetsubvideo = this.resetsubvideo.bind(this);
    this.saveSubVideo = this.saveSubVideo.bind(this);
    this.changeExternalVideoNameHandler = this.changeExternalVideoNameHandler.bind(this);
    this.changeExternalVideoLinkHandler = this.changeExternalVideoLinkHandler.bind(this);
    this.saveExternalVideo = this.saveExternalVideo.bind(this);
  }

  pdfFormatter(cell, row) {
    return (
      <iframe
        src={cell}
        style={{ height: "100px" }}
        allowfullscreen="true"
        alt="pdf"
      />
    );
  }

  pptFormatter(cell, row) {
    return (
      <iframe
        src={
          "https://view.officeapps.live.com/op/embed.aspx?src=" +
          cell +
          "#toolbar=0"
        }
        title="presentation"
        style={{ width: "100%", height: "300px" }}
        allowFullScreen={true}
      />
    );
  }

  videoFormatter(cell, row) {
    if (row.external == true) {
      let url = cell.replace('watch?v=', 'embed/')
      return (
        <iframe width="100%" height="120px" src={url}
          sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation" title="YouTube video player"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}>
        </iframe>
      );
    }
    else {
      return (
        <video
          src={cell}
          style={{ height: "120px" }}
          controls
          controlsList="nodownload"
          alt="pdf"
        />
      );
    }
  }
  linkUpdate = (cell, row, rowIndex, formatExtraData, id) => {
    return (
      <button
        className="btn btn-primary btn-blue"
        onClick={() => {
          this.edit(row.id);
        }}
      >
        Update
      </button>
    );
  };

  linkDelete = (cell, row, rowIndex, formatExtraData, id) => {
    return (
      <button
        data-toggle="modal"
        data-target="#bd-example-modal-sm"
        className="btn btn-primary btn-blue"
        onClick={() => {
          this.deleteAlert(row.id);
        }}
      >
        Delete
      </button>
    );
  };

  linkUpdateVideo = (cell, row, rowIndex, formatExtraData, id) => {
    return (
      <button
        className="btn btn-primary btn-blue"
        onClick={() => {
          this.editvideo(row.id, row.external);
        }}
      >
        Update
      </button>
    );
  };

  linkDeleteVideo = (cell, row, rowIndex, formatExtraData, id) => {
    if (row.external == false) {
      return (
        <button
          data-toggle="modal"
          data-target="#bd-example-modal-sm"
          className="btn btn-primary btn-blue"
          onClick={() => {
            this.deleteAlertVideo(row.id, row.external);
          }}
        >
          Delete
        </button>
      );
    }
    else {
      return (
        <button data-toggle="modal"
          data-target="#bd-example-modal-sm"
          className="btn btn-primary btn-blue"
          onClick={() => {
            this.deleteAlertVideo(row.id, row.external)
          }}>
          Delete
        </button>
      );
    }
  };
  linkUpdateppt = (cell, row, rowIndex, formatExtraData, id) => {
    return (
      <button
        className="btn btn-primary btn-blue"
        onClick={() => {
          this.editppt(row.id);
        }}
      >
        Update
      </button>
    );
  };

  linkDeleteppt = (cell, row, rowIndex, formatExtraData, id) => {
    return (
      <button
        data-toggle="modal"
        data-target="#bd-example-modal-sm"
        className="btn btn-primary btn-blue"
        onClick={() => {
          this.deleteAlertppt(row.id);
        }}
      >
        Delete
      </button>
    );
  };

  deleteAlertVideo = (id, flag) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div
          class="modal fade model-small"
          id="bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-sm model-conform">
            <div class="modal-content">
              <div className="card sm-card mb-0" id="delete-btn">
                <div className="card-body text-center">
                  <h3>Confirm to Delete</h3>
                  <p2>Are you sure to delete this?</p2>
                  <br />
                  <button
                    onClick={() => {
                      this.deletevideo(id, flag);
                      onClose();
                    }}
                    className="all-stdnt-detail-btn m-2"
                  >
                    Yes
                  </button>
                  <button
                    className="all-stdnt-detail-btn m-2"
                    onClick={onClose}
                  >
                    No
                  </button>
                </div>
              </div>
              ,
            </div>
          </div>
        </div>
      ),
    });
  };

  deleteAlertppt = (id) => {
    
     confirmAlert({
      customUI: ({ onClose }) => (
        <div
          class="modal fade model-small"
          id="bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-sm model-conform">
            <div class="modal-content">
              <div className="card sm-card mb-0" id="delete-btn">
                <div className="card-body text-center">
                  <h3>Confirm to Delete</h3>
                  <p2>Are you sure to delete this?</p2>
                  <br />
                  <button
                    onClick={() => {
                      this.deleteppt(id);
                      onClose();
                    }}
                    className="all-stdnt-detail-btn m-2"
                  >
                    Yes
                  </button>
                  <button
                    className="all-stdnt-detail-btn m-2"
                    onClick={onClose}
                  >
                    No
                  </button>
                </div>
              </div>
              ,
            </div>
          </div>
        </div>
      ),
    });
  };

  deleteAlert = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div
          class="modal fade model-small"
          id="bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-sm model-conform">
            <div class="modal-content">
              <div className="card sm-card mb-0" id="delete-btn">
                <div className="card-body text-center">
                  <h3>Confirm to Delete</h3>
                  <p2>Are you sure to delete this?</p2>
                  <br />
                  <button
                    onClick={() => {
                      this.delete(id);
                      onClose();
                    }}
                    className="all-stdnt-detail-btn m-2"
                  >
                    Yes
                  </button>
                  <button
                    className="all-stdnt-detail-btn m-2"
                    onClick={onClose}
                  >
                    No
                  </button>
                </div>
              </div>
              ,
            </div>
          </div>
        </div>
      ),
    });
  };

  componentDidMount() {
    this.getCourseData();
    this.props.userAuthenticated(true);
    window.scrollTo(0, 0);
  }

  getCourseData() {
    courseFormService.getCourseData().then((Data) => {
      this.setState({ courseData: Data });
    });
  }

  getSection(e) {
    courseSecService.getSecData(e.target.value).then((res) => {
      document.getElementById('selectedsection').options[0].selected = true
      document.getElementById('selectedsubsection').options[0].selected = true
      this.setState({
        secData: res,
        sectionId: "",
        uploadPdf: false,
        uploadPresentation: false,
        isOpenAssignment: false,
        uploadSubSectionVideo: false
      });
    });
  }

  getSubsection(e) {
    courseSubSecService.getSubData(e.target.value).then((res) => {
      this.setState({
        subsectionData: res,
        sectionId: e.target.value,
      });
    });
  }

  setSubSection(e) {
    this.setState({
      subSectionId: e.target.value,
      setSubSection: true,
    });
    this.getList();
  }

  showAssignment(e) {
    e.preventDefault();
    this.getList();
    if (this.state.setSubSection) {
      this.setState({
        uploadSubSectionVideo: false,
        uploadPdf: false,
        uploadPresentation: false,
        isOpenAssignment: true,
      });
    } else {
      Alert.warning("Please select course,section and Sub section first!!!");
    }
  }
  showSubSectionVideo(e) {
    e.preventDefault();
    this.getList();
    if (this.state.setSubSection) {
      this.setState({
        uploadSubSectionVideo: true,
        uploadPdf: false,
        uploadPresentation: false,
        isOpenAssignment: false,
      });
    } else {
      Alert.warning("Please select course,section and Sub section first!!!");
    }
  }
  showUploadPdf(e) {
    e.preventDefault();
    this.getList();
    if (this.state.setSubSection) {
      this.setState({
        uploadSubSectionVideo: false,
        uploadPdf: true,
        uploadPresentation: false,
        isOpenAssignment: false,
        pdfName: "",
      });
    } else {
      Alert.warning("Please select course,section and Sub section first!!!");
    }
  }
  showUploadPresentation(e) {
    e.preventDefault()
    this.getList();
    if (this.state.setSubSection) {
      this.setState({
        uploadSubSectionVideo: false,
        uploadPdf: false,
        uploadPresentation: true,
        isOpenAssignment: false,
        pptName: "",
      });
    } else {
      Alert.warning("Please select course,section and Sub section first!!!");
    }
  }

  showQuiz() {
    this.setState((currentState) => ({
      isOpenQuiz: !currentState.isOpenQuiz,
      isOpenBulkQuiz: false,
      isOpenAssignment: false,
    }));
  }

  showBulkQuiz() {
    this.setState((currentState) => ({
      isOpenBulkQuiz: !currentState.isOpenBulkQuiz,
      isOpenQuiz: false,
      isOpenAssignment: false,
    }));
  }

  pdfNameHandler(e) {
    this.setState({
      pdfName: e.target.value
    });
  }

  checkFieldValue(val) {
    var correctName = val.replace(/\s/g, '')
    if (correctName.length == 0) {
      return false;
    }
    else {
      return true
    }
  }

  pptNameHandler(e) {
    this.setState({
      pptName: e.target.value,
    });
  }
  resetsubvideo() {
    this.clearVideoFile(document.getElementById("videocreate"));
    document.getElementById('errvideo').innerHTML = "No File Chosen"
    document.getElementById("errvideo").style.color = "black";
    this.setState({
      isEditing: false,
      subvideoName: "",
      isEditing: false,
      extVidName: '',
      extVidLink: ''
    });
    this.getCourseData();
  }
  SubVideoNameHandler(e) {
    this.setState({
      subvideoName: e.target.value,
    });
  }
  sub_vid_handler(e) {
    if (e.target.files[0] != null) {
      let file = e.target.files[0];

      var lastStr = String(file.name).lastIndexOf(".");
      var filename = String(file.name).substring(lastStr + 1);
      if (filename === "mp4" || filename === "mkv" || filename === "avi") {
        this.setState({
          subVideo: file,
        });
        document.getElementById('errvideo').innerHTML = file.name;
        document.getElementById("errvideo").style.color = "black";
      } else {
        e.target.value = null;
        // Alert.warning("Please select correct file");
        document.getElementById("errvideo").innerHTML =
          "Please select correct video file";
        document.getElementById("errvideo").style.color = "#FF0000";
      }
    } else {
      this.setState({ subVideo: null });
      e.target.value = null;
    }

    const fi = document.getElementById('videocreate');
    // Check if any file is selected.
    if (fi.files.length > 0) {
      for (var i = 0; i <= fi.files.length - 1; i++) {

        const fsize = fi.files.item(i).size;
        const file = Math.round((fsize / 1024));
        // The size of the file.
        if (file >= 7096) {
          alert(
            "File too Big, please select a file less than 4mb");
          this.clearVideoFile(fi)
        } else if (file < 1) {
          alert(
            "File too small, please select a file greater than 1kb");
          this.clearVideoFile(fi)
        } else {
          this.setState({ subVideo: e.target.files[0] });
        }
      }
    }

  }

  clearVideoFile(video) {
    try {
      video.value = null
    }
    catch (e) {

    }
    if (video.value) {
      video.parentNode.replaceChild(video.cloneNode(true), video);
    }
  }

  clearVideoFile(video) {
    try {
      video.value = null;
    } catch (e) { }
    if (video.value) {
      video.parentNode.replaceChild(video.cloneNode(true), video);
    }
  }

  changePdfHandler(e) {
    if (e.target.files[0] != null) {
      let file = e.target.files[0];

      var lastStr = String(file.name).lastIndexOf(".");
      var filename = String(file.name).substring(lastStr + 1);
      if (filename === "pdf") {
        this.setState({ pdfFile: file });
        document.getElementById("errpdf").innerHTML = file.name;
        document.getElementById("errpdf").style.color = "black";
      } else {
        e.target.value = null;
        // Alert.warning("Please select correct file");
        document.getElementById("errpdf").innerHTML =
          "Please select correct pdf file";
        document.getElementById("errpdf").style.color = "#FF0000";
      }
    } else {
      this.setState({ pdfFile: null });
      e.target.value = null;
    }
  }

  changePptHandler(e) {
    var file = e.target.files[0];
    if (
      file.type == "application/vnd.ms-powerpoint" ||
      file.type ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      this.setState({
        pptFile: e.target.files[0],
      });
      document.getElementById("errppt").innerHTML = file.name;
      document.getElementById("errppt").style.color = "black";
    } else {
      // Alert.warning("Invalid file format...!")
      document.getElementById("errppt").innerHTML = "Please select correct ppt file";
      document.getElementById("errppt").style.color = "#FF0000";
    }
  }

  reset() {
    this.clearFileInput(document.getElementById("pdf"));
    document.getElementById('errppt').innerHTML = "No File Chosen"
    document.getElementById('errppt').style.color = "black"
    this.setState({
      pdfName: "",
      pdfFile: null,
      pptFile: null,
      pptName: "",
      subvideoName: "",
      editing: false
    });
    this.getCourseData();
  }

  async getList() {
    if (this.state.sectionId !== null && this.state.sectionId !== "") {
      await courseSubSecService.getSubData(this.state.sectionId).then((res) => {
        res.forEach((data) => {
          if (Number(data.id) === Number(this.state.subSectionId)) {
            this.setState({
              pdfList: data.pdf,
              subvideoList: data.subVideo,
              pptList: data.ppt,
            });
          }
        });
      });
    }
  }

  saveOrUpdatePdf = (e) => {
    this.setState({
      loading: true,
    });
    if (
      this.state.pdfName !== "" &&
      this.state.pdfFile !== null &&
      this.state.pdfFile.type === "application/pdf" &&
      this.state.isEditing === false
    ) {
      if (this.checkFieldValue(this.state.pdfName) == true) {
        let formData = new FormData();
        formData.append("id", this.state.subSectionId);
        formData.append("pdf", this.state.pdfFile);
        formData.append("display_name", this.state.pdfName);
        UploadContentService.uploadPdf(formData).then((res) => {
          console.log(res);
          switch (res.status) {
            case "true": {
              this.resetState();
              this.setState({
                loading: false,
              });
              this.getList();
              Alert.success("PDF uploaded Successfully!!!");
              break;
            }
            case "exception": {
              this.resetState();
              this.setState({
                loading: false,
              });
              Alert.warning("Error while saving the PDF!!!");
              break;
            }
            case "false": {
              this.resetState();
              this.setState({
                loading: false,
              })
              Alert.warning(res.detail)
              break;
            }
          }
        });
      }
      else {
        Alert.warning("Display Name cannot be empty");
      }
    }
    else if (this.state.isEditing && this.state.subSectionId != "") {
      var check = document.getElementById('errpdf').innerHTML
      if (this.state.pdfName == "" || check == 'Please select correct pdf file') {
        Alert.warning("Provide Complete Data");
      }
      else {
        if (this.checkFieldValue(this.state.pdfName) == true) {
          let formData = new FormData();
          formData.append("id", this.state.subSectionId);
          formData.append("pdf", this.state.pdfFile);
          formData.append("display_name", this.state.pdfName);
          UploadContentService.editPdf(formData, this.state.uploadPdfId)
            .then((res) => {
              switch (res.status) {
                case "true": {
                  this.setState({
                    loading: false,
                    isEditing: false,
                  });
                  this.getList();
                  this.resetState();
                  Alert.success("PDF updated Successfully!!!");
                  break;
                }
                case "exception": {
                  this.resetState();
                  this.setState({
                    loading: false,
                    isEditing: false,
                  });
                  Alert.warning("Error while saving the PDF!!!");
                  break;
                }
                case "false": {
                  this.resetState();
                  this.setState({
                    loading: false,
                    isEditing: false,
                  });
                  // Alert.warning(res.message)
                  break;
                }
              }
            })
        }
        else {
          Alert.warning("Display Name cannot be empty");
        }
      }
    }
    else {
      Alert.warning("Provide complete details");
    }
  };

  clearFileInput(ctrl) {
    try {
      ctrl.value = null;
    } catch (ex) { }
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
  }

  saveSubVideo(e) {
    this.setState({
      loading: true,
    });
    if (
      this.state.subvideoName != "" &&
      this.state.subVideo != null &&
      this.state.isEditing === false
    ) {
      if (this.checkFieldValue(this.state.subvideoName) == true) {
        let formData = new FormData();
        formData.append("id", this.state.subSectionId);
        formData.append("subVideo", this.state.subVideo);
        formData.append("subvideoName", this.state.subvideoName);
        UploadContentService.uploadsubvideo(formData).then((res) => {
          switch (res.status) {
            case "true": {
              this.resetsubvideo();
              this.setState({
                loading: false,
              });
              this.getList();
              Alert.success("Sub section video uploaded successfully");
              break;
            }
            case "exception": {
              this.resetsubvideo();
              this.setState({
                loading: false,
              });
              Alert.warning("Error while uploading the Sub section video");
              break;
            }
            case "false": {
              this.resetsubvideo();
              this.setState({
                loading: false,
              });
              Alert.warning(res.detail);
              break;
            }
          }
        });
      }
      else {
        Alert.warning("Display Name cannot be empty");
      }
    }
    else if (this.state.isEditing && this.state.subSectionId != "") {
      var check = document.getElementById('errvideo').innerHTML;
      console.log(check);
      if (this.state.subvideoName == "" || check == 'Please select correct video file') {
        Alert.warning("Provide Complete Data")
      }
      else {
        if (this.checkFieldValue(this.state.subvideoName) == true) {
          let formData = new FormData();
          formData.append("id", this.state.subSectionId);
          formData.append("subVideo", this.state.subVideo);
          formData.append("subvideoName", this.state.subvideoName);
          UploadContentService.editSubVideo(formData, this.state.uploadSubVideoId)
            .then((res) => {
              // console.log(res)
              switch (res.status) {
                case "true": {
                  this.setState({
                    loading: false,
                    isEditing: false
                  });
                  this.getList();
                  this.resetsubvideo();
                  Alert.success("Sub section video updated successfully!!!");
                  break;
                }
                case "exception": {
                  this.resetsubvideo();
                  this.setState({
                    loading: false,
                    isEditing: false,
                  });
                  Alert.warning("Error while saving the Sub section video!!!");
                  break;
                }
              }
            });
        }
        else {
          Alert.warning("Display Name cannot be empty");
        }
      }
    }
  }

  savePpt(e) {
    this.setState({
      loading: true,
    });
    if (
      this.state.pptName != "" &&
      this.state.pptFile != null &&
      this.state.isEditing === false
    ) {
      if (this.checkFieldValue(this.state.pptName) == true) {
        let formData = new FormData();
        formData.append("id", this.state.subSectionId);
        formData.append("ppt", this.state.pptFile);
        formData.append("displayName", this.state.pptName);
        UploadContentService.uploadPpt(formData).then((res) => {
          switch (res.status) {
            case "true": {
              this.reset();
              this.setState({
                loading: false,
              });
              this.getList();
              Alert.success("PPT uploaded successfully");
              break;
            }
            case "exception": {
              this.reset();
              this.setState({
                loading: false,
              });
              Alert.warning("Error while uploading the PPT");
              break;
            }
            case "false": {
              this.reset();
              this.setState({
                loading: false
              })
              Alert.warning(res.detail);
              break;
            }
          }
        });
      }
      else {
        Alert.warning("Display Name cannot be empty");
      }
    }
    else if (this.state.isEditing && this.state.subSectionId != "") {
      var check = document.getElementById('errppt').innerHTML;
      if (this.state.pptName == "" || check == 'Please select correct ppt file') {
        Alert.warning("Provide Complete Data");
      }
      else {
        if (this.checkFieldValue(this.state.pptName) == true) {
          let formData = new FormData();
          formData.append("id", this.state.subSectionId);
          formData.append("ppt", this.state.pptFile);
          formData.append("displayName", this.state.pptName);
          UploadContentService.editppt(formData, this.state.uploadpptId)
            .then((res) => {
              // console.log(res)
              switch (res.status) {
                case "true": {
                  this.setState({
                    loading: false,
                    isEditing: false,
                  });
                  this.getList();
                  this.reset();
                  Alert.success("ppt updated successfully!!!");
                  break;
                }
                case "exception": {
                  this.reset();
                  this.setState({
                    loading: false,
                    isEditing: false,
                  });
                  Alert.warning("Error while saving the ppt!!!");
                  break;
                }
              }
            });
        }
        else {
          Alert.warning("Display Name cannot be empty");
        }
      }
    }
    else {
      Alert.warning("Provide Complete Data");
    }
  }



  resetState() {
    this.clearFileInput(document.getElementById("pdf"));
    document.getElementById('errpdf').innerHTML = "No File Chosen"
    document.getElementById('errpdf').style.color = "black"
    this.setState({
      // courseData: [],
      // secData: [],
      // subsectionData: [],
      pdfName: "",
      pptName: "",
      pdfFile: null,
      pptName: null,
      editing: false,
      // uploadPdf: false,
    });
  }

  edit(id) {
    this.setState({ loading: true });
    UploadContentService.getPdfList(id).then((res) => {
      if (res) {
        res.forEach((response) => {
          document.getElementById('errpdf').innerHTML = response.pdf.split('/')[5]
          this.setState({
            loading: false,
            uploadPdfId: response.id,
            pdfName: response.display_name,
            isEditing: true,
          });
        });
      }
    })
  }



  delete(id) {
    this.setState({ loading: true });
    UploadContentService.deletePdf(id).then((res) => {
      switch (res.status) {
        case "true": {
          this.setState({ loading: false });
          this.resetState();
          Alert.success("pdf deleted successfully");
          this.getList();
          break;
        }
        case "exception": {
          this.setState({ loading: false });
          Alert.warning("Error while deleting the pdf");
          break;
        }
        case "error": {
          this.setState({ loading: false });
          Alert.error("error");
          break;
        }
        default:
          this.setState({ loading: false });
          break;
      }
    });
  }

  editvideo(id, flag) {
    this.setState({ loading: true });
    if (flag == false) {
      UploadContentService.getVideoList(id).then((res) => {
        if (res) {
          res.forEach((response) => {
            document.getElementById('errvideo').innerHTML = response.subVideo.split("/")[5]
            this.setState({
              loading: false,
              uploadSubVideoId: response.id,
              subvideoName: response.subvideoName,
              isEditing: true,
            });
          });
        }
      });
    }
    else {
      UploadContentService.getExternalVideo(id).then((res) => {
        if (res) {
          this.setState({
            loading: false,
            ext: true,
            uploadSubVideoId: res.id,
            extVidName: res.subvideoName,
            extVidLink: res.subVideo,
            extVideo: true,
            isEditing: true
          })
        }
      })
    }
  }

  editppt(id) {
    this.setState({ loading: true });
    UploadContentService.getpptList(id).then((res) => {
      if (res) {
        res.forEach((response) => {
          document.getElementById('errppt').innerHTML = response.ppt.split('/')[5]
          this.setState({
            loading: false,
            uploadpptId: response.id,
            pptName: response.display_name,
            isEditing: true,
          });

        });
      }
    });
  }

  deletevideo(id, flag) {
    this.setState({ loading: true });
    if (flag == false) {
      UploadContentService.deleteSubVideo(id).then((res) => {
        switch (res.status) {
          case "true": {
            this.setState({ loading: false });
            this.resetsubvideo();
            Alert.success("Sub section video deleted successfully");
            this.getList();
            break;
          }
          case "exception": {
            this.setState({ loading: false });
            Alert.warning("Error while deleting the Sub section video");
            break;
          }
          case "error": {
            this.setState({ loading: false });
            Alert.error("error");
            break;
          }
          default:
            this.setState({ loading: false });
            break;
        }
      });
    }
    else {
      UploadContentService.deleteExternalVideo(id).then((res) => {
        switch (res.status) {
          case 'true': {
            this.setState({ loading: false });
            this.resetsubvideo();
            Alert.success("External Video Deleted successfully");
            this.getList();
            break;
          }
          case "exception": {
            this.setState({ loading: false });
            Alert.warning("Error while deleting the external video");
            break;
          }
          default:
            this.setState({ loading: false });
            break;
        }
      });
    }
  }

  deleteppt(id) {
    this.setState({ loading: true });
    UploadContentService.deletepptservice(id).then((res) => {
      switch (res.status) {
        case "true": {
          this.setState({ loading: false });
          this.reset();
          Alert.success("PPT deleted successfully");
          this.getList();
          break;
        }
        case "exception": {
          this.setState({ loading: false });
          Alert.warning("Error while deleting the PPT");
          break;
        }
        case "error": {
          this.setState({ loading: false });
          Alert.error("error");
          break;
        }
        default:
          this.setState({ loading: false });
          break;
      }
    });
  }

  externalVideoLink() {
    this.setState({
      extVideo: true
    })
  }

  changeExternalVideoNameHandler(e) {
    this.setState({
      extVidName: e.target.value
    })
  }

  changeExternalVideoLinkHandler(e) {
    this.setState({
      extVidLink: e.target.value
    })
  }

  saveExternalVideo() {
    if (this.state.extVidName != "" && this.state.extVidLink != "" && this.state.isEditing === false) {
      if (this.checkFieldValue(this.state.extVidName) && this.checkFieldValue(this.state.extVidLink)) {
        let formData = new FormData();
        formData.append('id', this.state.subSectionId);
        formData.append('extVideoName', this.state.extVidName);
        formData.append('extVideoLink', this.state.extVidLink);
        UploadContentService.uploadExternalVideo(formData).then((res) => {
          switch (res.status) {
            case 'true': {
              this.resetsubvideo();
              this.getList();
              Alert.success(res.message);
              break;
            }

            case 'false': {
              this.resetsubvideo();
              Alert.warning(res.message);
              break;
            }

            case 'exception': {
              this.resetsubvideo();
              Alert.warning(res.message);
              break;
            }
          }
        })
      }
      else {
        Alert.warning("External Video URL cannot be empty");
      }
    }
    else if (this.state.isEditing == true && this.state.subSectionId != "") {
      if (this.state.extVidName == "") {
        Alert.warning("Provide Complete Data")
      }
      else {
        if (this.checkFieldValue(this.state.extVidName) && this.checkFieldValue(this.state.extVidLink)) {
          let formData = new FormData();
          formData.append('id', this.state.subSectionId);
          formData.append('subVideo', this.state.extVidLink);
          formData.append('subvideoName', this.state.extVidName);
          UploadContentService.editExternalVideo(formData, this.state.uploadSubVideoId)
            .then((res) => {
              switch (res.status) {
                case 'true': {
                  this.setState({
                    loading: false,
                    isEditing: false
                  });
                  this.getList();
                  this.resetsubvideo();
                  Alert.success(res.message);
                  break;
                }
                case 'false': {
                  this.setState({
                    loading: false,
                    isEditing: false
                  });
                  this.resetsubvideo();
                  Alert.warning(res.message);
                  break;
                }
                case 'exception': {
                  this.resetsubvideo();
                  this.setState({
                    loading: false,
                    isEditing: false
                  });
                  Alert.warning(res.message)
                  break;
                }
              }
            })
        }
        else {
          Alert.warning("Display Name cannot be empty");
        }
      }
    }
    else{
      Alert.warning("Provide Complete Data")
    }
  }

  render() {
    const encryptedData = localStorage.getItem("encrypted");

    var courseNames = this.state.courseData.map((course) => (
      <option value={course.id} key={course.id}>
        {course.course_name}
      </option>
    ));

    var secNames = this.state.secData.map((sec) => (
      <option value={sec.id} key={sec.id}>
        {sec.title}
      </option>
    ));

    var subSectionNames = this.state.subsectionData.map((data) => (
      <option value={data.id} key={data.id}>
        {data.sub}
      </option>
    ));

    // if(localStorage.getItem("encrypted")!==null  && (this.state.currentUser !== null ? this.state.currentUser.default_role === "Instructor": true))
    if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Instructor")
      return (
        <div>
          <div className="container">
            <div className="card">
              <h5 className="card-header h-h5">Upload course content</h5>
              <div className="card-body">
                <form className="form-content">
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="form-group">
                        <select

                          className="form-select form-control"
                          onChange={this.getSection}
                          required
                        >
                          <option selected="selected" disabled>
                            Course
                          </option>
                          {courseNames}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="form-group">
                        <select
                          id="selectedsection"
                          className="form-select form-control"
                          onChange={this.getSubsection}
                          required
                        >
                          <option selected="selected" disabled>
                            Sections
                          </option>
                          {secNames}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="form-group">
                        <select
                          id="selectedsubsection"
                          className="form-select form-control"
                          onChange={this.setSubSection}
                          required
                        >
                          <option selected="selected" disabled>
                            Sub sections
                          </option>
                          {subSectionNames}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="cont">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <button className="btn btn-primary btn-blue w-100" onClick={this.showUploadPdf}> Upload PDF</button>
                      </div>
                      <div className="col-md-4 mb-3">
                        <button id="assignment" className="btn btn-primary btn-blue w-100" onClick={
                          this.showAssignment}
                        > Upload Assignment</button>
                      </div>

                      <div className="col-md-4 mb-3">
                        <button className="btn btn-primary btn-blue w-100" onClick={this.showUploadPresentation}
                          data-toggle="modal"
                          data-target="#pptpopup"> Upload Presentation</button>
                      </div>
                      <div className="col-md-4 mb-3">
                        <button id="assignment" className="btn btn-primary btn-blue w-100" onClick={
                          this.showSubSectionVideo}
                        > Upload Sub section video</button>
                      </div>

                      {/* {this.state.uploadPdf &&
                    <div className="row" >
                      <DataGridTableComponent
                        list={this.state.pdfList}
                        columns={this.state.columns}
                      ></DataGridTableComponent>
                    </div>
                    } */}
                      {this.state.isOpenQuiz && (
                        <div>
                          <QuizQuestion subSecId={this.state.subSectionId} />
                        </div>
                      )}

                      {this.state.isOpenBulkQuiz && (
                        <div>
                          <BulkUpload subSecId={this.state.subSectionId} />
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                {this.state.isOpenAssignment && (
                  <div>
                    <Assignment subSectionId={this.state.subSectionId} />
                  </div>
                )}

                {this.state.uploadPdf && (
                  <div className="form-display">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">
                          <label>Display Name</label>
                          <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="Name"
                            value={this.state.pdfName}
                            onChange={this.pdfNameHandler}
                            required
                          />
                          <div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="form-group">
                          <label for='pdf' style={{ backgroundColor: '#E9ECEF', border: '1px solid', color: 'black', padding: '0.5rem', cursor: 'pointer', marginTop: '1.8rem', marginLeft: '1rem', paddingLeft: '4rem', paddingRight: '4rem' }}>Upload </label>
                          <input type="file" className="form-control mb-2" id="pdf" onChange={this.changePdfHandler} accept="application/pdf" required hidden />
                          <span style={{ border: '1px solid ', padding: '0.75rem' }} className="ms-3" id="errpdf">No File Chosen</span></div>
                      </div>
                    </div>

                    <div className="btn-display">
                      <button
                        style={{ marginRight: "50px" }}
                        type="submit"
                        className="btn btn-primary btn-blue"
                        onClick={() => this.saveOrUpdatePdf()}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-blue"
                        onClick={() => this.resetState()}
                      >
                        Reset
                      </button>
                    </div>
                    <br />
                    <div className="form-assignment-dd">
                      <DataGridTableComponent
                        list={this.state.pdfList}
                        columns={this.state.columns}
                      ></DataGridTableComponent>
                    </div>
                  </div >
                )
                }
                {
                  this.state.uploadPresentation && (
                    <div className="form-display">
                      <div className="row">

                        <div className="col-md-5">
                          <label>Display Name</label>
                          <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="Name"
                            id="name"
                            value={this.state.pptName}
                            onChange={this.pptNameHandler}
                            required
                          />
                        </div>
                        <div className="col-md-7">
                          <label for='pdf' style={{ backgroundColor: '#E9ECEF', border: '1px solid', color: 'black', padding: '0.5rem', cursor: 'pointer', marginTop: '1.8rem', marginLeft: '1rem', paddingLeft: '4rem', paddingRight: '4rem' }}>Upload</label>
                          <input
                            type="file"
                            name="ppt"
                            id="pdf"
                            className="form-control mb-4"
                            placeholder="Course-ppt"
                            onChange={this.changePptHandler}
                            required hidden
                          />
                          <span style={{ border: '1px solid ', padding: '0.75rem' }} className="ms-3" id="errppt">No File Chosen</span>
                        </div>
                      </div>
                      <div className="btn-display">
                        <button
                          style={{ marginRight: "50px" }}
                          type="submit"
                          className="btn btn-primary btn-blue"

                          onClick={() => this.savePpt()}
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
                      <br />
                      <div className="form-assignment-dd">
                        <DataGridTableComponent
                          list={this.state.pptList}
                          columns={this.state.pptcolumns}
                        ></DataGridTableComponent>
                      </div>

                    </div>
                  )
                }
                {
                  this.state.uploadSubSectionVideo && (
                    <div className="form-display">
                      <div className="row">

                        <div className="col-md-5">
                          <label>Display Name</label>
                          <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="Name"
                            id="name"
                            value={this.state.subvideoName}
                            onChange={this.SubVideoNameHandler}
                            required
                          />
                        </div>
                        <div className="col-md-7">
                          <label for='videocreate' style={{ backgroundColor: '#E9ECEF', border: '1px solid', color: 'black', padding: '0.5rem', cursor: 'pointer', marginTop: '1.8rem', paddingLeft: '4rem', paddingRight: '4rem' }}>Upload Sub section Video</label>
                          <input
                            type="file"
                            name="ppt"
                            id="videocreate"
                            className="form-control mb-4"
                            placeholder="Course-ppt"
                            onChange={this.sub_vid_handler}
                            required hidden
                          />
                          <span style={{ border: '1px solid ', padding: '0.75rem' }} className="ms-3" id="errvideo">No File Chosen</span>
                        </div>
                      </div>
                      <div className="btn-display">
                        <button
                          style={{ marginRight: "50px" }}
                          type="submit"
                          className="btn btn-primary btn-blue"

                          onClick={() => this.saveSubVideo()}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-blue"
                          onClick={() => this.resetsubvideo()}
                        >
                          Reset
                        </button>
                      </div>
                      <div id="extVideo" style={{ marginTop: '25px', fontWeight: "bold" }}>
                        <span onClick={this.externalVideoLink.bind(this)} style={{ color: 'blue', fontWeight: 'bold', cursor: 'pointer' }}>Upload an external video instead</span>
                        <div id="videoInfo">
                          {this.state.extVideo ?
                            <div className="form-group mt-2">
                              <div className="row">
                                <div className="col-5">
                                  <label htmlFor="extVid" style={{ fontWeight: 'normal' }}>Display Name</label>
                                  <input className='form-control' type="text" name="dname" id="extVid" placeholder="Display Name" value={this.state.extVidName} onChange={this.changeExternalVideoNameHandler} />
                                </div>
                                <div className="col-7">
                                  <label htmlFor="vidlink" style={{ fontWeight: 'normal' }}>Video Url</label>
                                  <input type="text" name="vid" id="vidlink" className="form-control" placeholder="Video Link" value={this.state.extVidLink} onChange={this.changeExternalVideoLinkHandler} />
                                </div>
                              </div>
                              <div className="btn-display" style={{ marginTop: '25px' }}>
                                <button className="btn btn-primary btn-blue" type="submit" style={{ marginRight: '50px' }} onClick={this.saveExternalVideo.bind(this)}>Save</button>
                                <button className="btn btn-primary btn-blue" type="submit" onClick={this.resetsubvideo}>Reset</button>
                              </div>
                            </div>
                            : null}
                        </div>
                      </div>
                      <br />
                      <div className="form-assignment-dd">
                        <DataGridTableComponent
                          list={this.state.subvideoList}
                          columns={this.state.columnssubvideo}
                        ></DataGridTableComponent>
                      </div>

                    </div>
                  )
                }
              </div >
            </div >
          </div >
          <br />
        </div >
      );

    else {
      window.location.replace("/signIn")
      localStorage.clear();
    }
  }
}
export default UploadContent;
