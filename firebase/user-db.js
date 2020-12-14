firebase = require('./firebase')
const db = firebase.db


const getAllUsers = () =>
    db.collection('users').get().then(snapshot=>
        snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))


const createUser = async (user) => {
   return db.collection("users").add({...user})
        .then(function(docRef) {
            let user = getUserById(docRef.id).then(e => e)
            return user
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}


const updateUser = (userId, user) =>
   db.collection('users').doc(userId).update({...user}).then(function() {
      console.log("Document successfully updated!",);
      return getUserById(userId).then(u=>u)
    }).catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });



const deleteUser = (userId) => {
    db.collection("users").doc(userId).delete().then(function() {
        return "success"
    }).catch(function(error) {
        return "failure"
    });
}

const getUserFriends= async (userId) => {

    // let arr = await db.collection("users").where("friends", "array-contains", userId).get()
    // arr = arr.docs.map(doc => ({...doc.data(), id: doc.id}))
    // return arr;
    console.log("GET USER FRIENDS CALLED")
    return db.collection("users").doc(userId).get()
        .then(snapshot => {
            let friends = snapshot.data().friends
            console.log(friends)
            let arr = db.collection("users").where("id", "in", friends).get()
                .then(fs => fs.docs.map(doc => ({...doc.data(), id: doc.id})))
            console.log(arr)
            // arr = arr.docs.map(doc => ({...doc.data(), id: doc.id}))
            return arr
            // for (let f = 0; f < friends.length; f++) {
            //     let curr_id = friends[f]
            //     db.collection("users").doc(curr_id).get()
            //         .then(curr_friend => {
            //             res.push(curr_friend.data())
            //         })
            // }
        })




}


const getUserById = (userId) => {
    return db.collection('users').doc(userId).get()
        .then(function(doc) {
            if (doc.exists) {
                return {...doc.data(), id:userId}
            }
})}




const authenticate = (email, password) =>
       db.collection("users").where("email", "==", email)
           .where("password","==", password).get()
           .then(snapshot=> ({...snapshot.docs[0].data(), id:snapshot.docs[0].id}))
           .catch(err => ({message:"no user found"}))



module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    authenticate,
    getUserFriends

}
