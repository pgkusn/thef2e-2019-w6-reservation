<template>
    <Modal
        v-model="modal"
        :title="result.title"
        :footer-hide="true"
        :closable="false"
        :mask-closable="false"
    >
        <p v-if="result.msg!==''">{{result.msg}}</p>
        <img v-if="result.msg===''" src="@/assets/images/reserve-success-icon.svg" alt />
        <button class="btn primary" @click="close">回頁面</button>
    </Modal>
</template>

<script>
export default {
    computed: {
        modal() {
            return this.$store.state.reserveResult !== null;
        },
        result() {
            let title = '';
            let msg = '';
            if (this.$store.state.reserveResult === '') {
                title = '預約成功';
            }
            else {
                title = '預約失敗';
                msg = this.$store.state.reserveResult;
            }
            return { title, msg };
        }
    },
    methods: {
        close() {
            this.$store.commit('setReserveResult', null);
        }
    },
}
</script>

<style scoped>
p {
    margin-bottom: 1em;
    font-size: 14px;
}
img {
    display: block;
    margin: 0 auto 14px;
    width: 60px;
}
button {
    display: block;
    margin-left: auto;
}
</style>