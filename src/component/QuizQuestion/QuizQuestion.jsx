import React, { Component } from 'react'
import '../course.css'
import { MDBDataTable } from 'mdbreact';
import CourseSubSecService from '../CourseSubSec/courseSubSecService';
import Alert from 'react-s-alert';
import CourseFormService from '../Course/courseFormService';
import CourseSecService from '../CourseSec/courseSecService';
import QuizQuestionService from '../QuizQuestion/QuizQuestionService'
export default class QuizQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            sub: '',
            secId: null,
            subSecId: this.props.subSecId,
            courseId: null,
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: "",

            courseData: [],
            secData: [],
            subData: [],

            coloums: [
                {
                    label: "SubSection Name",
                    field: "sub",
                    width: 100,
                },
                {
                    label: "Edit",
                    field: "edit",
                    width: 100,
                },
                {
                    label: "Delete",
                    field: "delete",
                    width: 100,
                },

            ],
            rows: [],
            Course: [],


            editing: false,
        };
        this.sub_handler = this.sub_handler.bind(this);
    }

    componentDidMount() {
        this.getCourseData()
        // this.getSubData()
        // this.props.userAuthenticated(true);
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }

    sub_handler(e) {

        this.setState({ sub: e.target.value })


    }

    getSubData(e) {
        this.setState({ secId: e.target.value })
        console.log(e.target.value)

        CourseSubSecService.getSubData(e.target.value)
            .then(Data => {


                this.setState({ subData: Data })
                console.log(this.state.subData)
            })
    }
    getSubSecData(e) {
        this.setState({ subSecId: e.target.value })
        console.log(e.target.value)


    }

    getCourseData() {
        CourseFormService.getCourseData()
            .then(Data => {

                this.setState({ courseData: Data })
                console.log(this.state.courseData)

            })

    }


    getSecData(e) {
        this.setState({ courseId: e.target.value })
        console.log(e.target.value)
        CourseSecService.getSecData(e.target.value)

            .then(Data => {
                this.setState({ secData: Data })
                // console.log(this.state.secData)
            })
    }
    submitquestion() {
        let formData = new FormData();
        formData.append("question", this.state.question);
        formData.append("option1", this.state.option1);
        formData.append('option2', this.state.option2);
        formData.append('option3', this.state.option3)
        formData.append("option4", this.state.option4);
        formData.append("answer", this.state.answer);
        formData.append("coursesubsec_id", this.state.subSecId);
        // console.log(this.state.question)
        // console.log(this.state.option1)
        // console.log(this.state.option2)
        // console.log(this.state.option3)
        // console.log(this.state.option4)
        // console.log(this.state.answer)
        QuizQuestionService.savequestion(formData).then((res) => {
            switch (res.success) {
                case 'True': {


                    Alert.success(res.message)
                    break;
                }
                default:
                    Alert.warning(res.error)
                    break;
            }
        })

    }

    changeQuestionHandler(event) {
        this.setState({
            question: event.target.value
        });
    }


    changeOption1Handler(event) {
        this.setState({
            option1: event.target.value
        });
    }
    changeOption2Handler(event) {
        this.setState({
            option2: event.target.value
        });
    }
    changeOption3Handler(event) {
        this.setState({
            option3: event.target.value
        });
    }
    changeOption4Handler(event) {
        this.setState({
            option4: event.target.value
        });
    }
    changeAnswerHandler(event) {
        this.setState({
            answer: event.target.value
        });
    }

    reset() {
        this.setState({
            sub: '',

        })
    }

    render() {
        var courseNames = this.state.courseData.map(course =>
            <option value={course.id} key={course.id}>{course.course_name}</option>)

        var secNames = this.state.secData.map(sec =>
            <option value={sec.id} key={sec.id}>{sec.title}</option>)

        var subsecNames = this.state.subData.map(sub =>
            <option value={sub.id} key={sub.id}>{sub.sub}</option>)
        return (
            <form className="m-5">

                <div class="form-group row">
                    <label for="inputQuestion" style={{ paddingTop: "30px" }} class="col-sm-2 col-form-label"><h4>Question</h4></label>
                    <div class="col-sm-10">
                        <input type="text" style={{ height: "80px" }} class="form-control" id="inputQuestion" placeholder="" onChange={this.changeQuestionHandler.bind(this)} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputOption1" class="col-sm-2 col-form-label"><h5>Option 1</h5></label>
                    <div class="col-md-5">
                        <input type="text" class="form-control" id="inputOption1" placeholder="" onChange={this.changeOption1Handler.bind(this)} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputOption2" class="col-sm-2 col-form-label"><h5>Option 2</h5></label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" id="inputOption2" placeholder="" onChange={this.changeOption2Handler.bind(this)} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputOption3" class="col-sm-2 col-form-label"><h5>Option 3</h5></label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" id="inputOption3" placeholder="" onChange={this.changeOption3Handler.bind(this)} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputOption4" class="col-sm-2 col-form-label"><h5>Option 4</h5></label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" id="inputOption4" placeholder="" onChange={this.changeOption4Handler.bind(this)} />
                    </div>
                </div>
                <div class="form-group row">
                    <select class="form-select" aria-label="Disabled select example" onChange={this.changeAnswerHandler.bind(this)}>
                        <option selected>Answers</option>
                        <option value="1" >{this.state.option1}</option>
                        <option value="2" >{this.state.option2}</option>
                        <option value="3" >{this.state.option3}</option>
                        <option value="3" >{this.state.option4}</option>
                    </select>
                    {/* <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Answers
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#" onChange={this.changeAnswerHandler.bind(this)}>{this.state.option1}</a>
                            <a class="dropdown-item" href="#" onChange={this.changeAnswerHandler.bind(this)}>{this.state.option2}</a>
                            <a class="dropdown-item" href="#" onChange={this.changeAnswerHandler.bind(this)}>{this.state.option3}</a>
                            <a class="dropdown-item" href="#" onChange={this.changeAnswerHandler.bind(this)}>{this.state.option4}</a>
                        </div>
                    </div> */}
                    {/* <label for="answer" class="col-sm-2 col-form-label"><h5>Answer</h5></label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" id="answer" placeholder="" onChange={this.changeAnswerHandler.bind(this)} />
                    </div> */}
                </div>
                <div className="d-flex justify-content-around">
                    <button type="submit" className="btn btn-outline-primary btn-lg" onClick={() => { this.submitquestion() }}>Save</button>
                    {/* <button type="button" onClick={this.reset.bind(this)} className="btn btn-primary px-4  ">Reset</button> */}
                </div>
            </form>


        );
    }
}