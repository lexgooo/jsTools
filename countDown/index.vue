<template>
    <span @click="handleClick" class="count-down" :style="{'color': value ? '#ccc' : color}">
        {{value ? countingShowTxt : showTxt}}
    </span>
</template>
<script>
/**
 * @description 获取验证码倒计时（组件）
 * @author 顾超<beyondc@foxmail.com>
 */
export default {
    name: 'count_down',
    props: {
        color: {
            type: String,
            default: '#33B87E'
        },
        startNum: {
            type: Number,
            default: 60
        },
        initTxt: {
            type: String,
            default: '获取验证码'
        },
        countingTxt: {
            type: [String, Boolean]
        },
        endTxt: {
            type: String,
            default: '重新获取'
        },
        value: {
            type: Boolean
        }
    },
    computed: {
        countingShowTxt() {
            const time = this.timeCount > 9 ? this.timeCount : `0${this.timeCount}`
            if(this.countingTxt) {
                if (typeof this.countingTxt === 'string') {
                    const hasTemp = this.countingTxt.indexOf('$time') > -1
                    return hasTemp ? this.countingTxt.replace('$time', time) : `${this.countingTxt}(${time})`
                } else {
                    return `${this.endTxt}(${time})`
                }
            } else {
                return time
            }
        }

    },
    data() {
        return {
            timer: null,
            timeCount: this.startNum,
            showTxt: this.initTxt
        }
    },
    watch: {
        value (val) {
            val && this.startCount()
        }
    },
    methods: {
        startCount() {
            /**
             * @description 
             *  - 倒计时逻辑
             *  @return void
             */
            const _this = this
            this.timer = setInterval(() => {
                if (_this.timeCount > 0) {
                    _this.timeCount = _this.timeCount - 1
                } else {
                    clearInterval(_this.timer)
                    _this.$emit('input', false)
                    _this.timeCount = _this.startNum
                    _this.showTxt = _this.endTxt
                }
            }, 1000)
        },
        handleClick() {
            /**
             * @description 组件的点击事件
             * @return void
             */
            if (!this.value) {
                this.$emit('click-event')
            }
        }
    }
}
</script>