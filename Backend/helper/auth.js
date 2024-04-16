// // const { signup } = require('../Controllers/user.controller')
// const UserSingup = require('../Models/Signup.Schema')


// const auths=require('passport-local').Strategy

// const auth=()=>{
//     passport.use(new auths(async(username,password,done)=>{
//         let data=await UserSingup.findOne({username:username})
//         if(!data){
//             return done(null,false)
//         }
//         if(data.password!=password){
//             return done(null,false)
//         }
//         return done(null,data)
//     }))

//     passport.serializeUser((data,done)=>{
//         return done(null,data.id)
//     })
//     passport.deserializeUser(async(id,done)=>{
//         let user=await model.findById(id)
//         return done(null,user)
//     })

// }

// module.exports=auth
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const passport=require('passport')
// passport.use(new GoogleStrategy({
//     clientID:"138381389603-47p6mg19jskgnlqch7bq7pvrhiv10ra4.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:8090/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));