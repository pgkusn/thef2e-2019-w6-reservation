<template>
    <div>
        <div class="home" :style="{ 'background-image': `url(${rooms[currentRoomNo].imageUrl})` }" v-if="rooms">
            <div class="container">
                <div class="nav">
                    <router-link
                        :to="`/room/${room.id}`"
                        v-for="(room,idx) in rooms"
                        :key="room.id"
                        @mouseenter.native="currentRoomNo=idx"
                    >{{room.name}}</router-link>
                </div>
                <div class="roomInfo">
                    <p class="roomInfo-no">0{{currentRoomNo+1}}</p>
                    <p class="roomInfo-name">{{currentRoomName}}</p>
                </div>
            </div>
        </div>
        <Spin v-else fix>
            <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            currentRoomNo: 0,
        }
    },
    computed: {
        rooms() {
            return this.$store.state.rooms;
        },
        currentRoomName() {
            return this.rooms[this.currentRoomNo] && this.rooms[this.currentRoomNo].name;
        }
    },
    created() {
        this.$store.dispatch('getRooms');
    },
}
</script>

<style lang="scss" scoped>
.home {
    background-position: 50% 0;
    background-size: cover;
    background-repeat: no-repeat;
}
.container {
    height: 100vh;
}
.nav {
    position: absolute;
    top: 48px;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 34px;
    width: 300px;
    background-color: #fff;
    a {
        position: relative;
        color: #000;
        font-size: 14px;
        line-height: 20px;
        &:hover::before {
            position: absolute;
            top: 50%;
            right: calc(100% + 11px);
            width: 23px;
            height: 1px;
            background-color: #000;
            content: '';
        }
        & + a {
            margin-top: 37px;
        }
    }
}
.roomInfo {
    position: absolute;
    bottom: 70px;
    left: 70px;
    color: #fff;
    &-no {
        font-weight: bold;
        font-size: 66px;
    }
    &-name {
        margin-top: .5em;
        font-size: 24px;
    }
}
</style>