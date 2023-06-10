import bcrypt from "bcryptjs"

const users = [
    {
        name: 'Admin User',
        email: 'foodmart@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Suryakanta Das',
        email: 'suryakanta@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Shresthita Das',
        email: 'shresthita@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ritesh kumar Baral',
        email: 'ritesh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Subhasree Behera',
        email: 'subhasree@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Sangeeta Behera',
        email: 'sangeeta@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Adarsh Priyadarshi',
        email: 'adarsh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;