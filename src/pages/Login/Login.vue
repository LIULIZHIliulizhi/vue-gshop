<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = !loginWay">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}"@click="loginWay = !loginWay">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled=" !isRightPhone || computeTime>0 "
                      class="get_verification"
                      :class="{right_phone_number:isRightPhone && computeTime<=0}"
                      @click.prevent="sendCode">
                {{ computeTime>0 ? `已发送${computeTime}s` : '请获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ?'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd" >
                <div class="switch_button":class="isShowPwd? 'on': 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}" ></div>
                  <span class="switch_text">{{isShowPwd? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha"  @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {Toast, MessageBox } from 'mint-ui'
import {reqSendCode,reqPwdLogin,reqSmsLogin}from '../../api/index'
  export default{
    data(){
      return {
        loginWay:true,
        phone:'',
        computeTime:0,
        code:null,
        name:'',
        pwd:'',
        captcha:'',
        isShowPwd:true
      }
    },
    methods:{
      async sendCode(){
        this.computeTime = 30
        const timer = setInterval(()=>{
          this.computeTime--
          if(this.computeTime<=0){
            this.computeTime = 0
            clearInterval(timer)
          }
        },1000)
        const result = await reqSendCode(this.phone)
        if(result.code===0) {
          Toast('短信已发送')
        } else {
          // 停止计时
          this.computeTime = 0
          MessageBox.alert(result.msg, '提示');
        }
      },
      updateCaptcha(){
        this.$refs.captcha.src= 'http://localhost:5000/captcha?time='+Date.now()
      },
      async login(){
        const {phone,code,name,pwd,captcha,loginWay} = this
        let result
        if(loginWay){
          if(!this.isRightPhone){
           return MessageBox.alert('请输入正确的手机号','提示')
          }else if(! /^\d{6}$/.test(code)){
            return MessageBox.alert('请输入正确的验证码','提示')
          }
          result = await reqSmsLogin(phone,code)
          this.computeTime = 0
        }else {
          if(!name){
            return MessageBox.alert('请输入正确的用户名','提示')
          }else if(!pwd){
            return MessageBox.alert('请输入正确的密码','提示')
          }else if(!captcha){
            return MessageBox.alert('请输入正确的验证码','提示')
          }
          result = await reqPwdLogin({name,pwd,captcha})
          if(result.code!== 0){
            this.updateCaptcha()
          }
        }
//        登录成功
        if(result.code === 0){
         // 保存用户信息
          this.$store.dispatch('saveUser',result.data)
//          发送请求成功后跳转到个人中心
          this.$router.replace('/profile')
        }else{
          MessageBox.alert('登录失败','提示')
        }
      }
    },
    computed:{
      isRightPhone(){ //  判断手机号是否合法
//        return /^1\d{10}$/.test(this.phone)
        return /^1\d{10}$/.test(this.phone)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
