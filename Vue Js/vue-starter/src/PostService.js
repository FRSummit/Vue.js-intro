import axios from 'axios';

//const apiBasedUrl = 'http://localhost:3000/users';
//const apiBasedUrl = 'http://localhost:3000';
axios.defaults.baseURL = 'http://localhost:3000';
//axios.defaults.baseURL = 'http://localhost:3000/users';

export default class PostService{
    getAllPosts(){
        //return axios.get(`${apiBasedUrl}/users`);
        return axios.get('/users');
        //return axios.get('/');
    }

    getUsers(number){
        return axios.get(`/users/${number}`);
    }

    writeUser(user){
        if(user.id){
            console.log('this is if');
            //return axios.put(`/user/${user.id}`, user);
            return axios.put(`/users/${user.id}`, user);
        }else{
            console.log('this is else');
            //return axios.user('/user', user);
            return axios.post('/users', user);
        }
        //return axios.post('/users', user);
    }

    deleteUser(id){
        return axios.delete(`/users/${id}`);
    }
}