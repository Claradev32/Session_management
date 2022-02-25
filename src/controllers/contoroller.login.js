const passport = require('passport');

module.export = (LocalStrategy) => {

    // configure passport.js to use the local strategy
    passport.use(new LocalStrategy(
        { username: 'email' },
        (email, password, done) => {
            mysqlConnection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
                if (error) throw error;
                var user = results[0];
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
            if (error) {
                done(error, false);
            }
            done(null, results[0]);
        });
    });
}