<template>
    <div>
        <button class="btn primary" @click="toggleModal(true)">預約時段</button>
        <Modal
            v-model="modal"
            :footer-hide="true"
            :closable="false"
            :mask-closable="false"
            class-name="vertical-center-modal"
            width="423"
            @on-visible-change="modalChangeHandler"
        >
            <p class="title">預約時段</p>
            <Form ref="form" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="name" label="姓名">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem prop="tel" label="電話">
                    <Input v-model="formValidate.tel"></Input>
                </FormItem>
                <FormItem label="預約起迄">
                    <Row>
                        <Col span="8">
                            <FormItem prop="startDate">
                                <DatePicker
                                    type="date"
                                    placeholder="Select date"
                                    v-model="formValidate.startDate"
                                ></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="8">
                            <FormItem prop="endDate">
                                <DatePicker
                                    type="date"
                                    placeholder="Select date"
                                    v-model="formValidate.endDate"
                                ></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <Row>
                    <dl class="session">
                        <dt>平日時段</dt>
                        <dd>{{total.normalDay}}夜</dd>
                        <dt>假日時段</dt>
                        <dd>{{total.holiday}}夜</dd>
                    </dl>
                    <p class="totalPrice">= NT.{{total.totalPrice}}</p>
                </Row>
                <FormItem>
                    <button class="btn" style="margin-right:8px" @click.prevent="toggleModal(false)">取消</button>
                    <button
                        class="btn primary reserve"
                        :class="{ active: loading }"
                        @click.prevent="submitHandler"
                    >確定預約</button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
        return {
            formValidate: {
                name: '',
                tel: '',
                startDate: '',
                endDate: ''
            },
            ruleValidate: {
                name: [{ required: true, message: '必填' }],
                tel: [{ required: true, message: '必填' }],
                startDate: [{ required: true, message: '必填' }],
                endDate: [{ required: true, message: '必填' }]
            },
            total: {},
        }
    },
    computed: {
        loading() {
            return this.$store.state.bookingLoading;
        },
        modal() {
            return this.$store.state.bookingModal;
        },
        reserveDate() {
            return this.$store.state.reserveDate;
        },
        room() {
            return this.$store.state.room;
        },
        price() {
            let { normalDayPrice, holidayPrice } = this.room;
            return { normalDayPrice, holidayPrice };
        }
    },
    watch: {
        'formValidate.startDate'() {
            this.total = this.getTotal();
        },
        'formValidate.endDate'() {
            this.total = this.getTotal();
        },
    },
    methods: {
        toggleModal(value) {
            this.$store.commit('toggleBookingModal', value);
        },
        modalChangeHandler(visible) {
            if (!visible) return;
            let defaultStartDate = moment().add(1, 'days');
            let defaultEndDate = moment().add(2, 'days');

            let startDate = this.reserveDate[0];
            let endDate = this.reserveDate[0] && (this.reserveDate[0] === this.reserveDate[this.reserveDate.length - 1] ? moment(this.reserveDate[0]).add(1, 'days').format('YYYY-MM-DD') : this.reserveDate[this.reserveDate.length - 1]);

            this.formValidate.startDate = new Date(startDate || defaultStartDate);
            this.formValidate.endDate = new Date(endDate || defaultEndDate);
        },
        submitHandler(name) {
            this.$refs.form.validate(valid => {
                if (!valid) return;
                
                let date = this.getAllDates();

                if (date.length <= 1) {
                    this.$store.commit('setReserveResult', '預約起迄日期有誤，請重新選擇。');
                    this.$store.commit('toggleBookingModal', false);
                    return;
                }

                this.$store.dispatch('booking', {
                    name: this.formValidate.name,
                    tel: this.formValidate.tel,
                    date
                });
            });
        },
        getAllDates() {
            let startDate = new Date(this.formValidate.startDate);
            let endDate = new Date(this.formValidate.endDate);

            let dateArray = [];
            let currentDate = moment(startDate);
            let stopDate = moment(endDate);
            while (currentDate <= stopDate) {
                dateArray.push(currentDate.format('YYYY-MM-DD'))
                currentDate = currentDate.add(1, 'days');
            }
            return dateArray;
        },
        getTotal() {
            let startDate = new Date(this.formValidate.startDate);
            let endDate = new Date(this.formValidate.endDate);

            let normalDay = 0;
            let holiday = 0;
            let totalPrice = 0;
            let currentDate = moment(startDate);
            let stopDate = moment(endDate);
            while (currentDate < stopDate) {
                let day = currentDate.day();
                if (day === 0 || day === 6) {
                    holiday++;
                    totalPrice += this.price.holidayPrice;
                }
                else {
                    normalDay++;
                    totalPrice += this.price.normalDayPrice;
                }
                currentDate = currentDate.add(1, 'days');
            }
            return { totalPrice, normalDay, holiday };
        }
    },
}
</script>

<style lang="scss" scoped>
.ivu-modal {
    min-width: 423px;
}
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
        top: 0;
    }
}
.ivu-modal-body {
    padding: 25px 42px;
    .title {
        padding-bottom: 0.5em;
        letter-spacing: 2.5px;
        font-size: 24px;
    }
    .session {
        display: flex;
        width: 120px;
        flex-wrap: wrap;
        dt,
        dd {
            width: 50%;
        }
    }
    .totalPrice {
        padding-top: 24px;
        padding-bottom: 24px;
        color: #ff5c5c;
        font-size: 26px;
    }
}
.btn.reserve.active {
    opacity: 0.5;
    pointer-events: none;
    &::after {
        content: "...";
    }
}
</style>