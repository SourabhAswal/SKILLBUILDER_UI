import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import CourseSectionService from './CourseSectionService';
import Alert from 'react-s-alert';
import LoadingIndicator from '../../../common/LoadingIndicator';

class CourseSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            course_sections: [],
            course_subsections: [],
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        if (this.props.course_id !== null && this.props.course_id !== undefined) {
            await this.getCourseSections(this.props.course_id);
        }
    }

    async getCourseSections() {
        await CourseSectionService.getCourseSections().then((res) => {
            if (res.data !== null) {
                this.setState({
                    sections: res.data.sections,
                    loading: false
                })
            }
            else {
                Alert.warning("To view the course enroll into this course !!");
            }
        });

    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />
        }

        return (
            <div>
                <div className="mr-4">
                    <h3 style={{ fontWeight: "bold", color: "#5a5c69" }}>Course Content</h3>
                    <Accordion defaultActiveKey="0">

                        {this.state.sections.length > 0 ? this.state.sections.map((data) =>

                            <Card >
                                {/* <Accordion.Toggle as={Card.Header} eventKey="0"> */}

                                {/* <p> {data.title}</p> */}
                                {/* </Accordion.Toggle> */}
                                {
                                    this.props.course_id === data.course_id &&
                                    <Accordion.Collapse eventKey="0">
                                        <ul class="list-group">
                                            <li class="list-group-item"><a href="">{data.title}</a></li>

                                        </ul>
                                    </Accordion.Collapse>
                                }
                            </Card>
                        ) : <p>Sections are not available for this course this course</p>}

                    </Accordion>
                </div>
            </div>
        );


    }
}

export default CourseSection;