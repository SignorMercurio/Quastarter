<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn round flat @click="drawer = !drawer">
          <q-avatar>
            <img src="logo.png" />
          </q-avatar>
        </q-btn>

        <q-toolbar-title> 标 题 </q-toolbar-title>
        <q-space></q-space>
        <q-btn flat icon="account_circle">
          <q-menu fit transition-show="jump-down" transition-hide="jump-up">
            <q-list>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon color="primary" name="logout"></q-icon>
                </q-item-section>
                <q-item-section>退出账号</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" side="left" elevated>
      <q-scroll-area class="fit">
        <q-list padding>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              :active="route.path.startsWith(menuItem.route)"
              v-ripple
              @click="router.push(menuItem.route)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>{{ menuItem.label }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"> -->
      <router-view />
      <!-- </q-scroll-area> -->
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

function useAccount(router: any) {
  function logout() {
    sessionStorage.removeItem('token')
    setTimeout(() => {
      router.push('/')
    }, 500)
  }

  return { logout }
}

function useDrawer() {
  const drawer = ref(false)

  const menuList = ref([
    {
      icon: 'format_list_numbered',
      label: 'XX列表',
      route: '/admin',
    },
  ])

  return { menuList, drawer }
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    return {
      ...useAccount(router),
      ...useDrawer(),
      router,
      route,
    }
  },
})
</script>
