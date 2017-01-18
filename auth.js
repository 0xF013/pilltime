const oauth2orize = require('oauth2orize');

const server = oauth2orize.createServer();
server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
  const code = utils.uid(16);

  const ac = new AuthorizationCode(code, client.id, redirectURI, user.id, ares.scope);
  ac.save(function(err) {
    if (err) { return done(err); }
    return done(null, code);
  });
}));