import Wish from '../models/wish.model'

export default function () {
  return new Promise((resolve, reject) => {
    Wish.find({})
      .sort({createdAt: -1})
      .exec((err, wishes) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(wishes)
        }
      });
  });
}
