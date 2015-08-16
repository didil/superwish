import Wish from '../models/wish.model'

export default function() {
  return new Promise((resolve, reject) => {
    Wish.find({},(err,wishes) => {
      if(err){
        reject(err)
      }
      else{
        resolve(wishes)
      }
    });
  });
}
