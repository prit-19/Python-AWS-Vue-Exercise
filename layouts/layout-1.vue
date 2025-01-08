<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg bg-body-secondary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Navbar</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </li>
              <li v-if="userGroup === 'Standard'" class="nav-item">
                <NuxtLink class="nav-link" to="/profile">Profile</NuxtLink>
              </li>
              <li v-if="userGroup === 'Admin'" class="nav-item">
                <NuxtLink class="nav-link" to="/users">Users</NuxtLink>
              </li>
            </ul>
            <div class="d-flex" role="search">
              <div class="form-check form-switch mt-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  v-model="isToggled"
                />
              </div>
              <button class="btn btn-outline-none" @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const userGroup = userStore?.user?.group;
const router = useRouter();

const isToggled = ref(false);

watch(isToggled, (newVal, oldVal) => {
  if (newVal) {
    document.documentElement.classList.remove("light-mode");
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
    document.documentElement.classList.add("light-mode");
  }
});

const logout = async () => {
  userStore.clearUser();
  await router.push("/login");
};
</script>

<style scoped>
.router-link-active {
  font-weight: 600;
}
</style>
