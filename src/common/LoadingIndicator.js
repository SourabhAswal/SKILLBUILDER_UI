import React from 'react';
import '../common/loader.css'


export default function LoadingIndicator(props) {
    return (
      <div >
            {/* <div className="centered">  */}
           {/* <header style={{ position: "fixed", left: "48%",top:"9%" }} className="App-header"> */}
           <header  className="App-header">
        

       

            <img src="./tabicon.png" className="App-logo" alt="logo" />

            </header>

              </div>
        // </div>
    );
  }



  // {this.state.loader == true && (

  //   <header

  //     style={{ position: "fixed", left: "55%" }}

  //     className="App-header"

  //   >

  //     <img src="./tabicon.png" className="App-logo" alt="logo" />

  //   </header>

  // )}







  // export default function LoadingIndicator(props) {
  //   return (
  //     <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} >
  //          <div className="centered">
  //                   <h4>Loading...</h4>
  //             </div>
  //       </div>
  //   );
  // }