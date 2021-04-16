<template>
    <div class="calendar">
        <div class="top">
            <i class="material-icons" @click="adjustMonth(-1)">keyboard_arrow_left</i>
            <h1>{{calendar.year}} / {{calendar.month + 1}}</h1>
            <i class="material-icons" @click="adjustMonth(1)">keyboard_arrow_right</i>
        </div>

        <div class="weekDay">
            <div>日</div>
            <div>一</div>
            <div>二</div>
            <div>三</div>
            <div>四</div>
            <div>五</div>
            <div>六</div>
        </div>
        <div v-for="w in 5" class="week" :key="w">
            <div
                v-for="d in 7"
                class="day"
                :class="[
                    checkDay(getCalendarMonth(w,d)),
                    checkBooking(getCalendarMonth(w,d)),
                    checkReserve(getCalendarMonth(w,d))
                ]"
                :key="d"
                @click="reserve(getCalendarMonth(w,d), $event)"
            >{{getCalendarMonth(w,d).date}}</div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            today: {
                year: 0,
                month: 0,
                date: 0,
                day: 0
            },
            calendar: {
                year: 0,
                month: 0,
                date: 0,
                day: 0
            },
        }
    },
    computed: {
        // 目前日曆顯示的第一天
        calendarFirstDay() {
            const day = new Date(this.calendar.year, this.calendar.month, 1).getDay(); // 取得星期幾
            const date = new Date(
                this.calendar.year,
                this.calendar.month,
                1 - day
            );
            return {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate(),
                day: date.getDay()
            };
        },
        // 目前月曆資料(含上下月)
        calendarMonth() {
            let data = [];
            let date;
            for (let i = 0; i < 35; i++) { // 產生5週x7天
                date = new Date(
                    this.calendarFirstDay.year,
                    this.calendarFirstDay.month,
                    this.calendarFirstDay.date + i
                );
                let d = {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    date: date.getDate(),
                    day: date.getDay()
                };
                data.push(d);
            }
            return data;
        },
        reserveDate() {
            return this.$store.state.reserveDate;
        },
        booking() {
            return this.$store.state.bookingData;
        },
    },
    methods: {
        getAllDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        },
        getToday() {
            const date = new Date();
            this.today.year = this.calendar.year = date.getFullYear();
            this.today.month = this.calendar.month = date.getMonth();
            this.today.date = this.calendar.date = date.getDate();
            this.today.day = this.calendar.day = date.getDay();
        },
        getCalendarMonth(w, d) {
            return this.calendarMonth[(w - 1) * 7 + (d - 1)];
        },
        adjustYear(fix) {
            this.calendar.year += fix;
        },
        adjustMonth(fix) {
            let month = this.calendar.month + fix;
            if (month > 11) {
                this.adjustYear(1);
                this.calendar.month = 0;
            } else if (month < 0) {
                this.adjustYear(-1);
                this.calendar.month = 11;
            } else {
                this.calendar.month = month;
            }
        },
        checkDay(cm) {
            return {
                today:
                    cm.year === this.today.year &&
                    cm.month === this.today.month &&
                    cm.date === this.today.date,
                otherMonth: cm.month !== this.calendar.month,
                otherDay: (cm.year < this.today.year) || (cm.year <= this.today.year && cm.month < this.today.month || (cm.year === this.today.year && cm.month === this.today.month && cm.date < this.today.date))
            };
        },
        // 檢查已預訂日期
        checkBooking(cm) {
            return {
                'is-booking': this.booking && this.booking.some(val => val.date === this.formateDate(cm))
            };
        },
        // 檢查已選擇日期
        checkReserve(cm) {
            return {
                active: this.reserveDate && this.reserveDate.some(val => val === this.formateDate(cm))
            };
        },
        // 選擇日期
        reserve(cm, event) {
            event.target.classList.toggle('active');
            let date = this.formateDate(cm);
            let dates = JSON.parse(JSON.stringify(this.reserveDate));
            let index = dates.indexOf(date);
            if (index === -1) {
                dates.push(date);
                dates.sort();
            }
            else {
                dates.splice(index, 1);
            }
            this.$store.commit('setReserveDate', dates);
        },
        formateDate(cm) {
            let y = cm.year;
            let m = cm.month < 10 ? `0${cm.month + 1}` : cm.month + 1;
            let d = cm.date < 10 ? `0${cm.date}` : cm.date;
            return `${y}-${m}-${d}`;
        }
    },
    mounted() {
        this.getToday();
    },
}
</script>

<style lang="scss" scoped>
.calendar {
    margin-bottom: 26px;
    padding-top: 18px;
    padding-bottom: 18px;
    background: #f7f7f7;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .15);
}
.top {
    display: flex;
    margin: 12px;
    justify-content: space-between;
    align-items: center;
    i {
        cursor: pointer;
    }
}
h1 {
    font-size: 18px;
}
.weekDay,
.week {
    display: flex;
    & > div {
        margin: 12px;
        color: #6d7278;
        text-align: center;
        flex-grow: 1;
    }
}
.weekDay {
    font-size: 18px;
}
.day {
    position: relative;
    width: 28px;
    height: 31px;
    font-size: 14px;
    line-height: 31px;
    cursor: pointer;
    &.today {
        background-color: #000;
        color: #fff;
        font-weight: bold;
        pointer-events: none;
    }
    &.otherMonth {
        opacity: 0;
        pointer-events: none;
    }
    &.otherDay,
    &.is-booking {
        color: #c9ccd0;
        pointer-events: none;
    }
    &.active {
        background-color: #ccc;
    }
}
</style>
