<template>
    <div>
        <div class="row">
            <div class="col s6">
                <!-- Form -->
                <PostForm @userCreated="addUser" :editingUser="editingUser"/>
            </div>
            <div class="col s3" style="margin: 50px;">
                <p>Limit number of users</p>
                <input type="text" v-model="userLimit">
                <button @click="setLimit" class="waves-effect waves-light btn">Set</button>
            </div>
        </div>
        <div class="row">
            <div class="col s6" v-for="(user, index) in users"
                v-bind:item="user"
                :index="index"
                :key="user.id"
            >
                <div class="card">
                    <div class="card-content">
                        <p class="card-title">{{ user.title }}</p>
                        <p class="timestamp">{{ user.createdAt }}</p>
                        <p>{{ user.body }}</p>
                        <p style="display: inline-block; margin-right: 10%;">Id : {{ user.id }}</p>
                        <p style="display: inline-block;">User id : {{ user.userId }}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" @click="editUser(user)">Edit</a>
                        <a href="#" class="delete-btn" @click="deleteUser(user.id)">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from '../PostService';
import PostForm from '../components/PostForm.vue'
const postService = new PostService();

export default {
    name: "Home",
    components: {
        PostForm
    },
    data(){
        return {
            users: [],
            userLimit: 5,
            editingUser: null
        }
    },
    methods: {
        addUser(user){
            if(this.users.find(p => p.id === user.id)){
                const index = this.users.findIndex(p => p.id === user.id);
                this.users.splice(index, 1, user);
            } else this.users.unshift(user);
        },
        editUser(user){
            this.editingUser = user;
        },
        deleteUser(id){
            postService.deleteUser(id)
                .then(()=> {
                    this.users = this.users.filter(p => p.id !== id);
                })
                .catch(err => console.error(err));
        },
        setLimit(){
            postService.getUsers(this.userLimit)
                .then(res => this.users = res.data)
                .catch(err => console.error(err));
        }
    },
    created(){
        postService.getAllPosts()
            .then(res => {
                this.users = res.data;
                console.log(this.users);
            })
            .catch(err => console.error(err));
    }
}
</script>

<style scoped>
.card .card-content .card-title {
    margin-bottom: 0;
}
.card .card-content p.timestamp {
    color: #999;
    margin-bottom: 10;
}
.delete-btn {
    color: red !important;
}
</style>