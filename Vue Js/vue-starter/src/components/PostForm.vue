<template>
    <form v-if="!loading" class="form" @submit.prevent="onSubmit">
        <!--<div class="input-field">
            <label for="createdAt">Created at</label>
            <input type="text"
                name="createdAt"
                v-model="createdAt"
                class="validate"
            >
            <span class="helper-text" data-error="Created at must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="id">Id</label>
            <input type="text"
                name="id"
                v-model="id"
                class="validate"
            >
            <span class="helper-text" data-error="Id at must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="userId">User id</label>
            <input type="text"
                name="userId"
                v-model="userId"
                class="validate"
            >
            <span class="helper-text" data-error="User id at must not be empty"></span>
        </div>-->
        <div class="input-field">
            <label for="title">Title</label>
            <input type="text"
                name="title"
                v-model="title"
                :class="[errors.title ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Title must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="body">Body</label>
            <input type="text"
                name="body"
                v-model="body"
                :class="[errors.body ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Body must not be empty"></span>
        </div>
        <button type="submit" class="waves-effect waves-light btn">{{ id ? 'Update' : 'Add' }}</button>
    </form>
    <div class="progress" v-else-if="loading">
        <div class="interminate"></div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();

export default {
    name: "PostForm",
    props: {
        editingUser: Object
    },
    data(){
        return {
            loading: false,
            createdAt: '',
            userId: '',
            title: '',
            body: '',
            id: null,
            errors: {}
        };
    },
    methods: {
        onSubmit(){
            this.loading = true;
            if(!this.validForm()){
                this.loading = false;
                return;
            }
            const user = {
                createdAt: this.createdAt,
                id: this.id,
                userId: this.userId,
                title: this.title,
                body: this.body
            };
            console.log(user);

            postService
                .writeUser(user)
                .then(res => {
                    this.loading = false;
                    this.createdAt = '';
                    this.id = '';
                    this.userId = '';
                    this.title = '';
                    this.body = '';
                    this.$emit('userCreated', res.data);
                    console.log('working');
                    console.log(res.data);
                })
                .catch(err => console.error(err));
        },
        validForm(){
            this.errors = {};
            if(this.title.trim() === ""){
                this.errors.title = "Title";
            }
            if(this.body.trim() === ""){
                this.errors.body = "Body";
            }
            if(Object.keys(this.errors).length > 0){
                return false;
            }else return true;
        }
    },
    watch: {
        editingUser(user){
            this.createdAt = user.createdAt;
            this.id = user.id;
            this.userId = user.userId;
            this.title = user.title;
            this.body = user.body;
        }
    }
}
</script>

<style scoped>
.form{
    margin: 50px;
}
.progress{
    margin: 100px 0;
}
</style>