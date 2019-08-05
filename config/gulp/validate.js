var gulp = require('gulp');
var gutil = require('gulp-util');
var jsonSchema = require("gulp-json-schema");
var csv2json = require('convert-csv-to-json');
var options = {};

let fileInputName = './static/csv/sample.csv';
let fileOutputName = './data/sample.json';



function validate() {
  gutil.log(gutil.colors.cyan('validate'), 'Validating json data');
    return gulp.src('./data/elections/election_dates.json')
      .pipe(jsonSchema("./data/elections/dates_schema.json", {verbose:true, loadMissingSchemas:true}));
}

function csvToJson (done){
        csv2json.generateJsonFileFromCsv(fileInputName,fileOutputName);
        done();
}


exports.validate = validate;
gulp.task('validate',validate);

exports.csvToJson = csvToJson;
gulp.task('csvToJson',csvToJson);
