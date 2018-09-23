class PhpController {

    static generateController(fileName, formData, type = 'all', needForm = 'yes', needTable = 'yes', queryExtra = "", needUpdate = "no",needDelete = "no") {

        let includes = this.generateIncludes(type);
        let insert = this.generateInsert(fileName, formData, needTable, needForm, queryExtra, needUpdate,needDelete);
        let select = this.generateInsert(fileName, formData, needTable, needForm, queryExtra, needUpdate,needDelete);
        let all = this.generateInsert(fileName, formData, needTable, needForm, queryExtra, needUpdate,needDelete);
        let ControllerTemplate = includes;
        if (type === 'all') {
            ControllerTemplate += all;
        } else if (type === 'insert') {
            ControllerTemplate += insert;
        } else if (type === 'update') {
            ControllerTemplate += select;
        } else if (type === 'delete') {
            ControllerTemplate += select;
        } else if (type === 'select') {
            ControllerTemplate += select;
        }

        return ControllerTemplate;
    }

    static generateIncludes(type) {

        let connectionClass = 'include \'DBConnection.php\';\n$DBConn = new DBConnection();\n\n';
        let insertClass = 'include \'Insert.php\';\n$insert = new Insert();\n\n';
        let updateClass = 'include \'Update.php\';\n$update = new Update();\n\n';
        let deleteClass = 'include \'Delete.php\';\n$delete = new Delete();\n\n';
        let selectClass = 'include \'Select.php\';\n$select = new Select();\n\n';

        let includes = '<?php\n\n';
        includes += connectionClass;
        if (type === 'all') {

            includes += insertClass;
            includes += updateClass;
            includes += deleteClass;
            includes += selectClass;

        } else if (type === "insert") {
            includes += insertClass;
            includes += selectClass;


        } else if (type === "update") {
            includes += updateClass;
            includes += selectClass;


        } else if (type === "delete") {
            includes += deleteClass;
            includes += selectClass;
        } else if (type === "select") {
            includes += selectClass;
        }
        return includes;
    }

    static generateInsert(filename, formData, needView, needInsertForm, extraPart, needUpdate,needDelete) {
        const insertSuccessful = "Insert Successful";
        const insertUnSuccessful = "Insert Unsuccessful";

        const updateSuccessful = "Update Successful";
        const updateUnSuccessful = "Update Unsuccessful"
        let insertData = '';

        if (needInsertForm === "yes") {
            insertData += 'if (isset($_POST["' + filename + '_insert"])) {\n';
            insertData += '$tableData = array(\n';
            for (let x = 0; x < formData.length; x++) {
                insertData += '\t\'' + formData[x].columnName + '\' => mysqli_real_escape_string($DBConn->connect(), $_POST["' + formData[x].columnName + '"]),\n';

            }
            insertData += ');\n';
            insertData += 'if ($insert->add_Data("' + filename + '", $tableData)) {\n';
            insertData += '\techo "<script>alert(\'' + insertSuccessful + '\');</script>";';
            insertData += '\n} else {\n';
            insertData += '\techo "<script>alert(\'' + insertUnSuccessful + '\');</script>";';
            insertData += '\n}\n\n}';
        }

        if (needView === "yes") {
            insertData += '\n$' + filename + 'Info = $select->selectData("' + filename + '","");\n\n'
        }

        if (needUpdate === "yes") {
            insertData += 'if(isset($updateId)){\n';
            insertData += '\t$' + filename + 'Data = $select->selectData("' + filename + '","' + extraPart + '");\n';
            insertData += '}\n';

            insertData += 'if (isset($_POST["' + filename + '_update"])) {';
            insertData += '$updateData = array(\n';
            for (let x = 0; x < formData.length; x++) {
                insertData += '\t\'' + formData[x].columnName + '\' => mysqli_real_escape_string($DBConn->connect(), $_POST["' + formData[x].columnName + '"]),\n';
            }

            insertData += '\n);\n';
            insertData += 'if ($update->updateQuery("' + filename + '","' + filename + '_ID",$updateId,$updateData)) {\n';
            insertData += '\techo "<script>alert(\'' + updateSuccessful + '\');</script>";';
            insertData += 'header(\'Location: ' + filename + '.php\');';
            insertData += '\n} else {\n';
            insertData += '\techo "<script>alert(\'' + updateUnSuccessful + '\');</script>";';
            insertData += '\n}\n\n}';
        }

        if(needDelete === "yes"){
            insertData += 'if(isset($deleteId)){\n';
            insertData += '\tif ($delete->deleteItem("' + filename + '", "WHERE '+filename+'_ID= " . $deleteId . "")) {';
            insertData += 'echo "<script>alert(\'Delete Successful\');</script>";\n';
            insertData += 'header(\'Location: ' + filename + '.php\');\n';
            insertData += '} else {\n';
            insertData += ' echo "<script>alert(\'Delete Unsuccessful\');</script>";';
            insertData += '}\n}\n';
        }

        return insertData;
    }


}
export default PhpController;