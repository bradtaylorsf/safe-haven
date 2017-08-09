const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const statusMonitor = require('express-status-monitor');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');
const config = require('./config');

// Connect to Database
// TODO: If a connection to the DB is unsuccesful
// We need to assume the user is not logged in and
// adjust accordingly
// Send the error to Sentry
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.uri, {
  useMongoClient: true,
}).then(() => console.log('connection succesful'))
  .catch(err => console.error(err));


const Responder = require('./middleware/responder');

const responder = new Responder(config);

const webpackConfig = require('../webpack/webpack.config.babel');


const webRoutes = require('./routes');

const compiler = webpack(webpackConfig);

const app = express();
app.use(statusMonitor());
app.use(helmet());
app.use(morgan('dev'));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath, // => '/'
    stats: { colors: true },
    historyApiFallback: true,
  }));
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}


const hbshelpers = require('../client/views/hbshelpers');

const hbs = exphbs.create({
  defaultLayout: 'wrapper',
  layoutsDir: path.join(__dirname, '../client/views/layouts'),
  partialsDir: path.join(__dirname, '../client/views/partials'),
  extname: 'hbs',
  helpers: hbshelpers,
});

app.set('views', path.join(__dirname, '../client/views/pages'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', webRoutes);

app.use(responder.respond);
app.use(responder.notFound);
app.use(responder.error);


module.exports = app;
