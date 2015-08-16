import Wish from '../models/wish.model'

export default function (req) {
  return new Promise((resolve, reject) => {
    if (!req.session.user) {
      return reject("No User Logged In !");
    }

    Wish.create({name: req.body.name, user: req.session.user.name}, (err, wish) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(wish)
      }
    });
  });
}
