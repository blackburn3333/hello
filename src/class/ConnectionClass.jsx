import PhpClass from './PhpClass';

class DataBaseConnection {
    static generateConnection(serverName, serverUsername, serverPassword, serverDatabase, CreateTable = 'no',tableName = 'no',tableData = 'no') {
        let connectionClass = '<?php \n';

        connectionClass += '\tclass DBConnection{ \n \n';
        connectionClass += '\t\tprivate $serverName; \n';
        connectionClass += '\t\tprivate $serverUserName; \n';
        connectionClass += '\t\tprivate $serverPassword; \n';
        connectionClass += '\t\tprivate $serverDatabase; \n \n';

        connectionClass += '\t\tpublic function connect(){ \n';

        connectionClass += '\t\t\t$this->serverName = "' + serverName + '";\n';
        connectionClass += '\t\t\t$this->serverUserName = "' + serverUsername + '";\n';
        connectionClass += '\t\t\t$this->serverPassword = "' + serverPassword + '";\n';
        connectionClass += '\t\t\t$this->serverDatabase = "' + serverDatabase + '";\n';

        connectionClass += '\t\t\t$conn = new mysqli($this->serverName,$this->serverUserName,$this->serverPassword,$this->serverDatabase); \n';
        if (CreateTable === 'yes') {
            connectionClass += PhpClass.createTable(tableName,tableData);
        } else if (CreateTable === 'no') {
            connectionClass += '\t\t\treturn $conn; \n\n';
        }

        connectionClass += '\t\t}\n';
        connectionClass += '\t}\n';
        return connectionClass;
    }
}

export default DataBaseConnection;