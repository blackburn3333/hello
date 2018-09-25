import React, {Component} from "react";
import Hello from '../class/Hello';
import HtmlFile from '../class/Html';
import PhpController from '../class/Php';
import PhpClass from  '../class/PhpClass';
import DataBaseConnection from '../class/ConnectionClass';

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',
            TableName: '',
            ColumnCount: '',
            TableData: [],
            ServerErrorMessage: '',
            TableErrorMessage: '',
            TableColumnError: '',
            FirstForm: true,
            showViewTableDetails: true,
            showServerAndDBData: false,
            showSummery: false,
            FinalStep: false,
            ViewGenerateTabs: false,

            generatedHtmlView: '',
            generatedViewController: '',
            generatedInsertQuery: '',
            generatedConnectionString: '',
            generatedSelectClass: '',
        }
    }

    generateServerAndTableDetails(event) {
        const {serverName, serverUsername, serverDatabase, TableName, ColumnCount} = this.state;
        event.preventDefault();
        const data_server_details = [serverName, serverUsername, serverDatabase];
        const table_details = [TableName, ColumnCount];
        if (this.checkNullStatus(data_server_details)) {
            if (this.checkNullStatus(table_details)) {
                console.log("OK");
                this.setState({
                    showServerAndDBData: true,
                })
            } else {
                this.setState({
                    ServerErrorMessage: "",
                    TableErrorMessage: "All table details are required"
                })
            }
        } else {
            this.setState({
                ServerErrorMessage: "All server details are required",
                TableErrorMessage: ""
            })
        }

    }

    checkNullStatus(data) {
        return Hello.CheckNullStatus(data);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }


    generateTableInformation(event) {
        this.setState({
            FirstForm: false,
            ShowNextStep: true
        })
    }

    closeTableData(event) {
        this.setState({
            FirstForm: true,
            ShowNextStep: false
        })
    }

    secondCloseButton(event) {
        this.setState({
            ShowNextStep: true,
            showSummery: false
        })
    }

    render() {
        const {FinalStep, ShowNextStep, FirstForm, showSummery, TableColumnError, serverName, serverUsername, serverPassword, serverDatabase, TableName, ColumnCount, showServerAndDBData} = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center sub-div">
                        Generate Insert
                        <hr/>
                        This will generate insert form, form controller, connection class and insert class for
                        MySql.
                        <hr/>
                    </div>
                </div>
                {
                    FirstForm ? <div className="row">
                        <div className="col-md-12">
                            <p className="text-sm-cus">Enter server details - <span
                                className="error-text-sm-cus">{this.state.ServerErrorMessage}</span></p>
                        </div>
                        <div className="col-md-3">
                            <input name="serverName"
                                   onChange={e => this.handleInputChange(e)}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Name"
                                   className="text-input"
                                   value={this.state.serverName}
                            />
                        </div>

                        <div className="col-md-3">
                            <input name="serverUsername"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverUsername}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Username"
                                   className="text-input"/>
                        </div>

                        <div className="col-md-3">
                            <input name="serverPassword"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverPassword}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Password"
                                   className="text-input"/>
                        </div>

                        <div className="col-md-3">
                            <input name="serverDatabase"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverDatabase}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Database Name"
                                   className="text-input"/>
                        </div>
                        <div className="col-md-12">
                            <hr/>
                        </div>
                        <div className="col-md-12">
                            <p className="text-sm-cus">Enter Table details - <span
                                className="error-text-sm-cus">{this.state.TableErrorMessage}</span></p>
                        </div>

                        <div className="col-md-3">
                            <input name="TableName"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.TableName}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Table Name"
                                   className="text-input"/>
                        </div>
                        <div className="col-md-3">

                            <input name="ColumnCount"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.ColumnCount}
                                   required="required"
                                   type="number"
                                   placeholder="Enter Column Count"
                                   className="text-input"/>
                            <p className="text-sm-cus">ID column automatically generated by system.</p>
                        </div>
                        <div className="col-md-4" style={{paddingTop: '7px'}}>
                            <button onClick={(e) => this.generateServerAndTableDetails(e)} className="basic-button">
                                Generate
                            </button>
                        </div>
                        {showServerAndDBData ?
                            <div className="col-md-6">
                                <p className="text-sm-cus">Server Details</p>
                                <hr/>
                                <p>Server Name - {serverName} </p>
                                <p>Server Username - {serverUsername}</p>
                                <p>Server Password - { serverPassword}</p>
                                <p>Database Name - {serverDatabase}</p>
                            </div> : null}
                        {showServerAndDBData ?
                            < div className="col-md-6">
                                < p className="text-sm-cus">Table Details</p>
                                <hr/>
                                <p>Table Name - { TableName}</p>
                                <p>Table Column Count - {ColumnCount}</p>
                                <button onClick={(e) => this.generateTableInformation(e)}
                                        className="basic-button">
                                    Next
                                </button>
                            </div>
                            : null}
                    </div> : null
                }
                {ShowNextStep ? <div className="row">
                    <div className="col-md-12 text-right">
                        <button onClick={ (e) => this.closeTableData(e)}
                                className="material-icons material-icon-btns">close
                        </button>
                    </div>

                    <div className="col-md-12 text-center">
                        <p className="text-sm-cus-two">This is beta version of Hello application only set column name
                            and data length.
                            Default data type is varchar. If you needs to
                            change data type you can change it manually after generation in file DBConnection.php</p>
                        <hr/>
                        <p className="error-text-sm-cus">{TableColumnError}</p>
                    </div>
                </div> : null}
                {ShowNextStep ?
                    <div className="row table-view ">
                        {this.createInputs()}
                        <div className="col-md-4 offset-md-4">
                            <hr/>
                            <button onClick={(e) => this.handleTableChange(e)}
                                    className="basic-button">
                                Next
                            </button>
                        </div>
                    </div> : null}
                {showSummery ? <div className="row">
                    <div className="col-md-12 text-right">
                        <button onClick={ (e) => this.secondCloseButton(e)}
                                className="material-icons material-icon-btns">close
                        </button>
                        <hr/>
                    </div>
                    <div className="col-md-4">
                        <p className="text-sm-cus">Server Details</p>
                        <hr/>
                        <p>Server Name - {serverName} </p>
                        <p>Server Username - {serverUsername}</p>
                        <p>Server Password - { serverPassword}</p>
                        <p>Database Name - {serverDatabase}</p>
                    </div>
                    <div className="col-md-4">
                        <p className="text-sm-cus">Table Details</p>
                        <hr/>
                        <p>Table Name - {TableName} </p>
                        <p>Column Count - {ColumnCount}</p>
                    </div>
                    <div className="col-md-4">
                        <p className="text-sm-cus">Table Details</p>
                        <hr/>
                        <table className="table table-responsive">
                            <tbody>
                            <tr>
                                <th>Column Name</th>
                                <th>Data Type</th>
                                <th>Data Length</th>
                            </tr>
                            {
                                this.state.TableData.map((tableData, id) =>
                                    <tr key={id}>
                                        <td>{tableData.columnName}</td>
                                        <td>{tableData.colType}</td>
                                        <td>{tableData.length}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4 offset-md-4">
                        <button onClick={(e) => this.GenerateInsert(e)}
                                className="basic-button">
                            Generate
                        </button>
                    </div>
                </div> : null}
                {
                    FinalStep ? <div className="row">
                        <div className="col-md-12">
                            <button className="basic-button-sm" onClick={(e) => this.resetDataAll(e)}>Reset All
                            </button>
                            <button className="basic-button-sm" onClick={(e) => this.downloadInsert(e)}>Download
                            </button>
                        </div>
                        <div className="col-md-12">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#form-insert"
                                       role="tab" aria-controls="home" aria-selected="true">HTML View</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#controller-insert"
                                       role="tab" aria-controls="profile" aria-selected="false">Form Controller</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#insert-insert" role="tab"
                                       aria-controls="contact" aria-selected="false">Insert Class</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#select-insert"
                                       role="tab" aria-controls="contact" aria-selected="false">Select Class</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#connection-insert"
                                       role="tab" aria-controls="contact" aria-selected="false">Connection Class</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="form-insert" role="form"
                                     aria-labelledby="home-tab">
                                    <pre className="code-view-pre">
                                        {this.state.generatedHtmlView}
                                    </pre>
                                </div>
                                <div className="tab-pane fade" id="controller-insert" role="tabpanel"
                                     aria-labelledby="profile-tab"><pre className="code-view-pre">
                                    {this.state.generatedViewController}
                                </pre>
                                </div>
                                <div className="tab-pane fade" id="insert-insert" role="tabpanel"
                                     aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">{this.state.generatedInsertQuery}</pre>
                                </div>
                                <div className="tab-pane fade" id="connection-insert" role="tabpanel"
                                     aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">{this.state.generatedConnectionString}</pre>
                                </div>
                                <div className="tab-pane fade" id="select-insert" role="tabpanel"
                                     aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">
                                    {this.state.generatedSelectClass}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        )
    }

    resetDataAll(event) {
        this.setState({
            FirstForm: true,
            showViewTableDetails: true,
            showServerAndDBData: false,
            showSummery: false,
            FinalStep: false,
            ViewGenerateTabs: false,
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',
            TableName: '',
            ColumnCount: '',
            TableData: [],
            ServerErrorMessage: '',
            TableErrorMessage: '',
            TableColumnError: '',
            generatedHtmlView: '',
            generatedViewController: '',
            generatedInsertQuery: '',
            generatedConnectionString: '',
            generatedSelectClass: ''
        })
    }

    downloadInsert(event) {
        const {
            generatedHtmlView,
            generatedViewController,
            generatedInsertQuery,
            generatedConnectionString,
            TableName,
            generatedSelectClass
        } = this.state;
        const fileData = [
            {
                "fileName": TableName + ".php", "fileContent": generatedHtmlView, "folder": "out"
            },
            {
                "fileName": TableName + "_controller.php", "fileContent": generatedViewController, "folder": "out"
            },
            {
                "fileName": "Insert.php", "fileContent": generatedInsertQuery, "folder": "in"
            },
            {
                "fileName": "DBConnection.php", "fileContent": generatedConnectionString, "folder": "in"
            }
            ,
            {
                "fileName": "Select.php", "fileContent": generatedSelectClass, "folder": "in"
            }
        ]
        Hello.downloadZip(TableName, fileData);
    }

    GenerateInsert(event) {
        let tableData = [];
        for (let x = 0; x < this.state.TableData.length; x++) {
            tableData.push(this.state.TableData[x].columnName);
        }
        console.log(tableData.join());
        this.setState({
            showSummery: false,
            FinalStep: true,


            generatedHtmlView: HtmlFile.generateView(this.state.TableName, this.state.TableData, "insert","yes","yes","no","no","no","no"),
            generatedViewController: PhpController.generateController(this.state.TableName, this.state.TableData, "insert","yes","yes",""),
            generatedInsertQuery: PhpClass.insertQuery(),
            generatedConnectionString: DataBaseConnection.generateConnection(this.state.serverName, this.state.serverUsername, this.state.serverPassword, this.state.serverDatabase, "yes", this.state.TableName, this.state.TableData),
            generatedSelectClass: PhpClass.selectClass(this.state.TableName,tableData)
        })

    }

    handleTableChange() {

        const colNameNullChecker = [];
        const dataLengthNullChecker = [];

        const dataArray = [];
        const ColumnNames = [];

        for (let index = 0; index < this.state.ColumnCount; index++) {
            ColumnNames.push(
                {
                    'ColNames': 'columnText' + index,
                    'ValNames': 'ValueText' + index
                }
            );
            colNameNullChecker.push(
                this.refs[ColumnNames[index].ColNames].value
            );
            dataLengthNullChecker.push(
                this.refs[ColumnNames[index].ValNames].value
            )
        }

        if (!Hello.CheckNullStatus(colNameNullChecker)) {
            this.setState({
                TableColumnError: 'All fields are required'
            });
        } else {
            if (!Hello.CheckNullStatus(dataLengthNullChecker)) {
                this.setState({
                    TableColumnError: 'All fields are required'
                });
            } else {
                for (let Data = 0; Data < this.state.ColumnCount; Data++) {
                    dataArray.push({
                        "columnName": this.refs[ColumnNames[Data].ColNames].value,
                        "colType": "varchar",
                        "length": this.refs[ColumnNames[Data].ValNames].value
                    })
                    this.setState({
                        TableData: dataArray,
                        showSummery: true,
                        ShowNextStep: false
                    })
                }
            }

        }
    }

    createInputs() {
        let Inputs = [];

        for (let input = 0; input < this.state.ColumnCount; input++) {
            Inputs.push(
                <div key={input} className="col-md-2 border-text-set-outer">
                    <div className="border-text-set">
                    <p className="text-sm-cus">Column name</p>
                    <input ref={'columnText' + input} className="custom-text-box" type="text"
                           name={'columnText' + input}
                           placeholder="Enter Column Name" required/>
                    <p className="text-sm-cus">Data Length</p>
                    <input ref={'ValueText' + input} className="custom-text-box" type="number"
                           placeholder="Enter Data Length" required/>
                </div>
                </div>
            );
        }
        return Inputs;
    }


}
export default Insert;