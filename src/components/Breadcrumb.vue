<template>
    <div class="breadcrumb-container">
        <Icon name="home" />
        <Icon name="chevron-right" />
        <div class="breadcrumbs">
            <a v-for="b in breadcrumbs" :href="b.path" class="breadcrumb-item">{{ b.title }}</a>
        </div>
    </div>
</template>

<script lang="ts" setup>

type Breadcrumb = {
    path: string
    title: string
}

const breadcrumbs: Breadcrumb[] = [
    {
        path: '/profile',
        title: 'Profile'
    },
    {
        path: '/profile/profile-details',
        title: 'Profile Details'
    }
]
</script>

<style lang="scss" scoped>
.breadcrumb-container {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-bottom: var(--margin);
}

.breadcrumbs {
    display: flex;
    display: inline-block;
    gap: 4px;

    .breadcrumb-item {
        text-decoration: none;
        display: inline-flex;
        color: #414E62;
        font-weight: 500;
        font-size: 14px;
        line-height: 17.5px;

        &:not(:last-child)::after {
            content: '';
            background-image: url('@/assets/icons/slash.svg');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            width: 18px;
            height: 18px;
            display: inline-block;
            font-weight: 600;
        }

        &:last-child {
            color: var(--text-primary);
        }
    }
}
</style>