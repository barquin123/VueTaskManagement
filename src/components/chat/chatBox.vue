<script setup>
defineProps({
    youMsg: String,
    otherMsg: String,
    youName: String,
    otherName: String,
    youimg: String,
    otherimg: String,
})
</script>

<template>
  <div class="chatContainer">
    <div class="chatBox">
      <!-- You Message Container -->
      <div class="you" v-if="youMsg">
        <div class="youMsgContainer">
          <div class="youmMsg">
            {{ youMsg }}
          </div>
          <div class="youProfile">
            <img :src="youimg || 'https://www.w3schools.com/howto/img_avatar.png'" alt="Avatar" class="avatar" v-if="youMsg">
            <div class="youName">{{ youName }}</div>
          </div>
        </div>
      </div>

      <!-- Other Message Container -->
      <div class="other" v-if="otherMsg">
        <div class="otherMsgContainer">
          <div class="otherProfile">
            <img :src="otherimg || 'https://www.w3schools.com/howto/img_avatar.png'" alt="Avatar" class="avatar" v-if="otherMsg">
            <div class="otherName">{{ otherName }}</div>
          </div>
          <div class="otherMsg">
            {{ otherMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatBox {
  height: 80vh;
  display: flex;
  flex-direction: column-reverse;
}

.youMsgContainer, .otherMsgContainer {
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: end;
}

.youProfile {
  margin-left: 25px;
  text-align: center;
}

.otherProfile {
  margin-right: 25px;
  text-align: center;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.otherMsgContainer {
  justify-content: start;
}
</style>
