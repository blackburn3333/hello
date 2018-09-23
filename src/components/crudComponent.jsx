import React, {Component} from 'react';
import Hello from '../class/Hello';

import PhpClass from '../class/PhpClass';
import HtmlFile from '../class/Html';
import DataBaseConnection from '../class/ConnectionClass';
import PhpController from '../class/Php';

class Crud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',
            tableName: '',
            columnCount: '',
            tableData: [],

            serverTableError: '',
            colTableError: '',

            firstStep: true,
            secondStep: false,
            summery: false,
            finalView: false,

            generatedView: '',
            generatedDelete: '',
            generatedUpdate: '',

            generatedController: '',

            generatedConnection: '',
            generatedInsertQuery: '',
            generatedSelectQuery: '',
            generatedDeleteQuery: '',
            generatedUpdateQuery: ''

        }
    }

    render() {
        const {
            firstStep,
            secondStep,
            finalView,
            serverTableError,
            colTableError,
            summery,
            serverName,
            serverUsername,
            serverPassword,
            serverDatabase,
            tableName,
            columnCount,

            generatedView,
            generatedDelete,
            generatedUpdate,

            generatedController,

            generatedConnection,
            generatedInsertQuery,
            generatedSelectQuery,
            generatedDeleteQuery,
            generatedUpdateQuery
        } = this.state;
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-12 text-center sub-div">
                        Generate CRUD for data in table.
                        <hr/>
                        This will generate CREATE, READ, UPDATE and DELETE for table in database.
                        <hr/>
                    </div>
                </div>
                {
                    firstStep ? <div className="row">
                        <div className="col-md-12">
                            <p className="text-sm-cus">Server Details</p>
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
                            <p className="text-sm-cus">Table Details</p>
                        </div>
                        <div className="col-md-3">
                            <input name="tableName"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.tableName}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Table Name"
                                   className="text-input"/>
                        </div>

                        <div className="col-md-3">
                            <input name="columnCount"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.columnCount}
                                   required="required"
                                   type="number"
                                   placeholder="Enter Column Count"
                                   className="text-input"/>
                            <p className="text-sm-cus">ID column automatically generated by system.</p>
                        </div>

                        <div className="col-md-4 offset-md-4 text-center">
                            <p className="error-text-sm-cus-two"> {serverTableError}</p>
                            <button onClick={(e) => this.generateTableAndServerData(e)} className="basic-button">Next
                            </button>
                        </div>
                    </div> : null
                }
                {
                    secondStep ?
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button onClick={ (e) => this.closeTableData(e)}
                                        className="material-icons material-icon-btns">close
                                </button>
                            </div>

                        </div>
                        : null
                }
                {
                    secondStep ?
                        <div className="row table-view">
                            {this.createInputs()}
                            <div className="col-md-4 offset-md-4 text-center">
                                <p className="error-text-sm">{colTableError}</p>
                                <button onClick={(e) => this.generateColumns(e)} className="basic-button">
                                    Next
                                </button>
                            </div>
                        </div> : null
                }
                {
                    summery ?
                        <div className="row">
                            <div className="col-md-4">
                                <p className="text-sm-cus">Server Details</p>
                                <p>Server name - {serverName}</p>
                                <p>Server username - {serverUsername}</p>
                                <p>Server password - {serverPassword}</p>
                                <p>Server database - {serverDatabase}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="text-sm-cus">Table Details</p>
                                <p>Table name - {tableName}</p>
                                <p>Column count - {columnCount}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="text-sm-cus">Table column data</p>
                                <table className="table table-responsive">
                                    <tbody>
                                    <tr>
                                        <th>Column Name</th>
                                        <th>Data Type</th>
                                        <th>Data Length</th>
                                    </tr>
                                    {
                                        this.state.tableData.map((tableData, id) =>
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
                                <button onClick={(e) => this.generateData(e)} className="basic-button">
                                    Generate
                                </button>
                            </div>
                        </div> : null
                }

                {
                    finalView ?
                        <div className="row">
                            <div className="col-md-12">
                                <button className="basic-button-sm" onClick={(e) => this.resetData(e)}>Reset All
                                </button>
                                <button className="basic-button-sm" onClick={(e) => this.downloadUpdate(e)}>Download
                                </button>
                            </div>
                            <div className="col-md-12 text-center">
                                This will not generate Create table query. you can use this with existing table
                            </div>
                            <div className="col-md-12">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#view"
                                           role="tab" aria-controls="home" aria-selected="true">HTML View</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="update-tab" data-toggle="tab" href="#update"
                                           role="tab" aria-controls="update" aria-selected="true">HTML update View</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="update-tab" data-toggle="tab" href="#delete"
                                           role="tab" aria-controls="update" aria-selected="true">Delete</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#controller"
                                           role="tab" aria-controls="profile" aria-selected="false">Controller</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#insertQuery"
                                           role="tab" aria-controls="contact" aria-selected="false">Insert Class</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#select"
                                           role="tab" aria-controls="contact" aria-selected="false">Select Class</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#updateQuery"
                                           role="tab" aria-controls="contact" aria-selected="false">Update Class</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#deleteQuery"
                                           role="tab" aria-controls="contact" aria-selected="false">Delete Class</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="connection-tab" data-toggle="tab" href="#connection"
                                           role="tab" aria-controls="contact" aria-selected="false">Connection Class</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">

                                    <div className="tab-pane fade show active" id="view" role="form"
                                         aria-labelledby="home-tab">
                                    <pre className="code-view-pre">
                                        {generatedView}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade show " id="update" role="form"
                                         aria-labelledby="home-tab">
                                    <pre className="code-view-pre">
                                        {generatedUpdate}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade show " id="delete" role="form"
                                         aria-labelledby="home-tab">
                                    <pre className="code-view-pre">
                                        {generatedDelete}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade" id="controller" role="tabpanel"
                                         aria-labelledby="profile-tab">
                                        <pre className="code-view-pre">
                                            {generatedController}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade" id="connection" role="tabpanel"
                                         aria-labelledby="contact-tab">
                                        <pre className="code-view-pre">{generatedConnection}</pre>
                                    </div>

                                    <div className="tab-pane fade" id="select" role="tabpanel"
                                         aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">
                                        {generatedSelectQuery}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade" id="insertQuery" role="tabpanel"
                                         aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">
                                        {generatedInsertQuery}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade" id="updateQuery" role="tabpanel"
                                         aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">
                                        {generatedUpdateQuery}
                                    </pre>
                                    </div>

                                    <div className="tab-pane fade" id="deleteQuery" role="tabpanel"
                                         aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">
                                        {generatedDeleteQuery}
                                    </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }

    generateData(event) {
        const TableCols = [];
        for (let x = 0; x < this.state.tableData; x++) {
            TableCols.push(
                this.state.tableData[x].columnName
            )
        }
        this.setState({
            finalView: true,
            firstStep: false,
            secondStep: false,
            summery: false,


            generatedConnection: DataBaseConnection.generateConnection(this.state.serverName, this.state.serverUsername, this.state.serverPassword, this.state.serverDatabase, "yes", this.state.tableName, this.state.tableData),
            generatedInsertQuery: PhpClass.insertQuery(),
            generatedSelectQuery: PhpClass.selectClass(this.state.tableName, "*"),
            generatedUpdateQuery: PhpClass.updClass(),
            generatedDeleteQuery: PhpClass.deleteClass(),

            generatedView: HtmlFile.generateView(this.state.tableName, this.state.tableData, "insert", "yes", "yes", "yes", "yes", "no", "no", "yes"),
            generatedUpdate: HtmlFile.generateView(this.state.tableName, this.state.tableData, "update", "no", "yes", "no", "no", "yes", "no"),
            generatedDelete: HtmlFile.generateView(this.state.tableName, this.state.tableData, "delete", "no", "yes", "no", "no", "no", "yes", "no"),
            generatedController: PhpController.generateController(this.state.tableName, this.state.tableData, "all", "yes", "yes", "WHERE " + this.state.tableName + "_ID = \". $updateId .\"", "yes", "yes")
        })
    }

    resetData(event) {
        this.setState({
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',
            tableName: '',
            columnCount: '',
            tableData: [],

            serverTableError: '',
            colTableError: '',

            firstStep: true,
            secondStep: false,
            summery: false,
            finalView: false,

            generatedView: '',
            generatedDelete: '',
            generatedUpdate: '',

            generatedController: '',

            generatedConnection: '',
            generatedInsertQuery: '',
            generatedSelectQuery: '',
            generatedDeleteQuery: '',
            generatedUpdateQuery: ''
        })
    }

    closeTableData(event) {
        this.setState({
            firstStep: true,
            secondStep: false
        })
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    generateTableAndServerData() {
        const {serverName, serverUsername, serverDatabase, tableName, columnCount} = this.state;
        const data = [serverName, serverUsername, serverDatabase, tableName, columnCount];
        if (this.checkNullStatus(data)) {
            this.setState({
                serverTableError: '',
                firstStep: false,
                secondStep: true
            })
        } else {
            this.setState({
                serverTableError: 'All fields are required'
            })
        }
    }

    checkNullStatus(data) {
        return Hello.CheckNullStatus(data);
    }

    downloadUpdate(event) {
        const {
            tableName,

            generatedView,
            generatedDelete,
            generatedUpdate,

            generatedController,

            generatedConnection,
            generatedInsertQuery,
            generatedSelectQuery,
            generatedDeleteQuery,
            generatedUpdateQuery
        } = this.state;
        const fileData = [
            {
                "fileName": tableName + ".php", "fileContent": generatedView, "folder": "out"
            },
            {
                "fileName": tableName + "_controller.php", "fileContent": generatedController, "folder": "out"
            },
            {
                "fileName": tableName + "_update.php", "fileContent": generatedUpdate, "folder": "out"
            },
            {
                "fileName": tableName + "_delete.php", "fileContent": generatedDelete, "folder": "out"
            },
            {
                "fileName": "Update.php", "fileContent": generatedUpdateQuery, "folder": "in"
            },
            {
                "fileName": "Delete.php", "fileContent": generatedDeleteQuery, "folder": "in"
            },
            {
                "fileName": "Insert.php", "fileContent": generatedInsertQuery, "folder": "in"
            },
            {
                "fileName": "DBConnection.php", "fileContent": generatedConnection, "folder": "in"
            }
            ,
            {
                "fileName": "Select.php", "fileContent": generatedSelectQuery, "folder": "in"
            }
        ]
        Hello.downloadZip(tableName, fileData);
    }

    generateColumns() {

        const colNameNullChecker = [];
        const dataLengthNullChecker = [];

        const dataArray = [];
        const ColumnNames = [];

        for (let index = 0; index < this.state.columnCount; index++) {
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
                colTableError: 'All fields are required'
            });
        } else {
            if (!Hello.CheckNullStatus(dataLengthNullChecker)) {
                this.setState({
                    colTableError: 'All fields are required'
                });
            } else {
                for (let Data = 0; Data < this.state.columnCount; Data++) {
                    dataArray.push({
                        "columnName": this.refs[ColumnNames[Data].ColNames].value,
                        "colType": "varchar",
                        "length": this.refs[ColumnNames[Data].ValNames].value
                    });
                    this.setState({
                        tableData: dataArray,
                        secondStep: false,
                        summery: true,
                    })
                }
            }

        }
    }

    createInputs() {
        let Inputs = [];

        for (let input = 0; input < this.state.columnCount; input++) {
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

export default Crud;