<template>
    <div class="room">
        <div v-if="room && booking" class="container">
            <Row class="room-showcase">
                <Col span="17" class="room-showcase-col">
                    <Row
                        class="room-showcase-row"
                        :style="{ 'background-image': `url(${room.imageUrl[0]})` }"
                    >
                        <a :href="room.imageUrl[0]" data-fancybox="gallery"></a>
                    </Row>
                </Col>
                <Col span="7" class="room-showcase-col">
                    <Row
                        class="room-showcase-row"
                        :style="{ 'background-image': `url(${room.imageUrl[1]})` }"
                    >
                        <a :href="room.imageUrl[1]" data-fancybox="gallery"></a>
                    </Row>
                    <Row
                        class="room-showcase-row"
                        :style="{ 'background-image': `url(${room.imageUrl[2]})` }"
                    >
                        <a :href="room.imageUrl[2]" data-fancybox="gallery"></a>
                    </Row>
                </Col>
            </Row>
            <Row class="room-content">
                <Col span="16">
                    <Col span="16">
                        <h1 class="room-title">{{room.name}}</h1>

                        <ul class="room-info">
                            <li>房客人數限制：{{room.descriptionShort.GuestMin}}~{{room.descriptionShort.GuestMax}} 人</li>
                            <li>床型：{{displayBed(room.descriptionShort.Bed[0])}}</li>
                            <li>衛浴數量：{{room.descriptionShort['Private-Bath']}} 間</li>
                            <li>房間大小：{{room.descriptionShort.Footage}} 平方公尺</li>
                        </ul>

                        <p class="room-desc">{{room.description}}</p>

                        <ul class="room-checkInAndOut">
                            <li>
                                <p>Check In</p>
                                <p>{{room.checkInAndOut.checkInEarly}} - {{room.checkInAndOut.checkInLate}}</p>
                            </li>
                            <li>
                                <p>Check Out</p>
                                <p>{{room.checkInAndOut.checkOut}}</p>
                            </li>
                        </ul>

                        <ul class="room-amenities">
                            <li
                                v-for="(amenitie, key, idx) in room.amenities"
                                :key="idx"
                                :class="{ active: amenitie }"
                            >{{displayAmenitie(idx)}}</li>
                        </ul>
                    </Col>
                    <Col span="8">
                        <dl class="room-price">
                            <dt>NT.{{room.normalDayPrice}}</dt>
                            <dd>平日(一~四)</dd>
                            <dt>NT.{{room.holidayPrice}}</dt>
                            <dd>假日(五~日)</dd>
                        </dl>
                    </Col>
                </Col>
                <Col span="8">
                    <Calendar></Calendar>
                    <Booking></Booking>
                    <Result></Result>
                </Col>
            </Row>
        </div>
        <Spin v-else fix>
            <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
import axios from 'axios';
import '@fancyapps/fancybox';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import Calendar from '@/components/Calendar.vue';
import Booking from '@/components/Booking.vue';
import Result from '@/components/Result.vue';

export default {
    components: {
        Calendar,
        Booking,
        Result,
    },
    computed: {
        room() {
            return this.$store.state.room;
        },
        booking() {
            return this.$store.state.bookingData;
        },
    },
    methods: {
        displayBed(bed) {
            let text = '';
            switch (bed) {
                case 'Single':
                    text = '單人床';
                    break;
                case 'Small Double':
                    text = '小雙人床';
                    break;
                case 'Double':
                    text = '雙人床';
                    break;
                case 'Queen':
                    text = '加大單人床';
                    break;
                default:
                    break;
            }
            return text;
        },
        displayAmenitie(idx) {
            let amenities = ['Wi-Fi', '電話', '漂亮的視野', '早餐', '空調', '禁止吸煙', 'Mini Bar', '冰箱', '適合兒童', 'Room Service', '沙發', '寵物攜帶'];
            return amenities[idx];
        }
    },
    created() {
        this.$store.dispatch('getRoom', this.$route.params.id);
    },
}
</script>

<style lang="scss" scoped>
.room {
    &-showcase {
        height: 596px;
        &-col {
            height: 100%;
        }
        &-row {
            height: 100%;
            background-position: 50%;
            background-repeat: no-repeat;
            @at-root {
                .room-showcase-col:last-child .room-showcase-row {
                    height: 50%;
                }
            }
            a {
                display: block;
                height: 100%;
            }
        }
    }
    &-content {
        padding: 50px 60px;
    }
    &-title {
        margin-bottom: 1em;
        letter-spacing: 3.8px;
        font-weight: bold;
        font-size: 36px;
    }
    &-info {
        margin-bottom: 1em;
        letter-spacing: 1.5px;
        font-size: 14px;
        line-height: 31px;
    }
    &-desc {
        letter-spacing: 1.3px;
        font-size: 12px;
        line-height: 20px;
    }
    &-checkInAndOut {
        display: flex;
        margin: 2em 0;
        flex-wrap: wrap;
        li {
            width: 50%;
        }
        p {
            &:first-child {
                letter-spacing: 1.5px;
                font-size: 14px;
                line-height: 20px;
            }
            &:last-child {
                letter-spacing: 2.2px;
                font-size: 21px;
                line-height: 31px;
            }
        }
    }
    &-price {
        padding: 0 38px;
        text-align: right;
        dt {
            margin-bottom: 10px;
            color: #000;
            &:first-of-type {
                letter-spacing: 3.1px;
                font-size: 30px;
            }
            &:last-of-type {
                letter-spacing: 1.7px;
                font-size: 16px;
            }
        }
        dd {
            color: #6d7278;
            letter-spacing: 1.5px;
            font-size: 14px;
            & + dt {
                margin-top: 1em;
            }
        }
    }
    &-amenities {
        display: flex;
        background-color: #f0f0f0;
        flex-wrap: wrap;
        li {
            padding: 25px;
            width: 33.3%;
            font-size: 14px;
            opacity: .3;
            &.active {
                opacity: 1;
            }
        }
    }
}
</style>