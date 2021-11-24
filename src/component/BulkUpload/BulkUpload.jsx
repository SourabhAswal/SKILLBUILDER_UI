import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Alert from 'react-s-alert';
import { Card } from 'react-bootstrap';
import * as XLSX from "xlsx";
import "../../App.css";
import { Table } from 'react-bootstrap';
import BulkUploadService from '../BulkUpload/BulkUploadService'
import UploadContent from '../uploadContent/UploadContent';
export default class BulkUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            Question: "",
            Options: "",
            Answer: "",
            subSecId: this.props.subSecId,
        };

    }

    componentDidMount() {
        // this.props.userAuthenticated(true);
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }

    savequestion() {
        let formData = new FormData();
        formData.append("questions", this.state.Question);
        formData.append("options", this.state.Options);
        formData.append("answer", this.state.Answer);
        formData.append("coursesubsec_id", this.state.subSecId);
        BulkUploadService.submitquestion(formData).then((res) => {
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


    readExcel(file) {
        // console.log("Ashutosh")
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);

            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            // console.log(d)
            this.setState({ items: d }, () => {
                console.log(this.state.items)

                var loopData = []
                var i;
                var j = 0;
                var k = 0;
                var l = 0;
                var items = this.state.items
                for (i = 0; i < items.length; i = i + 4) {
                    loopData[j] = items[i].Question
                    j = j + 1
                }
                console.log(loopData)
                this.setState({ Question: loopData }, () => {
                    // console.log(this.state.Question)
                })
                var Options = []
                var temp = []
                for (i = 0; i < items.length; i = i + 4) {

                    for (j = i; j < items.length; j++) {
                        if (k < 4) {
                            temp[k] = items[j].Options
                            k = k + 1
                        }
                        else {
                            break
                        }

                    }
                    Options[l] = temp
                    l = l + 1
                    k = 0;
                    temp = [];
                }
                console.log(Options)
                this.setState({ Options: Options }, () => {
                    // console.log(this.state.Options)
                })
                i = 0;
                j = 0;
                var Answer = []
                for (i = 0; i < items.length; i = i + 1) {

                    if (items[i].Answer == 'T') {

                        Answer[j] = items[i].Options
                        j = j + 1
                    }
                }
                console.log(Answer)
                this.setState({ Answer: Answer }, () => {
                    // console.log(this.state.Question)
                })

            });
        });


    };

    render() {
        const data = this.state.items.map((d) => {
            return (<tr key={d.Question}>
                <th>{d.Question}</th>
                <th>{d.Answer}</th>
                <td>{d.Options}</td>
            </tr>)
        })

        return (

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8 mx-auto formcard  d-flex flex-column align-items-center">
                        <h2 className="course" >Bulk Upload Question</h2>
                        <br />
                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-5" role="group" aria-label="First group">

                                <label htmlFor="contained-button-file">
                                    <button type="button" class="btn btn-primary btn-file" onChange={(e) => {
                                        const file = e.target.files[0];
                                        this.readExcel(file);
                                    }}> <input type="file" />CHOOSE A FILE</button></label>

                            </div>

                            <div class="btn-group ml-5" role="group" aria-label="Second group">
                                <button type="button" class="btn btn-primary">UPLOAD</button>

                            </div>

                        </div>
                        <br />
                        <br />
                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-1" role="group" aria-label="First group">
                                <button type="button" class="btn btn-primary">RESET</button>

                            </div>
                            <div class="btn-group ml-5" role="group" aria-label="First group">
                                <button type="button" class="btn btn-primary" onClick={() => { this.savequestion() }}>SAVE ALL</button>

                            </div>
                            <div class="btn-group ml-5" role="group" aria-label="Second group">
                                <button type="button" class="btn btn-primary">EXIT</button>

                            </div>
                            <div class="btn-group ml-5" role="group" aria-label="Third group">
                                <button type="button" class="btn btn-primary">TEMPLATE</button>
                            </div>

                        </div>
                        <br />

                    </div>
                </div>
                <div>


                    <Table striped bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th scope="col">Question</th>
                                <th scope="col">Answer</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}

                        </tbody>
                    </Table>
                </div>
                <div>
                </div>
            </div >
        );

    }
}