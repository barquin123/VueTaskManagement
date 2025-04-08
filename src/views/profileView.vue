<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const route = useRoute();
const profileID = route.params.id;
const userStore = useUserStore();
const accountType = ref('');
const name = ref('');
const email = ref('');
const tasks = ref([]);
const CreatedAt = ref('');
const members = ref([]);
const allUsers = ref([]);

onMounted( async () => {
    const profileUser = await userStore.fetchSingleUser(profileID);
    name.value = profileUser.name;
    email.value = profileUser.email;
    tasks.value = profileUser.taskList;
    CreatedAt.value = formatDate(profileUser.createdAt);
    accountType.value = profileUser.accountType;
    console.log(tasks);
    allUsers.value = await userStore.fetchUsers();
    members.value = await userStore.fetchMembers();
    console.log('all', allUsers);
    console.log('members',members);
});

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString(); // YYYY-MM-DD format
};

</script>
<template>
    <div class="profileContainer">
        <div class="profileDets">
            <img class="profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsaTeFqurvUDvMYOcgZAd-JPf-dtLogrrog&s" alt="" width="200" height="200">
            <h2>{{ name }}</h2>
            <p>{{ accountType }}</p>
            <a :href="'mailto:'+email"><p>{{ email }}</p></a>
            <p>{{ CreatedAt }}</p>
        </div>
        <div class="profileOthers">
            <div class="team">
                <h2>Team</h2>
                <div class='teamContainer'>
                    <div class="teamMates"v-if="accountType == 'member' && members.length > 0" v-for = "(member, index) in members" :key="'member-'+index">
                        <a :href="'/profile/'+member._id">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsaTeFqurvUDvMYOcgZAd-JPf-dtLogrrog&s" alt="" width="50px" height="50px">
                            <p>{{ member.name }}</p>
                        </a>
                    </div>
                    <div class="teamMates" v-else-if="accountType == 'admin' && allUsers.length > 0" v-for = "(user, index) in allUsers" :key="'admin-'+index">
                        <a :href="'/profile/'+user._id">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsaTeFqurvUDvMYOcgZAd-JPf-dtLogrrog&s" alt="" width="50px" height="50px">
                            <p>{{ user.name }}</p>
                        </a> 
                    </div>
                </div>
            </div>
            <div class="tasks">
                <h2>Tasks</h2>
                <table v-if="tasks.length > 0">
                    <tr v-for="(task, index) in tasks" :key="index">
                        <td><a :href="'/description/'+task._id">{{ task.taskName }}</a></td>
                        <td>{{ task.status }}</td> 
                    </tr>
                </table>
                <p v-else>No tasks assigned</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.profile{
    max-width: 200px;
    max-height: 200px;
    border-radius: 15px;
}
.profileContainer {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}
.profileDets {
  max-width: 30%;
  width: 100%;
  text-align: center;
  padding: 20px;
  backdrop-filter: blur(10px);
  border:1px solid aliceblue;
}
.profileOthers {
  max-width: 70%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
.team {
  padding:20px;
  backdrop-filter: blur(10px);
  border:1px solid aliceblue;
}
.tasks {
  padding:20px;
  backdrop-filter: blur(10px);
  border:1px solid aliceblue;
}
table, th, td {
  border:1px solid #ccc;
  border-collapse: collapse;
}
table{
    width: 50%;
}
td{
    padding: 10px;
}
a{
    color: #fff;
    text-decoration: none;
}
a:hover{
    text-decoration: underline;
}
.teamMates img{
    border-radius: 50%;
}
.team h2{
    text-align: center;
    margin-bottom: 10px;
    font-weight: 700;
}
.teamContainer {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
}
.teamContainer .teamMates{
    width: 25%;
    padding: 10px 15px;
    margin: 5px 0;
}
</style>