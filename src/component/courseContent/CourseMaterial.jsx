import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import CourseSectionService from './courseSection/CourseSectionService';
import { Accordion, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';
import { Table } from 'react-bootstrap';
import LoadingIndicator from '../../common/LoadingIndicator';
import Discussion from './Discussion';
import AssignmentService from "../assignment/AssignmentService";
import './Discussion.css'
import CourseContentService from './CourseContentService';
import { Link } from 'react-router-dom'
import Encryption from '../Routing/Encryption';

class CourseMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: "",
      course_name: "",
      course_desc: "",
      course_img: "",
      course_video: "",
      course_id: "",
      section_id: "",
      sectionsAndSubsections: [],
      sections: [],
      subsections: [],
      loading: false,
      viewTab: false,
      pdfData: [],
      pdfhtml: "",
      quizhtml: "",
      content: "",
      viewPdf: false,
      viewPresentation: false,
      viewVideo: false,
      viewQuiz: false,
      display_name: "",
      quizId: [],
      assignmentBlockId: [],
      questions: [],
      options: [],
      correct_ans: [],
      openQuiz: false,
      sectionData: [],
      sec: "",
      assignmentId: [],
      assignmentQues: [],
      selectedFile: null,
      blockId: "",
      haveFile: false,
      tabledata: [],
      pptData: [],
      isOpenAssignment: false,
      subSectionId: "",
      lastvisted_subSectionId:"",
      subsecname: "",
      section_name: "",
      assignmentFile: null,
      // activeUser: {
      //   userid: localStorage.getItem("userId"),
      //   first_name: localStorage.getItem("first_name"),
      //   last_name: localStorage.getItem("last_name")
      // },
      pptMessage: "",
      pptNotUploaded: false,
      activeSwitch: false,
      pdfMessage: "",
      pdfNotUploaded: false,
      videoNotUploaded: false,
      videoMessage: '',
      assignmentMessage: "",
      assignmentNotUploaded: false,
      pdfContent: [],
      pptContent: [],
      assignmentContent: [],
      videoContent: [],
      videoData: [],
      curPpt: false,
      popUpPpt: null,
      pptPopUpData: [],
      pdfPopUpData: [],
      videoPopUpData: [],
      curPdf: false,
      popUpPdf: null,
      curVideo: false,
      popUpVideo: null,
      manyRecords: false,
      oneRecord: false,
      oneRecordPpt: false,
      oneRecordPdf: false,
      curExtVideo: false,
      popUpExtVideo: ''
    };
    
    // this.getCourseDesc = this.getCourseDesc.bind(this);
    // this.getCourseSection = this.getCourseSection.bind(this);
    this.setData = this.setData.bind(this);
    this.idAssignment = this.idAssignment.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.getCourseCompleteData = this.getCourseCompleteData.bind(this);
    this.getSubsectionData = this.getSubsectionData.bind(this);
    this.updateVisitedStatus = this.updateVisitedStatus.bind(this);
    // this.showPdf = this.showPdf.bind(this);
    // this.showPresentation = this.showPresentation.bind(this);
    // this.showQuiz = this.showQuiz.bind(this);
    // this.redirectToQuiz = this.redirectToQuiz.bind(this);
    // this.showAssignment = this.showAssignment.bind(this);
    // this.onFileChange = this.onFileChange.bind(this);
    // this.finalUploadAssignment = this.finalUploadAssignment.bind(this);
    
  }
  // async componentDidMount() {
  // this.setState({
  //   loading: true,
  // });
  //   await this.getCourseCompleteData();
  //   this.props.userAuthenticated(true);
  //   // await this.getCourseDesc();
  //   if (this.state.course_id !== null && this.state.course_id !== undefined) {
  //     // await this.getCourseSection();
  //     // this.getCourseSubSections();
  //     this.setData();
  //     this.showPresentation();
  //     this.setState({
  //       loading: false,
  //     });
  //     this.changePptActive();
  //   }
  // }

  changePptActive() {
    var test = document.getElementById('stsppt').classList.add('active')
  }

  // setData() {
  //   console.log(this.state)
  //   console.log(this.state.sections.length)
  //   if (this.state.sections.length > 0 && this.state.subsections.length > 0) {
  //     this.state.sections.map((data) => {
  //       if (data.course_id === this.state.course_id) {
  //         var test = [];
  //         this.state.subsections.map((value) => {
  //           if (Number(value.courseSub_id) === Number(data.id)) {
  //             test.push(value);
  //           }
  //         });
  //         this.state.sectionsAndSubsections.push({
  //           subsections: test,
  //           section: data.title,
  //         });
  //       }
  //     });
  //     // this.getCourseDesc = this.getCourseDesc.bind(this);
  //     // this.getCourseSection = this.getCourseSection.bind(this);
  //     this.setData = this.setData.bind(this);
  //     // this.showPresentation = this.showPresentation.bind(this);
  //     // this.showPdf = this.showPdf.bind(this);
  //     // this.showPresentation = this.showPresentation.bind(this);
  //     // this.showQuiz = this.showQuiz.bind(this);
  //     // this.redirectToQuiz = this.redirectToQuiz.bind(this);
  //     // this.showAssignment = this.showAssignment.bind(this);
  //     // this.onFileChange = this.onFileChange.bind(this);
  //     // this.finalUploadAssignment = this.finalUploadAssignment.bind(this);
  //   }
  // }
  // // getCourseDesc() {
  // //   CourseSectionService.getCourseDetails(
  // //     JSON.parse(localStorage.getItem("course_id"))
  // //   ).then((res) => {
  // //     console.log(res.data)
  // //     this.setState({
  // //       course_desc: res.data.course_des,
  // //       course_img: res.data.course_img,
  // //       org: res.data.organization,
  // //       course_name: res.data.course_name,
  // //       course_video: res.data.course_video,
  // //       course_id: res.data.id,
  // //     });
  // //   });
  // // }
  // async getCourseSection() {
  //   await CourseSectionService.getCourseSections().then((res) => {
  //     if (res.data !== null) {
  //       this.setState({
  //         sections: res.data.sections,
  //         section_id: res.data.id,
  //       });
  //     } else {
  //       Alert.warning(
  //         "Sections are not available for",
  //         +this.state.course_name
  //       );
  //     }
  //   });
  // }console.log(data);

  // getCourseSubSections() {
  //   CourseSectionService.getCourseSubSection().then((res) => {
  //     console.log(res)
  //     if (res.data !== null) {
  //       this.setState({
  //         subsections: res.data.subsections,
  //         subSectionId: res.data.subsections[0].id
  //       });
  //       console.log("id" + this.state.subsections)
  //     } else {
  //       Alert.warning(
  //         "Sections are not available for",
  //         +this.state.course_name
  //       );
  //     }
  //   });
  // }
componentWillUnmount(){
  this.defaultSubsection();
  // window.removeEventListener('beforeunload', this.defaultSubsection);
  // window.addEventListener('beforeunload', this.defaultSubsection);

}
  async componentDidMount() {
  
    
    this.setState({
      loading: true,
    });
    this.props.userAuthenticated(true);
    await this.getCourseCompleteData();
    await this.ChangedefaultSubsection();
    this.setData();
    this.setState({
      loading: false
    });
    console.log(this.state.subSectionId);
    if(this.state.subSectionId !== ''){
    document.getElementById(this.state.subSectionId).style.color='#495057'}
    this.changePptActive();
    this.getSubsectionData(this.state.subSectionId);
    this.showPresentation();
    this.updateVisitedStatus();
  }
  updateVisitedStatus() {
    const encryptedData = localStorage.getItem("encrypted");
    if (encryptedData) {
      let userData = new Encryption().decrypt(encryptedData);
      if (new Encryption().decrypt(encryptedData).userId !== null) {
        CourseContentService.changeCourseVisited(new Encryption().decrypt(encryptedData).userId, localStorage.getItem('course_id')).then((res) => {
        })
      }
    }
  }
  async defaultSubsection(){
    const formdata = new FormData;
    formdata.append('id', localStorage.getItem('course_id'))
    formdata.append('subsection_id', this.state.subSectionId)
    await CourseContentService.defaultsubId(formdata).then((res) => {
  });
}

async ChangedefaultSubsection(){
  await CourseContentService.setdefaultsubId(localStorage.getItem('course_id')).then((res) => {
    console.log(res);
    // switch(res.status){
    //  case 'true':{  
      if(res.length!==0){
      this.setState({
      subSectionId:res[0].subsection_id

    })
   
  }
  
  // }
// }
    console.log(this.state.subSectionId); 
    console.log(localStorage.getItem('course_id'));
  });
  // this.changesubColor(this.state.subSectionId)

}
  async getCourseCompleteData() {
    await CourseContentService.getCompleteData(localStorage.getItem('course_id')).then((res) => {
      console.log(res);
      const subSec = []
      if (res.sections.length != 0) {
        res.sections.map((x) => {
          let temp = x.subSection
          temp.map((data) => {
            subSec.push(data)
          })
        })
      }
      if (res.sections.length != 0 && subSec.length != 0) {
        this.setState({
          course_desc: res.course_des,
          course_img: res.course_img,
          org: res.organization,
          course_name: res.course_name,
          course_video: res.course_video,
          course_id: res.id,
          sections: res.sections,
          subsections: subSec,
          subSectionId: res.sections[0].subSection[0].id,
          });
      }
      else {
        this.setState({
          course_desc: res.course_des,
          course_img: res.course_img,
          org: res.organization,
          course_name: res.course_name,
          course_video: res.course_video,
          course_id: res.id,
          sections: res.sections,
          subsections: subSec,
        });
      }
    })
  }
  setData() {
    if (this.state.sections.length > 0 && this.state.subsections.length > 0) {
      this.state.sections.map((data) => {
        if (data.course_id === this.state.course_id) {
          var test = [];
          this.state.subsections.map((value) => {
            if ((Number(value.courseSub_id) === Number(data.id))) {
              test.push(value);
            }
          });
          this.state.sectionsAndSubsections.push({
            subsections: test,
            section: data.title,
          });
        }
      });
    }
  }

  getSubsectionData(id) {
    let allPptSubSections = []
    let allPdfSubSections = []
    let allAssignmentSubSections = []
    let allPresentations = []
    let allPdf = []
    let allAssignment = []
    let pdf = []
    let ppt = []
    let assignment = []
    let allVideoSubSections = []
    let allVideo = []
    let video = []
    this.state.subsections.map((x) => {
      allPptSubSections.push(x.ppt)
      allPdfSubSections.push(x.pdf)
      allAssignmentSubSections.push(x.assignment)
      allVideoSubSections.push(x.subVideo)
    })
    allPptSubSections.map((x) => {
      x.map((data) => {
        if (data != null && data != undefined && data.courseSubSection == id) {
          ppt.push(data)
          allPresentations.push(data.ppt)
        }
      })
    });
    allPdfSubSections.map((x) => {
      x.map((data) => {
        if (data != null && data != undefined && data.courseSubSection == id) {
          pdf.push(data)
          allPdf.push(data.pdf)
        }
      })
    });
    allAssignmentSubSections.map((x) => {
      x.map((data) => {
        if (data != null && data != undefined && data.subsectionid == id) {
          assignment.push(data)
          allAssignment.push(data)
        }
      })
    });
    allVideoSubSections.map((x) => {
      x.map((data) => {
        if (data != null && data != undefined && data.courseSubSection == id) {
          allVideo.push(data.subVideo);
          video.push(data);
        }
      });
    });
    this.setState({
      pptData: allPresentations,
      pdfData: allPdf,
      tabledata: allAssignment,
      subSectionId: id,
      pdfContent: pdf,
      pptContent: ppt,
      assignmentContent: assignment,
      videoData: allVideo,
      videoContent: video,
    })
    this.addPopUpButton(ppt, pdf, video);
  }

  addPopUpButton(ppt, pdf, video) {
    if (ppt.length == 1) {
      this.setState({
        popUpPpt: ppt[0].ppt
      })
    }
    var pptPopUp = ppt.map((x, i) => {
      return (
        x.popUpButton = (
          <>
            <div className="row pt-2">
              <div className="col-6">
                <h5> {x.display_name}</h5>
              </div>
              <div className="col-6">
                <button className="btn btn-md btn-primary mb-3" onClick={this.getCurrentPpt.bind(this, x.ppt)}>View</button>
              </div>
            </div>
            <hr />
          </>
        )
      )
    })

    if (pdf.length == 1) {
      this.setState({
        popUpPdf: pdf[0].pdf
      })
    }
    var pdfPopUp = pdf.map((x, i) => {
      return (
        x.popUpButton = (
          <>
            <div className="row pt-2">
              <div className="col-6">
                <h5>{x.display_name}</h5>
              </div>
              <div className="col-6">
                <button className="btn btn-md btn-primary mb-3" onClick={this.getCurrentPdf.bind(this, x.pdf)}>View</button>
              </div>
            </div>
            <hr />
          </>
        )
      )
    })

    if (video.length == 1) {
      this.setState({
        popUpVideo: video[0].subVideo
      })
    }
    else {
      var videoPopUp = video.map((x, i) => {
        return (
          x.popUpButton = (
            <>
              <div className="row pt-2">
                <div className="col-6">
                  <h5>{x.subvideoName}</h5>
                </div>
                <div className="col-6">
                  <button className="btn btn-md btn-primary mb-3" onClick={this.getCurrentVideo.bind(this, x.subVideo, x.external)}>View</button>
                </div>
              </div>
              <hr />
            </>
          )
        )
      })
    }
    this.setState({
      pptPopUpData: pptPopUp,
      pdfPopUpData: pdfPopUp,
      videoPopUpData: videoPopUp
    })
  }

  getCurrentPdf(pdf) {
    this.setState({
      curPdf: true,
      popUpPdf: pdf
    })
    
  }

  getCurrentPpt(ppt) {
    this.setState({
      curPpt: true,
      popUpPpt: ppt
    })
  }

  getCurrentVideo(video, external) {
    if (external == false) {
      this.setState({
        curVideo: true,
        popUpVideo: video
      })
    }
    else {
      let fixVid = video.replace('watch?v=', 'embed/')
      this.setState({
        curExtVideo: true,
        popUpExtVideo: fixVid
      })
    }
  }
  changesubColor(id){
    
    console.log(this.state.subSectionId);
    console.log(id);
    if(id!==this.state.subSectionId){
    document.getElementById(id).style.color = "#495057";
    document.getElementById(this.state.subSectionId).style.color = "#22B1EE";
    }
   
   
}
  idAssignment(id, sub, sec) {
    this.changesubColor(id)
    this.setState({
      subSectionId: id,
      subsecname: sub,
      section_name: sec,
      viewPresentation: false,
      viewPdf: false,
      isOpenAssignment: false,
      viewVideo: false,
      manyRecords: false,
      oneRecord: false,
      oneRecordPpt: false,
      oneRecordPdf: false
    });
   this.changesubColor(id)
    this.getSubsectionData(id);
  }


  showAssignment() {
    if (this.state.subSectionId !== "") {
      if (this.state.tabledata.length == 0) {
        this.setState({
          assignmentMessage: "No Assignment available for this subsection",
          assignmentNotUploaded: true,
          isOpenAssignment: true,
          viewPdf: false,
          viewPresentation: false,
          viewVideo: false,
          tabledata: [],
          oneRecord: false,
          oneRecordPpt: false,
          oneRecordPdf: false
        })
      }
      if (this.state.tabledata.length != 0) {
        this.setState({
          assignmentNotUploaded: false,
          assignmentMessage: '',
          isOpenAssignment: true,
          viewPdf: false,
          viewPresentation: false,
          viewVideo: false,
          oneRecord: false,
          oneRecordPpt: false,
          oneRecordPdf: false
        });
      }
    }
    else {
      Alert.info("Please! Select the sub-course!")
    }
  }

  assignmentHandler(e) {
    this.setState({
      assignmentFile: e.target.files[0]
    })
  }

  assignmentFile() {
    const encryptedData = localStorage.getItem("encrypted");
    const formdata = new FormData;
    formdata.append('assignmentfile', this.state.assignmentFile)
    formdata.append("userid", new Encryption().decrypt(encryptedData).userId)
    formdata.append('subsecid', this.state.subSectionId)
    formdata.append('first_name', new Encryption().decrypt(encryptedData).first_name)
    formdata.append('subsecName', this.state.subsecname)
    formdata.append('secName', this.state.section_name)
    formdata.append('courseName', this.state.course_name)


    AssignmentService.saveAssignmentfile(formdata).then((res) => {
      switch (res.success) {
        case "True": {
          Alert.success(res.message);
          break;
        }
        default:
          Alert.warning(res.fail);
          break;
      }
    })
  }

  showPresentation() {
    if (this.state.subSectionId != '') {
      if (this.state.pptData.length > 1) {
        this.setState({
          viewPresentation: true,
          viewPdf: false,
          viewVideo: false,
          isOpenAssignment: false,
          pptNotUploaded: false,
          pptMessage: '',
          oneRecord: false,
          oneRecordPpt: false,
          manyRecords: true,
          oneRecordPdf: false
        });
      }
      if (this.state.pptData.length == 1) {
        this.setState({
          viewVideo: false,
          viewPdf: false,
          viewPresentation: true,
          isOpenAssignment: false,
          videoNotUploaded: false,
          videoMessage: '',
          manyRecords: false,
          oneRecordPpt: true,
          oneRecord: false,
          oneRecordPdf: false
        });
      }
      if (this.state.pptData.length == 0) {
        this.setState({
          pptMessage: "PPT not available for this subsection.",
          pptNotUploaded: true,
          viewPresentation: true,
          viewPdf: false,
          isOpenAssignment: false,
          viewVideo: false,
          oneRecord: false,
          oneRecordPpt: false,
          manyRecords: true,
          oneRecordPdf: false
        })
      }
    }
    else {
      Alert.info("Select a sub-section first.");
    }
  }

  showPdf() {
    if (this.state.subSectionId != '') {
      if (this.state.pdfData.length > 1) {
        this.setState({
          viewPdf: true,
          viewPresentation: false,
          isOpenAssignment: false,
          viewVideo: false,
          pdfNotUploaded: false,
          pdfMessage: '',
          oneRecord: false,
          oneRecordPpt: false,
          oneRecordPdf: false,
          manyRecords: true
        });
      }
      if (this.state.pdfData.length == 1) {
        this.setState({
          viewPdf: true,
          viewPresentation: false,
          isOpenAssignment: false,
          viewVideo: false,
          pdfNotUploaded: false,
          pdfMessage: '',
          oneRecord: false,
          oneRecordPpt: false,
          oneRecordPdf: true,
          manyRecords: false
        });
      }
      if (this.state.pdfData.length == 0) {
        this.setState({
          pdfMessage: "No PDF available for this subsection",
          pdfNotUploaded: true,
          isOpenAssignment: false,
          viewPresentation: false,
          viewVideo: false,
          viewPdf: true,
          oneRecord: false,
          oneRecordPpt: false,
          manyRecords: true,
          oneRecordPdf: false
        })
      }
    }
    else {
      Alert.info("Select a sub-section first.");
    }
  }

  showVideo() {
    if (this.state.subSectionId != '') {
      if (this.state.videoData.length > 1) {
        this.setState({
          viewVideo: true,
          viewPdf: false,
          viewPresentation: false,
          isOpenAssignment: false,
          videoNotUploaded: false,
          videoMessage: '',
          manyRecords: true,
          oneRecord: false,
          oneRecordPpt: false,
          oneRecordPdf: false,
        });
      }
      if (this.state.videoData.length == 1) {
        this.setState({
          viewVideo: true,
          viewPdf: false,
          viewPresentation: false,
          isOpenAssignment: false,
          videoNotUploaded: false,
          videoMessage: '',
          manyRecords: false,
          oneRecord: true,
          oneRecordPpt: false,
          oneRecordPdf: false
        });
      }
      if (this.state.videoData.length == 0) {
        this.setState({
          videoMessage: "No Video available for this subsection",
          videoNotUploaded: true,
          isOpenAssignment: false,
          viewPresentation: false,
          viewPdf: false,
          viewVideo: true,
          oneRecord: false,
          manyRecords: true,
          oneRecordPpt: false,
          oneRecordPdf: false
        })
      }
    }
  }

  closeWindow() {
    this.setState({
      curPpt: false,
      curPdf: false,
      curVideo: false,
      curExtVideo: false,
    })

  }

  // openPdf(id) {
  // CourseContentService.showPdf(id).then(Data => {
  //   Data.data.map((x) => {
  //     if (x != null) {
  //       this.setState({
  //         pdfData: [...this.state.pdfData, x.pdf],
  //         loading: false,
  //       });
  //     }
  //     else {
  //       this.setState({
  //         pdfMessage: Data.message,
  //         pdfNotUploaded: true
  //       })
  //     }
  //   })
  //   if (Data.success == 'true') {
  //     this.setState({
  //       pdfData: Data.data,
  //       pdfhtml: Data.data.pdf,
  //       loading: false
  //     });
  //   }
  //   else {
  //     this.setState({
  //       pdfMessage: Data.message,
  //       pdfNotUploaded: true
  //     })
  //   }course_video
  // })
  //   if(this.state.subSectionId == id && this.state.pdfData.length != 0){

  //   }
  // }
  // async showPdf(courseData) {

  //     await this.setState({ loading: true, viewTab: true, viewPdf: false, viewPresentation: false })

  //     await courseData.forEach((data) => {
  //         if (data.display_name.includes('PDF')) {
  //             CourseSectionService.showCourseSectionData(data.id).then((res) => {
  //                 // this.setState({ loading: true });
  //                 this.setState({
  //                     content: res.data.content
  //                 })
  //                 // removing \ from api response
  //                 var text = this.state.content.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');

  //                 // extracting src value from iframe
  //                 var el = document.createElement('html');
  //                 el.innerHTML = text;
  //                 this.setState({
  //                     pdfhtml: el.getElementsByTagName('iframe')[0].outerHTML.split(' ')[1].split('"')[1],
  //                     viewPdf: true,
  //                     loading: false
  //                 })
  //             })
  //         }

  //     })
  //     this.setState({
  //         content: "",
  //         viewAssignment: false,
  //         viewPresentation: false
  //     })
  // }

  // async showPresentation(courseData, data) {
  //     await this.setState({ sectionData: courseData, sec: data, loading: true, viewTab: true, viewPdf: false, viewAssignment: false })
  //     courseData.forEach((data) => {
  //         if (data.display_name.includes('Presentation')) {
  //             CourseSectionService.showCourseSectionData(data.id).then((res) => {
  //                 this.setState({ loading: true });
  //                 this.setState({
  //                     content: res.data.content
  //                 })

  //                 var text = this.state.content.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');

  //                 var el = document.createElement('html');
  //                 el.innerHTML = text;
  //                 this.setState({
  //                     presentationhtml: el.getElementsByTagName('iframe')[0].outerHTML.split(' ')[1].split('"')[1],
  //                     viewPresentation: true,
  //                     loading: false
  //                 })
  //             })
  //         }

  //     })

  //     this.setState({
  //         content: "",
  //         viewAssignment: false,
  //     })
  //     this.showQuiz(courseData)
  // }

  // showQuiz(quizData) {
  //     quizData.forEach((data) => {
  //         if (data.display_name.includes('Question')) {
  //             this.state.quizId.push(data.id)
  //         }
  //     })
  //     this.state.quizId.forEach((id, index) => {
  //         CourseSectionService.showCourseSectionData(id).then((res) => {
  //             this.setState({
  //                 content: res.data.content
  //             })
  //             var text = this.state.content.replace(/\\\/|\/\s*(?:\\\/|[^\/\*\n])+\/|\\"|"(?:\\"|[^"])*"|\\'|'(?:\\'|[^'])*'|\\`|`(?:\\`|[^`])*`|/);
  //             var el = document.createElement('html');
  //             el.innerHTML = text;
  //             var o = {
  //                 choice_0: el.innerHTML.split('label')[7].split('>')[1].split('\n')[0], choice_1: el.innerHTML.split('label')[13].split('>')[1].split('\n')[0],
  //             }
  //             if (el.innerHTML.split('label')[19] != null) o.choice_2 = el.innerHTML.split('label')[19].split('>')[1].split('\n')[0];
  //             if (el.innerHTML.split('label')[25] != null) o.choice_3 = el.innerHTML.split('label')[25].split('>')[1].split('\n')[0];
  //             this.state.options.push(o);

  //             var quizhtml = el.innerHTML.split('legend')[3].split('>')[1].split('<')[0];
  //             this.state.questions.push(quizhtml);

  //         })

  //         CourseSectionService.checkAns(JSON.parse(localStorage.getItem("course_id")), id).then((res) => {
  //             if (res.data.answers !== null && res.data.answers !== undefined) {
  //                 var key = Object.values(res.data.answers)[0][0];
  //                 this.state.correct_ans.push(key);
  //             }
  //         })
  //     })
  //     this.setState({
  //         viewQuiz: true,
  //         content: "",
  //     })
  // }

  // async showAssignment(data) {
  //     await this.setState({
  //         assignmentQues: [],
  //         assignmentId: [],
  //         viewPresentation: false,
  //         viewPdf: false,
  //     })
  //     data.forEach((assignmentData) => {
  //         if (assignmentData.display_name.includes('Assignment')) {
  //             this.state.assignmentId.push(assignmentData.id)
  //         }
  //     })
  //     this.state.assignmentId.forEach(async (id) => {
  //         await CourseSectionService.showCourseSectionData(id).then((res) => {
  //             this.setState({
  //                 content: res.data.content,
  //             })
  //             var text = this.state.content.replace(/\\\/|\/\s*(?:\\\/|[^\/\*\n])+\/|\\"|"(?:\\"|[^"])*"|\\'|'(?:\\'|[^'])*'|\\`|`(?:\\`|[^`])*`|/);
  //             var el = document.createElement('html');
  //             el.innerHTML = text;
  //             var assignmenthtml = el.innerHTML.split('strong')[3].split('>')[1].split('<')[0];
  //             this.state.assignmentQues.push(assignmenthtml);
  //         })
  //     })
  //     await CourseSectionService.showCourseSectionData(this.state.sec.id).then((res) => {
  //         this.setState({
  //             content: res.data.content,
  //         })
  //         this.state.assignmentBlockId.length = 0
  //         var text = this.state.content.replace(/\\\/|\/\s*(?:\\\/|[^\/\*\n])+\/|\\"|"(?:\\"|[^"])*"|\\'|'(?:\\'|[^'])*'|\\`|`(?:\\`|[^`])*`|/);
  //         var el = document.createElement('html');
  //         el.innerHTML = text;
  //         var assinmentblockid = el.innerHTML.split('+type@edx_sga+');
  //         if (assinmentblockid.length > 0) {
  //             assinmentblockid.map((data, index) => {
  //                 if (Number(index) % 2 !== 0) {
  //                     var datarep = data.replace('">');
  //                     if (datarep.includes("undefined")) {
  //                         var text = datarep.split("undefined")
  //                         this.state.assignmentBlockId.push(text[0]);
  //                     }
  //                 }
  //             })
  //         }
  //     })

  //     await this.setState({
  //         content: "",
  //         viewPresentation: false,
  //         viewPdf: false,
  //         viewAssignment: true,
  //     })

  // }

  // async onFileChange(id, event) {
  //     await this.setState({
  //         selectedFile: event.target.files[0],
  //         viewSubmitBtn: true,
  //         blockId: JSON.parse(localStorage.getItem("course_id")).replace('course', 'block')
  //     });
  //     let formData = new FormData();
  //     formData.append("assignment", this.state.selectedFile);
  //     CourseSectionService.uploadAssignment(JSON.parse(localStorage.getItem("course_id")), this.state.blockId, id, formData).then((res) => {
  //         switch (res.data.upload_allowed) {
  //             case true: {
  //                 this.setState({
  //                     haveFile: true
  //                 })
  //             }
  //         }
  //     }).catch(error => {
  //         Alert.warning("You have already Submitted Assignment !!!")
  //     })
  // };

  // finalUploadAssignment(id) {
  //     if (this.state.haveFile) {
  //         CourseSectionService.finalUploadAssignment(JSON.parse(localStorage.getItem("course_id")), this.state.blockId, id).then((res) => {
  //             if (res.status === 200) {
  //                 Alert.success("Assignment Uploaded Successfully")
  //             }
  //             else {
  //                 Alert.warning("You have already Submitted Assignment")
  //             }
  //         })
  //     }
  //     else {
  //         Alert.warning("Please Select a file first")
  //     }
  // }

  // redirectToQuiz() {
  //     this.setState({
  //         openQuiz: true
  //     })
  // }

  render() {
    {
      (window.onclick = (e) => {
        console.log(e.target.id);
  
        if (e.target.id === "logout") {
          this.defaultSubsection();
        }
      })
    }
    
   
    if (this.state.loading) {
      return <LoadingIndicator />;
    }
    // if (this.state.openQuiz) {
    //     return (
    //         <Redirect to={{ pathname: "/quiz", state: { from: this.props.location }, questions: this.state.questions, options: this.state.options, correct_ans: this.state.correct_ans }} />
    //     )
    // }
  
    const encryptedData = localStorage.getItem("encrypted");
    if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Student")
      return (
        // <div className="scroll">
          <div class="container-fluid" id="container-wrapper">
            <h2 class="heading-2 mb-4">Course Material</h2>
            <div class="row">
              <div class="col-sm-8">
                <div class="card mb-4" style={{ height: "92%" }}>
                  <div class="card-body course-details">
                    <div class="row">
                      <div class="col-sm-2">
                        <div class="coures-logo">
                          <img
                            src={this.state.course_img}
                            alt="img"
                            width="100%"
                          />
                        </div>
                      </div>
                      <div class="col-sm-10">
                        <div class="coures-name p-2">
                          <h2>{this.state.course_name}</h2>
                          <p class="small">{this.state.org}</p>
                          <p class="short-text">{this.state.course_desc} </p>
                        </div>
                      </div>
                      <div class="clear-fix"></div>
                    </div>
                  </div>
                </div>
              </div>
              {
      (window.onclick = (e) => {
        console.log(e.target.id);
  
        if (e.target.id === "logout") {
          this.defaultSubsection();
        }
      })
    }

              <div class="col-sm-4">
                <div class="card mb-4">
                  <div class="card-body video-in p-0">
                    <video
                      // src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                      src={this.state.course_video}
                      controls
                    ></video>
                  </div>
                </div>
              </div>

              <div class="clear-fix"></div>
            </div>

            {/* <div>
                        <Discussion />
                    </div> */}

            <div class="row">
              <div class="col-sm-12">
                <div class="card mb-4">
                  <div class="card-body course-tab">
                    <h3 class="heading3">
                      Getting Started with {this.state.course_name}.
                    </h3>

                    <div class="row mt-4">
                      <div class="col-sm-4">
                        <Accordion defaultActiveKey="0">
                          {this.state.sectionsAndSubsections.length > 0 ? (
                            this.state.sectionsAndSubsections.map((data, i) => (
                              <div class="tab-in">
                                <Accordion.Toggle
                                  as={Card.Header}
                                  eventKey="0"
                                  class="nav flex-column nav-pills"
                                  id="v-pills-tab"
                                  role="tablist"
                                  aria-orientation="vertical"
                                >
                                  <p>
                                    {i + 1}. {data.section}
                                  </p>
                                </Accordion.Toggle>

                                {data.subsections.length > 0 &&
                                  data.subsections.map((val, i) => {
                                    return (
                                      <Accordion.Collapse eventKey="0" id="subSecCss">
                                        <a
                                        // style={{textDecoration:"none"}}
                                          class="nav-link"
                                          id={val.id}
                                          href="#v-pills-1"
                                          role="tab"
                                          aria-controls="v-pills-1"
                                          aria-selected="true"
                                          onClick={() => this.idAssignment(val.id, val.sub, data.section)}
                                        >
                                          <i class="far fa-angle-double-right"></i>

                                          {val.sub}
                                        </a>
                                      </Accordion.Collapse>
                                    );
                                  })}
                              </div>
                            ))
                          ) : (
                            <p>Sections are not available for this course</p>
                          )}
                        </Accordion>
                      </div>

                      <div class="col-sm-8">
                        {/* {this.state.viewTab &&  */}
                        <div>
                          <ul class="nav nav-tabs">
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                id="v-pills-1-tab"
                                href="#v-pills-1"
                                role="tab"
                                data-toggle="tab"
                                onClick={() => {
                                  this.showVideo();
                                }}

                              >
                                Videos{" "}
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                id='stsppt'
                                class="nav-link"
                                href="#"
                                data-toggle="tab"
                                onClick={() => {
                                  this.showPresentation();
                                }}
                              >
                                Presentation
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                id="pdfsts"
                                href="#v-pills-1"
                                role="tab"
                                data-toggle="tab"
                                onClick={() => {
                                  this.showPdf();
                                }}
                              >
                                PDF
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                id="v-pills-1-tab"
                                href="#v-pills-1"
                                role="tab"
                                data-toggle="tab"
                                onClick={() => {
                                  this.showAssignment();
                                }}

                              >
                                Assignment{" "}
                              </a>
                            </li>
                          </ul>
                        </div>
                        {this.state.isOpenAssignment && (
                          <div className='tab-content-in'>
                            {this.state.assignmentNotUploaded ? (
                              <div>{this.state.assignmentMessage}</div>
                            )
                              :
                              <div>{this.state.tabledata.map((x) => {
                                return (
                                  <><h4 className='m-4 p-2' style={{ textAlign: 'center' }}>{x.display_name}</h4>
                                    <div className="row">
                                      {/* <div className="col-7"> */}
                                      <p>Q. {x.question} ?<span className='ps-3' style={{ fontWeight: 'bold', fontSize: '15px' }}></span></p>
                                      {/* </div> */}
                                      <div className="row">
                                        <div className="col-5" style={{ display: 'flex' }}>
                                          <input
                                            type="file"
                                            name="file"
                                            className="pull-left"
                                            onChange={this.assignmentHandler.bind(this)}
                                          /></div>
                                        <div className="col-5" style={{ display: 'flex' }}>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-learn"
                                            onClick={this.assignmentFile.bind(this)}
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                  </>
                                )
                              })}</div>
                            }
                          </div>

                        )}
                        {/* } */}
                        {(this.state.viewPresentation) && this.state.manyRecords ? (
                          <div>
                            <div class="tab-text">
                              <div class="tab-content" id="v-pills-tabContent">
                                <div
                                  class="tab-pane fade show active"
                                  id="v-pills-1"
                                  role="tabpanel"
                                  aria-labelledby="v-pills-1-tab"
                                >
                                  <div class="tab-content-in">
                                    {this.state.pptNotUploaded ? (
                                      <div>{this.state.pptMessage}</div>
                                    )
                                      :
                                      this.state.pptPopUpData
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) :
                          this.state.oneRecordPpt ?
                            <iframe
                              src={'https://view.officeapps.live.com/op/embed.aspx?src=' + this.state.popUpPpt + '#toolbar=0'}
                              title="presentation"
                              style={{ width: "100%", height: "600px" }}
                              allowFullScreen={true}
                            ></iframe>
                            : null
                        }
                        {this.state.curPpt ?
                          <div className="card position-fixed"
                            style={{
                              height: "90vh",
                              width: "60vw",
                              top: "60px",
                              left: "20vw",
                              zIndex: 5,
                              boxShadow: '6px 6px 6px #8e8e8e, -6px -6px 6px #fff'
                            }}>
                            <i class="fas fa-times" style={{ fontSize: '20px', marginLeft: '98%' }} onClick={this.closeWindow}></i><iframe
                              src={'https://view.officeapps.live.com/op/embed.aspx?src=' + this.state.popUpPpt + '#toolbar=0'}
                              title="presentation"
                              style={{ width: "100%", height: "900px" }}
                              allowFullScreen={true}
                            ></iframe>
                          </div>
                          : null}
                        {this.state.viewPdf && this.state.manyRecords ? (
                          <div class="tab-text">
                            <div class="tab-content" id="v-pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="v-pills-1"
                                role="tabpanel"
                                aria-labelledby="v-pills-1-tab"
                              >
                                <div class="tab-content-in">
                                  {this.state.pdfNotUploaded ? (
                                    <div>{this.state.pdfMessage}</div>
                                  ) :
                                    this.state.pdfPopUpData
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ) :
                          this.state.oneRecordPdf ?
                            <iframe
                              src={this.state.popUpPdf + '#toolbar=0'}
                              title="pdf"
                              style={{ width: "100%", height: "600px" }}
                            ></iframe>
                            : null}{" "}
                        {this.state.curPdf ?
                          <div className="card position-fixed"
                            style={{
                              height: "90vh",
                              width: "42vw",
                              top: "60px",
                              left: "30vw",
                              zIndex: 5,
                              boxShadow: '6px 6px 6px #8e8e8e, -6px -6px 6px #fff'
                            }}>
                            <i class="fas fa-times" style={{ fontSize: '20px', marginLeft: '98%' }} onClick={this.closeWindow}></i><iframe
                              src={this.state.popUpPdf + '#toolbar=0'}
                              title="pdf"
                              style={{ width: "100%", height: "800px" }}
                            ></iframe>

                          </div>
                          : null}
                        {this.state.viewVideo && this.state.manyRecords ? (
                          <div class="tab-text">
                            <div class="tab-content" id="v-pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="v-pills-1"
                                role="tabpanel"
                                aria-labelledby="v-pills-1-tab"
                              >
                                <div class="tab-content-in">
                                  {this.state.videoNotUploaded ? (
                                    <div>{this.state.videoMessage}</div>
                                  ) :
                                    this.state.videoPopUpData
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ) :
                          this.state.oneRecord ?
                            <video
                              src={this.state.popUpVideo} height='600px' width='100%'
                              controls controlsList='nodownload'
                            ></video>
                            : null
                        }{" "}
                        {this.state.curVideo ?
                          <div className="card position-fixed"
                            style={{
                              height: "70vh",
                              width: "60vw",
                              top: "80px",
                              left: "23vw",
                              zIndex: 5,
                              boxShadow: '6px 6px 6px #8e8e8e, -6px -6px 6px #fff'
                            }}>
                            <i class="fas fa-times" style={{ fontSize: '20px', marginLeft: '98%' }} onClick={this.closeWindow}></i>
                            <video
                              // src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                              src={this.state.popUpVideo} height='900px' width='100%'
                              controls controlsList='nodownload'
                            ></video>
                          </div>
                          : this.state.curExtVideo ?
                            <div className="card position-fixed"
                              style={{
                                height: "70vh",
                                width: "60vw",
                                top: "80px",
                                left: "23vw",
                                zIndex: 5,
                                boxShadow: '6px 6px 6px #8e8e8e, -6px -6px 6px #fff'
                              }}>
                              <i class="fas fa-times" style={{ fontSize: '20px', marginLeft: '98%' }} onClick={this.closeWindow}></i>
                              <iframe width="100%" height="900px" src={this.state.popUpExtVideo} sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                            </div>
                            : null}
                        {/* {this.state.viewAssignment ? (
                        <div>
                          {this.state.assignmentQues.map((data, i) => (
                            <div className="ml-3">
                              <b>{data}</b>
                              <br />
                              {this.state.assignmentBlockId
                                .slice(i, i + 1)
                                .map((id) => {
                                  return (
                                    <div>
                                      <input
                                        type="file"
                                        name="file"
                                        className="inputfile mb-2"
                                        onChange={(e) =>
                                          this.onFileChange(id, e)
                                        }
                                      />
                                      <br />
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-blue mb-4"
                                        onClick={() => {
                                          this.finalUploadAssignment(id);
                                        }}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  );
                                })}
                            </div>
                          ))}
                        </div>
                      ) : null} */}
                      </div>
                      <div class="clear-fix"></div>
                      {/* {this.state.isOpenAssignment && (
                      <div>
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Display Name</th>
                              <th>Question</th>
                              <th>Question Type</th>
                            </tr>
                          </thead>
                          <tbody>{tabledata}</tbody>
                        </Table>
                      </div>
                    )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="clear-fix"></div>
              <div>
                <Discussion />
              </div>
            </div>
          </div>
        // </div>
      );
    else {
      window.location.replace("/signIn")
      localStorage.clear();
    }
  }
}

export default  CourseMaterial;
