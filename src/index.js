const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');

// import middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');
//connect to DB
db.connect();

const app = express();
const port = 3000;
//static file
app.use(express.static(path.join(__dirname, 'public')));

//use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// custom middleware
app.use(SortMiddleware);

app.use(methodOverride('_method'));
//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (fieldName, sort) => {
                const sortType =
                    fieldName === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-amount-down-alt',
                    desc: 'fas fa-sort-amount-down',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const type = types[sortType];
                const icon = icons[sortType];

                return `<a href="?_sort&column=${fieldName}&type=${type}">
                        <i class="${icon}"></i>
                </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
