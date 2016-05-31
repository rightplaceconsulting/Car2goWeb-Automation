var customLogger = function () {
    var log4js = require('log4js');

    /**
     * This method is used for logging different logs in console as well as in log file.
     *
     * @author sheraz
     * @param jsFileName
     * @returns log object
     */
    this.logger = function (jsFileName) {
        var fs = require('fs');
        var log_dir = "../car2goweb/e2e/logs/";
        if (fs.existsSync(log_dir)) {
        }
        else {
            fs.mkdirSync(log_dir);
        }
        log4js.configure({
            appenders: [
                {
                    "type": "console"
                },
                {
                    "type": "dateFile",
                    "filename": log_dir + "log_file.log",
                    "maxLogSize": 10240,
                    "backups": 3,
                    "pattern": "-yyyy-MM-dd-hh-mm",
                    "alwaysIncludePatterm": true
                }
            ],
            "replaceConsole": true
        });
        var loggers = log4js.getLogger(jsFileName);
        loggers.setLevel('ALL');
        return loggers;
    }
}

module.exports = new customLogger();