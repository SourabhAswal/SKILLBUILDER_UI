
import React, { Component } from 'react';
// import "./landing.css";
import { Redirect } from "react-router-dom";
import LoadingIndicator from '../common/LoadingIndicator';
import AllCoursesService from '../component/allCourses/AllCoursesService';


import '../common/loader.css';
class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: false,
      allCourses: [],
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.setState({
      redirect: true
    })
  }
  async componentDidMount() {
    await this.getCourses();
    window.scrollTo(0, 0);
  }
  async getCourses() {
    this.setState({ loading: true });
    await AllCoursesService.getAllCourses().then((res) => {
      if (res.status === 200) {
        this.setState({
          allCourses: res.data,
          loading: false
        })
      }
      else {
        this.setState({
          loading: false
        })
      }
    })
  }
  render() {
    localStorage.clear();
    if (this.state.loading) {

      return( 
      <div style={{ position: "fixed", left: "48%",top:"9%"}}> 
      <LoadingIndicator />
       </div>
      )
    }
    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: "/signIn", state: { from: this.props.location } }} />
      )
    }
    return (
      <>
 
        <div class="body-bg">
          <nav class="navbar navbar-expand-md navbar-dark nav-change">
            <div class="container">
              <a class="navbar-brand" href="#">
                <img src="img/logo.png" class="logo" width="140px" />
                <img src="https://rcteambuilder.com/img/rc-logo-2.png" class="logo-2" width="140px" />
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto mr-lg-5 ul-link">
                  <li class="nav-item">
                    <a class="nav-link" href="#top-courses">Top Courses</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link login-btn" href="#curriculum">Learning Journey</a>
                  </li>
                </ul>
                <a class="btn btn-primary btn-blue" onClick={() => this.signIn()} >
                  Sign In
                </a>
              </div>
            </div>
          </nav>
          <section class="main-banner">
            <div class="container">
              <div class="row">
                <div class="col-md-7">
                  <div class="banner-content pr-5 wow fadeInDown">
                    <h1 >Welcome to  SkillBuilder</h1>
                    <p>Built on top of Google Cloud Platform and provides foundation for all our current, future products and custom solution for clients</p>
                  </div>
                  <div class="banner-btn mt-5">
                    <a href="#" class="btn" onClick={() => this.signIn()}>Start Learning Now</a>
                  
                  </div>
                </div>
                <div class="col-md-5"></div>
                <div class="clear-fix"></div>
              </div>
            </div>
          </section>
          {/* top courses */}
          <section class="top-courses padding" id="top-courses">
            <div class="container">
              <h2 class="h2-title wow fadeInUp">Explore Top Courses -</h2>
              <div class="row mt-5">
                {this.state.allCourses.length > 0 && this.state.allCourses.slice(0, 6).map((data) =>
                  <div class="col-md-2">


                    <a id="non" href="#">


                      <div class="tech-icon wow fadeInUp">
                        <img src={decodeURIComponent(data.course_img)} alt="img" />
                        <h4>{data.course_name}</h4>
                      </div>
                    </a>
                  </div>
                )}
                <div class="clear-fix"></div>
              </div>
            </div>
          </section>
          <section class="curriculum padding" id="curriculum">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="img-code wow fadeInLeft" data-wow-delay=".5s">
                    <img src="img/b2.png" width="100%" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="curriculum-tech wow fadeInRight" data-wow-delay=".5s">
                    <h2 class="h2-title h-fff mb-5">Explore Learning Journey -</h2>
                    <div class="btn-tech">
                      <a href="#" class="btn"><i class="far fa-angle-double-right"></i> Python Learning Journey</a>
                    </div>
                    <div class="btn-tech">
                      <a href="#" class="btn"><i class="far fa-angle-double-right"></i> React Learning Journey</a>
                    </div>

                    <div class="btn-tech">
                      <a href="#" class="btn"><i class="far fa-angle-double-right"></i> java Script Learning Journey</a>
                    </div>

                    <div class="btn-tech">
                      <a href="#" class="btn"><i class="far fa-angle-double-right"></i> Php Learning Journey</a>
                    </div>

                    <div class="btn-tech">
                      <a href="#" class="btn"><i class="far fa-angle-double-right"></i>Html Learning Journey</a>
                    </div>

                  </div>
                </div>
                <div class="clear-fix"></div>
              </div>
            </div>
          </section>
          <section class="creat-account padding">
            <div class="container">
              <div class="div-text text-center">
                <h3 class="wow fadeInDown">Create an account learn more about Technologies</h3>
                <p class="wow fadeInDown">RealCoderZ Platform provides foundation for all its products. Key services include Artificial Intelligence, Decision Modeling, Organizations, BPM Workflows, etc.</p>
                <div class="banner-btn mt-5">
                  <a href="#" class="btn wow fadeInDown">Create account</a>
                </div>
              </div>
            </div>
          </section>
          <section className="all-technology section" id="technologies">
            <div className="container ">
              <div className="row justify-content-center ">
                <div className="col-lg-8">
                  <div className="text-center mb-4">
                    <h2 className="h45-title mb-2">Software Technologies</h2>
                  </div>
                </div>
              </div>
              <div className="tech-box ">
                <div className="row">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>FRONTEND</p>
                    </div>
                  </div>
                  <div className="col-md-10 ">
                    <div className="row">
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/react-js.png" width="100%" alt="RealcoderZ react" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/html.png" width="100%" alt="RealcoderZ html" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/css3-logo.png" width="100%" alt="RealcoderZ css" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/boot.jpg" width="100%" alt="RealcoderZ bootstrap" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/AngularJS.png" width="100%" alt="RealcoderZ Angular" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov hov hov">
                          <img src="img/tech/JavaScript.png" width="100%" alt="RealcoderZ JavaScript" />
                        </div>
                      </div>


                      <div className="clear-fix"></div>
                    </div>

                  </div>
                  <div className="clear-fix"></div>
                </div>


                <div className="row pt-2">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>BACKEND</p>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov hov">
                          <img src="img/tech/java.png" width="100%" alt="RealcoderZ java" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov hov">
                          <img src="img/tech/spring.png" width="100%" alt="RealcoderZ spring" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/python.png" width="100%" alt="RealcoderZ python" />
                        </div>
                      </div>



                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/php.png" width="100%" alt="RealcoderZ php" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/laravel.png" width="100%" alt="RealcoderZ laravel" />
                        </div>
                      </div>


                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/node-js.png" width="100%" alt="RealcoderZ node js" />
                        </div>
                      </div>

                      <div className="clear-fix"></div>
                    </div>

                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>MOBILE APP</p>
                    </div>
                  </div>
                  <div className="col-md-10">


                    <div className="row">
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/kotlin.png" width="100%" alt="RealcoderZ kotlin" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/java.png" width="100%" alt="RealcoderZ java" />
                        </div>
                      </div>



                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/swift.png" width="100%" alt="RealcoderZ swift" />
                        </div>
                      </div>
                      <div className="clear-fix"></div>
                    </div>

                  </div>
                </div>



                <div className="row">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>DATABASES</p>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/MySQL-Logo.wine_-300x200.png" width="100%" alt="mysql" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/mongo.png" width="100%" alt="RealcoderZ mongodb" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/post.jpg" width="100%" alt="post" />
                        </div>
                      </div>
                      <div className="clear-fix"></div>
                    </div>

                  </div>
                  <div className="clear-fix"></div>
                </div>


                <div className="row">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>DEVOPS</p>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/jenkin.png" width="100%" alt="RealcoderZ jenkin" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/sele.jpg" width="100%" alt="RealcoderZ selenium logo" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/post-man.jpg" width="100%" alt="RealcoderZ postman logo" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/GitHub-logo.png" width="100%" alt="RealcoderZ GitHub" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/terraform.png" width="100%" alt="terraform" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img  hov">
                          <img src="img/tech/elk.png" width="100%" alt="RealcoderZ elk" />
                        </div>
                      </div>



                    </div>

                  </div>
                  <div className="clear-fix"></div>
                </div>

                <div className="row pt-2">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>CLOUD COMPUTING</p>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/google-cloud.png" width="100%" alt="RealcoderZ google cloud" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/azure.png" width="100%" alt="RealcoderZ azure" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/aws.png" width="100%" alt="RealcoderZ AWS" />
                        </div>
                      </div>


                      <div className="clear-fix"></div>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <div className="tech-name">
                      <p>OTHER Technologies</p>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/blockchain.png" width="100%" alt="RealcoderZ blockchain" />
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <img src="img/tech/ai.png" width="100%" alt="RealcoderZai" />
                        </div>
                      </div>


                      {/* <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <p>Serverless <span style={{ color: "#22B1ED", fontSize: "20px" }}>Computing</span></p>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <p>Decision <br /><span style={{ color: "#22B1ED", fontSize: "20px" }}>Modeling</span></p>
                        </div>
                      </div> */}

                      {/* <div className="col-lg-2 col-md-4 col-sm-6">
                        <div className="tech-img hov">
                          <p>Data <br /><span style={{ color: "#22B1ED", fontSize: "20px" }}>Warehouse</span></p>
                        </div>
                      </div> */}
                      {/* <div className="clear-fix"></div> */}
                    </div>
                  </div>
                  {/* <div className="clear-fix"></div> */}
                </div>
              </div>
            </div>

          </section>
          {/* -------------------------------- */}
          {/* footer component */}
          {/* ________________________________ */}
          <footer className="footing">
            <div class="container con-border">
              <div class="row">
                <div class="col-md-9">
                  <div class="text-heading mb-5">
                    <h3>Ready to build your team?</h3>
                    <p class="small-text">Get your student placement ready with there best performance. </p>
                  </div>

                </div>
                <div class="col-md-3">
                  <div class="soc">
                    <ul class="s-icon">
                      <li className="sf">
                        <a  href="https://www.facebook.com/RCteambuilder" target="_blank"><i class="fab fa-facebook-f "></i></a></li>
                      <li>
                        <a href="https://www.linkedin.com/products/realcoderz-rc-teambuilder/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/rcteambuilder/" target="_blank"><i class="fab fa-instagram"></i></a></li>

                    </ul>
                  </div>
                </div>
                <div class="clear-fix"></div>
              </div>
              <hr class="hr-line" />
              <div class="row">
                <div class="col-md-6">
                  <div class="rc-deve">
                    <p>Design and developed by Realcoderz, <a href="https://realcoderz.com/" target="_blank">realcoderz.com</a></p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="rc-copy">
                    <p>© 2021 RealCoderZ All Rights Reserved 2021 Privacy Policy</p>
                  </div>
                </div>

              </div>
            </div>
          </footer>
        </div>

      </>
    );
  }
}

export default LandingPage;