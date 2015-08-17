import Wish from '../models/wish.model'

export default function (req) {
  return new Promise((resolve, reject) => {
    if (!req.session.user) {
      return reject("No User Logged In !");
    }

    Wish.findOne({_id: req.body._id}, (err, wish) => {
      if (!wish) {
        return reject("Wish not found");
      }

      if (req.session.user.name !== wish.user) {
        return reject("Can't delete other users' wishes !");
      }

      wish.remove((err) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(wish);
        }
      });
    });
  });
}
