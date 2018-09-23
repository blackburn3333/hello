class PhpClass {

    static createTable(tableName, tableData) {
        let tableDataArray = [];

        let createTable = '$tableQuery = "CREATE TABLE IF NOT EXISTS ' + tableName + ' (";\n';
        createTable += '$tableQuery .= "' + tableName + '_ID int PRIMARY KEY AUTO_INCREMENT,";\n';

        for (let x = 0; x < tableData.length; x++) {
            tableDataArray.push('$tableQuery .= "' + tableData[x].columnName + ' ' + tableData[x].colType + '(' + tableData[x].length + ')');
        }

        createTable += tableDataArray.join(",\";\n") + '";';
        createTable += '\n$tableQuery .= ")";\n\n';

        createTable += 'if($conn->connect_errno){\n';
        createTable += '\tprintf("Connection error -> ",$conn->connect_errno);\n';
        createTable += '}else{\n';
        createTable += '\t$conn->query($tableQuery);\n';
        createTable += '\treturn $conn;\n';
        createTable += '}';
        return createTable;
    }

    static insertQuery() {
        let Insert = '<?php \n';
        Insert += 'class Insert extends DBConnection{\n';
        Insert += 'public function add_Data($tableName,$BtchData){\n';
        Insert += '$add_query = "INSERT INTO ".$tableName." (";\n';
        Insert += '$add_query .= implode(",", array_keys($BtchData)).\') VALUES (\';\n';
        Insert += '$add_query .="\'".implode("\',\'",array_values($BtchData)). "\')";\n';
        Insert += 'if(mysqli_query($this->connect(),$add_query)){\n';
        Insert += 'return true;\n';
        Insert += '}else{\n';
        Insert += 'echo mysqli_error($this->connect());\n';
        Insert += '}\n}\n}\n';
        return Insert;
    }

    static selectClass(tableName, searchItems = '*') {
        let Select = '<?php\n class Select extends DBConnection\n{\n';
        Select += 'public function selectData($tableName,$query_extra){\n';

        if (searchItems === '*') {
            Select += '$getQuery = \'SELECT * FROM \' . $tableName . \' \' . $query_extra . \'\';\n';
        } else {
            Select += '$getQuery = \'SELECT ' + tableName + '_ID, ' + searchItems.join() + ' FROM \' . $tableName . \' \' . $query_extra . \'\';\n';
        }

        Select += '$data = $this->connect()->query($getQuery);\n';
        Select += '$rows = $data->num_rows;\n';
        Select += 'if($rows > 0){\n';
        Select += 'while ($selectedData = $data->fetch_assoc()){\n';
        Select += '$secData[] = $selectedData;\n';
        Select += '\n\t\t\t\t}';
        Select += 'return $secData;}else{}';
        Select += '\n\t\t}\n\n';
        Select += '\n\t}';
        Select += '\n\n?>';
        return Select;
    }

    static updClass(){
        let UpdateClass = '<?php\n class Update extends DBConnection\n{\n';
        UpdateClass += '\tpublic function updateQuery($tableName, $columnName, $id, $data)';
        UpdateClass += '{\n\t\t$keys = array_keys($data);';
        UpdateClass += '\n\t\t$values = array_values($data);';
        UpdateClass += '\n\t\t$result = $this->mapData($keys,$values);';

        UpdateClass += '\n\t\t$update_query = "UPDATE " . $tableName . " SET ";';
        UpdateClass += '\n\t\t$update_query .= implode(",",$result);';
        UpdateClass += '\n\t\t$update_query .= " WHERE " . $columnName . " = " . $id . "";';

        UpdateClass += '\n\t\tif(mysqli_query($this->connect(),$update_query)){';
        UpdateClass += '\n\t\t\treturn true;';
        UpdateClass += '\n\t\t}else{';
        UpdateClass += '\n\t\t\techo mysqli_error($this->connect());';
        UpdateClass += '\n\t\t}';
        UpdateClass += '\n\t}';

        UpdateClass += '\n\tprivate function mapData($keys, $values)';
        UpdateClass += '\n\t{';
        UpdateClass += '\n\t\t$array = array();';
        UpdateClass += '\n\t\tfor ($x = 0; $x < count($keys); $x++) {';
        UpdateClass += '\n\t\t\tarray_push($array,  \'`\'.$keys[$x].\'`\' .\' = \'. \'"\'.$values[$x].\'"\');';
        UpdateClass += '\n\t\t}\t\t\n\t\treturn $array;';
        UpdateClass += '\n\t}\n}';

        return UpdateClass;
    }

    static deleteClass() {
        let deleteSet = '<?php\n class Delete extends DBConnection\n{\n';
        deleteSet += 'public function deleteItem($tableName, $queryExtra)\n';
        deleteSet += '{\n$deleteQuery = \'DELETE FROM \' . $tableName . \' \' . $queryExtra . \'\';\n';
        deleteSet += 'if(mysqli_query($this->connect(),$deleteQuery)){\n';
        deleteSet += 'return true;\n';
        deleteSet += '}else{\n';
        deleteSet += 'echo mysqli_error($this->connect());\n';
        deleteSet += '}\n}\n}\n';
        return deleteSet;
    }
}
export default PhpClass;