class HtmlFile {

    static generateView(fileName, formData, type, needTable = 'yes', needForm = 'yes', updateBar = 'no', DeleteBar = 'no', needHeadUpdate = 'no', needHeadDelete = 'no',fullHtmlBody = 'yes') {
        let head = this.generateTop(fileName, needHeadUpdate, needHeadDelete);
        let form = this.generateForm(fileName, formData, type);

        let table = this.generateTable(fileName, formData, updateBar, DeleteBar);

        let template = this.generateHtmlTemplate(fileName, form, table, needTable, needForm);

        if(fullHtmlBody === "yes"){
            return head + '\n' + template;
        }else {
            return head + '\n';
        }
    }

    static generateForm(Filename, formData, type) {
        let formInput = '<form method="post" action="">\n';


        if (type === "insert") {
            for (let x = 0; x < formData.length; x++) {
                formInput += '\t<input type="text" required ';
                formInput += ' placeholder="' + formData[x].columnName + '"';
                formInput += ' name="' + formData[x].columnName + '"';
                formInput += ' />\n';
            }
            formInput += '\t<input type="submit" name="' + Filename + '_insert" value="Insert">';
        } else if (type === "update") {
            formInput += '<?php\n';
            formInput += 'if ($' + Filename + 'Data) {\n';
            formInput += '\t\tforeach ($' + Filename + 'Data as $data) {\n';

            for (let x = 0; x < formData.length; x++) {
                formInput += 'echo \'<input required value="\' . $data[\'' + formData[x].columnName + '\'] . \'" name="'+formData[x].columnName+'" />\';\n';
            }
            formInput += '}} else {} ?>\n';
            formInput += '\t<input type="submit" name="' + Filename + '_update" value="Update">';
        }
        /*else if (type === "delete") {
         formInput += '\t<input type="submit" name="' + Filename + '_delete" value="Delete">';
         }*/

        formInput += '\n</form>';
        return formInput;
    }

    static generateTop(fileName, updateID , deleteID ) {
        let fileHead = '<?php\n';
        if (updateID === 'no' && deleteID === 'no') {

        }
        else if (updateID === 'yes' && deleteID === 'yes') {
            fileHead += '\t$updateId = $_GET[\'updateID\'];\n';
            fileHead += '\t$deleteId = $_GET[\'deleteID\'];\n';
        } else if (updateID === 'yes') {
            fileHead += '\t$updateId = $_GET[\'updateID\'];\n';
        } else if (deleteID === 'yes') {
            fileHead += '\t$deleteId = $_GET[\'deleteID\'];\n';
        }
        fileHead += '\t include \'' + fileName + '_controller.php\'\n';
        fileHead += '?>';
        return fileHead;

    }

    static generateHtmlTemplate(fileName, generatedForm, table, needTable, needForm) {
        let Template = '<!DOCTYPE html>\n';
        Template += '<html lang="en">\n<head>\n\t<title>' + fileName + '</title>\n';
        if (needForm === 'no') {

        } else {
            Template += '</head>\n<body>\n<div>\n' + generatedForm + '\n</div>';
        }
        if (needTable === 'no') {

        } else {
            Template += '</head>\n<body>\n<div>\n' + table + '\n</div>';
        }

        Template += '\n</body>\n</html>';
        return Template;
    }

    static generateTable(tableName, tableData, updateRow, deleteRow) {
        let tableID = tableName + '_ID';
        let Table = '<table style="width: 100%">\n';
        Table += '<tbody>\n';
        Table += '<tr>\n';
        Table += '<th>' + tableName + '_ID</th>';
        for (let x = 0; x < tableData.length; x++) {
            Table += '<th>' + tableData[x].columnName + '</th>';
        }
        if (updateRow === 'no' && deleteRow === 'no') {

        } else {
            Table += '<th colspan="2">Options</th>';
        }

        Table += '</tr>\n';
        Table += '<?php\n';

        Table += 'if($' + tableName + 'Info){';
        Table += 'foreach ($' + tableName + 'Info as $data) {';
        Table += 'echo "<tr>";\n';
        Table += 'echo "<td>".$data[\'' + tableID + '\']."</td>";\n';
        for (let x = 0; x < tableData.length; x++) {
            Table += 'echo "<td>".$data[\'' + tableData[x].columnName + '\']."</td>";\n';
        }

        if (updateRow === 'yes') {
            Table += 'echo "<td><a href=\'' + tableName + '_update.php?updateID=".$data[\'' + tableID + '\']."\'>Update</a></td>";\n';
        }

        if (deleteRow === 'yes') {
            Table += 'echo "<td><a href=\'' + tableName + '_delete.php?deleteID=".$data[\'' + tableID + '\']."\'>Delete</a></td>";\n';
        }

        // /*if(updateRow === 'yes' && deleteRow === 'yes') {
        //     Table += 'echo "<td><a href=\'' + tableName + '_update.php?updateID=".$data[\'' + tableID + '\']."\'>Update</a></td>";\n';
        //     Table += 'echo "<td><a href=\'' + tableName + '_delete.php?deleteID=".$data[\'' + tableID + '\']."\'>Delete</a></td>";\n';
        // }*/
        Table += 'echo "</tr>";';
        Table += '}}else{echo "<p>NO DATA</p>";}';
        Table += '?>';
        Table += '</tbody>\n';
        Table += '</table>\n';
        return Table;
    }

}

export default HtmlFile;