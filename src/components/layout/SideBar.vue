<template>
    <nav class="side-bar">
        <a :href="menu.path" v-for="menu in menuList" class="menu-item has-badge"
            :class="{ 'is-active': menu.isActive }">
            <span class="badge"></span>
            <Icon :name="menu.icon" class="has-transition" />
        </a>
    </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuList = ref([
    {
        name: 'Profile',
        path: '#profile',
        isActive: true,
        icon: 'firm-details'
    },
    {
        name: 'Permissions',
        path: '#permissions',
        isActive: false,
        icon: 'permissions'
    }
])
</script>

<style lang="scss" scoped>
.side-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 40px 0;
    background-color: var(--navbar-background);
    width: 60px;
    flex-shrink: 0;
    box-shadow: 0.5px 0px 0px 0px #0000001A;

}

.menu-item {
    width: 35px;
    height: 35px;
    border-radius: 100px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 0.2s;


    &.is-active {
        background-color: var(--background-tertiary);
    }

    :deep(svg.svg-icon) path {
        transition: all ease-in-out 0.2s;
    }

    &:hover {
        transform: scale(1.2);
        background-color: var(--primary);

        :deep(svg.svg-icon) path {
            stroke: white;
        }
    }

    .badge {
        position: absolute;
        width: 35px;
        height: 35px;

        &::before {
            content: '';
            background: #F5A300;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            z-index: 10;
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
</style>