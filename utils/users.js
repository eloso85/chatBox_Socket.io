const users = [];

//join user tochat

function userJoin(id, username,room){
    const user = {id, username, room}

    users.push(user);

    return user;
}

//get current user

function getCurrentUser(id){
    return users.find(user => user.id ===id)
}

//User leaves chat

function userLeave(id){
   const index = users.findIndex(user => user.id === id) //for each user were id id equql to id passed in

   if (index !== -1){//check to see index is not equal to negative 1 if it finds it it return if not it returns negative 1 
       return users.splice(index, 1)[0];//zero index to just return user
   }
}

//get room users
function getRoomUser(room){
    return users.filter(user => user.room ===room);
}

module.exports ={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUser
};