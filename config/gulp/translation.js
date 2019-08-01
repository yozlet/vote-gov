var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var pkg = require('../../package.json');
var spawn = require('cross-spawn');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var spanishStateNames = require('./lang/spanish/state-names.json');
var spanishElectionNames = require('./lang/spanish/election-names.json');
var primaryJson = require('../../data/elections/election_dates.json');
var jsonModify= require("gulp-json-modify");
//place holder for now, will change to all states
var test_states = [ "alabama","alaska","arkansas"];


function translateElections (done) {
  gutil.log(gutil.colors.cyan('translate-elections'), 'translating election events');
  var stream = gulp.src('./data/elections/election_dates.json');
  test_states.forEach(function (state){
      primaryJson[state].elections.forEach(function(elections) {
        elections.election_deadlines.forEach(function (deadlines){
          stream =  stream.pipe(replace(/"spanish_election":"(.*)"/, function (match, p1) {
            // console.log("match", match)
            var election = elections.election_type;
            var spanish_title = spanishElectionNames[election].spanish;
            // console.log(spanish_title);
            return ('"spanish_election":' + '"' + spanish_title + '"');
          })).pipe(gulp.dest('./data/elections/'));
          return stream;
        });
      });
  done();

  });
};

function translateDeadlines (done){
// gulp.task('' , function (done) {
  gutil.log(gutil.colors.cyan('translate-deadlines'), 'translating deadlines events');
  var stream = gulp.src('./data/elections/election_dates.json');
  test_states.forEach(function (state, index){
      primaryJson[state].elections.forEach(function(election) {
      election.election_deadlines.forEach(function (deadlines){
          stream =  stream.pipe(replace(/"spanish_deadline":"(.*)"/, function (match, p1) {
            var deadline = deadlines.date_type;
            var spanish_title = spanishElectionNames[deadline].spanish;
            return ('"spanish_deadline":' + '"' + spanish_title + '"');
          })).pipe(gulp.dest('./data/elections/'));
          return stream;
        })
      });
  done();
  });
};

// gulp.task('translate-events', gulp.series('translate-deadlines','translate-elections', function (done){
//   gutil.log(gutil.colors.cyan('translate-events'), 'translating election events');
//   done();
// }));


gulp.task('clean-translation', function () {
  gutil.log(gutil.colors.cyan('clean-translation'), 'Removing generated register/ files');
  return del([
    './layouts/registrar',
    './content/registrar'
  ]);
});

gulp.task('copy-content-spanish', function (done) {

  return gulp.src('./content/en/register/*.md')
    .pipe(replace(/title = "(.+)"/, function (match, p1) {
      var name = p1.replace(/\s/g, '-').replace(/\./g, '').toLowerCase();
      var title = spanishStateNames[name].title;
      return (
        'title = "' + title + '"'
      );
    }))
    .pipe(gulp.dest('./content/es/registrar'));

});

gulp.task('copy-layouts-spanish', function (done) {

  var copyLayout = spawn('cp', [
    '-rvf',
    './layouts/register',
    './layouts/registrar',
  ]);

  copyLayout.stdout.on('data', function (data) {
    gutil.log(gutil.colors.blue('copy-layouts-spanish'), '\n' + data);
  });

  copyLayout.on('error', done);
  copyLayout.on('close', done);


});

gulp.task('copy-links-spanish', function (done) {
  gutil.log(
    gutil.colors.cyan('copy-links-spanish'),
    'Copying links into state.md files.'
  );
  for (var state in spanishStateNames) {
     fileName = "./content/es/registrar/" + spanishStateNames[state].state_abbreviation + ".md"
     populate(fileName, state);
   };
   done();
});

function populate(fileName,state ){
  return gulp.src(fileName)
    .pipe(replace(/external_link = "(.*)"/, function (match,p1) {
     var link = spanishStateNames[state].external_link;
     if (link != "" ){
         return ( 'external_link = "' + link + '"' )
     } else {
         return ( 'external_link = "' + p1 + '"' )
     }
    }))
    .pipe(gulp.dest('./content/es/registrar'));
}

exports.translateDeadlines  = translateDeadlines ;
exports.translateElections = translateElections;
gulp.task('copy-translation', gulp.series( 'clean-translation', 'copy-content-spanish', 'copy-layouts-spanish', 'copy-links-spanish',translateDeadlines, function (done) {
  gutil.log(
    gutil.colors.cyan('copy-translation'),
    'Copying files from content/ & layouts/ for translated URLs'
  );
  done();
}));
var translateEvents = gulp.series(translateElections,'copy-translation' );
gulp.task('translate-all',translateEvents);
