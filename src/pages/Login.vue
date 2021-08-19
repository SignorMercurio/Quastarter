<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="login-card">
      <q-card-section>
        <div class="text-center">
          <q-icon name="img:logo.png" size="xl" />
        </div>
      </q-card-section>

      <q-tab-panel name="login">
        <q-form @submit="login" class="q-pa-md q-gutter-md">
          <q-input
            autofocus
            outlined
            v-model="loginData.name"
            label="用户名"
            lazy-rules
            :rules="[notEmpty, (val) => maxLength(val, 20)]"
            ><template v-slot:prepend>
              <q-icon name="person"></q-icon> </template
          ></q-input>

          <q-input
            outlined
            type="password"
            v-model="loginData.password"
            label="密码"
            lazy-rules
            :rules="[notEmpty, (val) => maxLength(val, 30)]"
          >
            <template v-slot:prepend>
              <q-icon name="vpn_key"></q-icon>
            </template>
          </q-input>

          <div>
            <q-btn
              push
              class="full-width"
              label="登 录"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-tab-panel>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NoAuthApi } from 'components/axios'
import { User } from 'src/models/user'
import { success, notEmpty, maxLength } from 'components/utils'

const api = NoAuthApi.getInstance()

function useLogin(router: any) {
  const loginData = ref<User>({
    name: '',
    password: '',
  })

  async function login() {
    const data = await api.login(loginData.value)
    if (data) {
      sessionStorage.setItem('token', data)
      success('登录成功')
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    }
  }

  return {
    loginData,
    login,
  }
}

export default defineComponent({
  setup() {
    const router = useRouter()
    return { ...useLogin(router), notEmpty, maxLength }
  },
})
</script>
