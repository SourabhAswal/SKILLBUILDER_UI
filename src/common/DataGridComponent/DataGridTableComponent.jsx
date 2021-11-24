import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";
import "../DataGridComponent/DataGrid.css";

class DataGridTableComponent extends Component {
 
  render() {
    /*   DATA TABLE  const start   */
    const { SearchBar } = Search;
    const paginationOption = {
      custom: true,
      sizePerPageList:[ {
        text: '10', value: 10,
      }, 
      {
        text: '30', value: 30
      } ,
      {
        text: '50', value: 50
      } ,
      {
        text: '75', value: 75
      }, 
      {
        text: '100', value: 100
      }, 
      {
        text: 'All', value: 200
      } ,
      ]
    };

    const rowStyle = (cell, row, rowIndex, formatExtraData) => {
      const style = {};
        style.minHeight = "50px";
        style.fontSize= "14px"
        return style;
     
    };

    /*  DATA TABLE  const end */

    return (
      <div class="container-fluid" id="container-wrapper" style={{paddingLeft: '0px', paddingRight: '0px'}}>
        {/* DATA TABLE START*/}
        <div className="card">
          <div className="card-body">
            <div align="center">
              <h5> {this.props.heading} </h5>
            </div>
            <ToolkitProvider
              keyField="questionId"
              data={this.props.list}
              columns={this.props.columns}
              fetchInfo={{dataTotalSize: 200}}
              search
            >
              {(props) => (
                <div>
                 
                  <div className="table-responsive" style={{overflowX:"hidden"}}>
                    <PaginationProvider
                      pagination={paginationFactory(paginationOption)}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <>
                            <div className="row d-flex justify-content-between">
                          <div className = "ml-2 col-lg-8">
                           <span >
                              <SizePerPageDropdownStandalone
                                variation="dropdown"
                                btnContextual='btn-outline-primary'
                               {...paginationProps}
                              /> 
                              {/* <p style={{marginLeft:"120px"}}>Entries</p> */}
                            </span>
                            </div> 
                            <div className="col-lg-3">
                                <SearchBar 
                                  style={{ width: "135px", marginBottom: "10px" ,marginTop:"1px"}}
                                  {...props.searchProps}
                                />
                            </div>
                            </div>
                           <div className="">
                           <BootstrapTable
                              wrapperClasses="table-responsive table-striped"
                              selectRow={this.props.selectRow}
                              stripedRows 
                              rowStyle={rowStyle}
                              {...paginationTableProps}
                              {...props.baseProps}
                              noDataIndication={"no results found"}
                            />
                            </div>
                            <div className="col mt-3">
                            <div>
                            <span >
                            <PaginationTotalStandalone
                              {...paginationProps}
                            /></span>
                            </div>
                            <div >
                            <span className="d-flex justify-content-end mt-3">
                              <PaginationListStandalone
                                {...paginationProps}
                              />
                            </span></div>
                            </div>
                          </>
                        )
                      }
                    </PaginationProvider>
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
        {/* DATA TABLE END */}
      </div>
    );
  }
}
export default DataGridTableComponent;