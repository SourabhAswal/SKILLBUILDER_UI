import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            check: false,
            index: 0,
            selectedOption: "",
            correct_option: "",
            allQuestions: [],
            completeQuiz: false,
            correctAnswer: 0,
            redirect: false
        }
        this.setQuestionAndOptions = this.setQuestionAndOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nextQues = this.nextQues.bind(this);
        this.prevQues = this.prevQues.bind(this);
    }
    componentDidMount() {
        if (this.props.location.questions === undefined || this.props.location.correct_ans === undefined || this.props.location.options === undefined) {
            this.setState({
                redirect: true
            })
        }
        this.setQuestionAndOptions();
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }
    setQuestionAndOptions() {
        if (this.props.location.questions !== undefined && this.props.location.correct_ans !== undefined && this.props.location.options !== undefined) {
            this.props.location.questions.forEach((data, index) => {
                this.props.location.options.forEach((val, index1) => {

                    this.props.location.correct_ans.forEach((value, i) => {
                        if ((index === index1) && (index === i)) {
                            this.state.questions.push({ question: data, option: val, correct_choice: value })
                        }
                    })
                }
                )
            }
            )
            // console.log(this.state.questions);
            this.setState({
                check: true
            })
        }

    }
   
    async nextQues(correctOpt) {
        // console.log(this.state.selectedOption)
        // console.log(correctOpt)
        if (this.state.selectedOption === correctOpt) {
            this.setState({
                correctAnswer: Number(this.state.correctAnswer) + 1
            })
        }
        if (this.state.index < Number(this.state.questions.length) && this.state.index >= 0) {
            await this.setState({
                index: Number(this.state.index) + 1,
                check: true,
                selectedOption: null
            })
        }
        else {
            this.setState({
                completeQuiz: true,
                check: false
            })
        }

    }

    prevQues() {
        this.setState({
            index: Number(this.state.index) - 1,
            check: true,
        })
    }
    async handleChange(event) {
        await this.setState({
            selectedOption: event.target.value
        })

    }

    render() {
        var session = window.localStorage.length;
        if (session != 0) {
        if (this.state.redirect) {
            return (
                <Redirect to={{ pathname: "/courseMaterial", state: { from: this.props.location } }} />
            )
        }

        if (this.state.check) {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-1">
                        <div class="h3 mb-0 text-gray-800 text-capitalize"></div>
                        <ol class="breadcrumb mt-3">
                            <li class="breadcrumb-item"><a href="./">Dashboard</a></li>
                            <li class="breadcrumb-item"><a href="./courseMaterial">Course Material</a></li>
                            <li class="breadcrumb-item " aria-current="page">Quiz</li>
                        </ol>
                    </div>
                    {this.state.completeQuiz ?
                        <div className="card" style={{ marginTop: "5%", width: "70%", left: "15%" }}>

                            <br />

                            <h2 className="text-center">Your Score is {this.state.correctAnswer}</h2>
                        </div> :

                        <div className="card" style={{ marginTop: "5%", width: "70%", left: "15%" }}>
                            <br />
                            <h2 className="text-center">Quiz</h2>

                            {Number(this.state.index + 1) <= this.state.questions.length && (this.state.questions.slice(Number(this.state.index), Number(this.state.index + 1)).map((data, index) =>
                                <div>
                                    <div className="container">
                                        <p className="ml-3">Question {this.state.index + 1} out of {this.state.questions.length}</p>
                                    </div>
                                    <div className="py-2 h5 ml-3 mt-3">
                                        <b>Q {this.state.index + 1}. {data.question}</b>
                                    </div>
                                    <div className="ml-4" onChange={this.handleChange}>
                                        <div>
                                            <input type="radio" id={data.option.choice_0} name="drone" value="choice_0" checked={this.state.selectedOption === "choice_0"} />&nbsp;
                                            <label for="option">{data.option.choice_0}</label>
                                        </div>
                                        <div>
                                            <input type="radio" id={data.option.choice_1} name="drone" value="choice_1" checked={this.state.selectedOption === "choice_1"} />&nbsp;
                                            <label for="option">{data.option.choice_1}</label>
                                        </div>

                                        <div>
                                            <input type="radio" id={data.option.choice_2} name="drone" value="choice_2" checked={this.state.selectedOption === "choice_2"} />&nbsp;
                                            <label for="option">{data.option.choice_2}</label>
                                        </div>
                                        <div>
                                            <input type="radio" id={data.option.choice_3} name="drone" value="choice_3" checked={this.state.selectedOption === "choice_3"} />&nbsp;
                                            <label for="option">{data.option.choice_3}</label>
                                        </div>
                                    </div>
                                    <div className="text-center">

                                        {Number(this.state.index) === 0 ?

                                            <div className="text-center">
                                                <button className=" btn btn-primary btn-blue mr-5" onClick={() => this.nextQues(data.correct_choice)}>Next</button>
                                            </div>
                                            : Number(this.state.index) < Number(this.state.questions.length) - 1 ?
                                                <div className="text-center">
                                                    <button className="btn btn-primary btn-blue ml-5" onClick={() => this.prevQues()}>Prev</button> &nbsp;
                                                    <button className=" btn btn-primary btn-blue mr-5" onClick={() => this.nextQues(data.correct_choice)}>Next</button>
                                                </div>
                                                : <div className="text-center">
                                                    <button className="btn btn-primary btn-blue ml-5" onClick={() => this.prevQues()}>Prev</button> &nbsp;&nbsp;
                                                    <button className="btn btn-primary btn-blue mr-5" onClick={() => { this.setState({ completeQuiz: true }); this.nextQues(data.correct_choice) }}>Submit</button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            ))}
                            <br />
                        </div>}
                </div>
            );
        }
        else {
            return ""
        }
    }
    else {
        window.location.replace("/");
    }
    }
}

export default Quiz;