<template>
    <nav class="top-nav">
        <span class="inline-block nav-toggle" @click="$emit('toggleSidebar')">
            <Icon name="navigation-menu" class="has-transition" />
        </span>
        <span class="logo flex-1">
            <Icon name="logo-placeholder" />
            <h2 class="company-name">Company Logo</h2>
        </span>
        <span class="nav-right flex-1">
            <Icon name="search" class="has-transition" />
            <div class="user-info">
                <img class="avatar" src="@/assets/avatar.jpeg" alt="Avatar" />
                <div class="user-details">
                    <span class="user-name">Forename Surname</span>
                    <span class="user-position">Position</span>
                </div>
            </div>
        </span>
    </nav>
</template>

<style lang="scss" scoped>
.top-nav {
    display: flex;
    align-items: center;
    height: 55px;
    background-color: var(--navbar-background);
    box-shadow: 0px 1px 0px 0px #00000014;
    padding: 0 20px 0 0;
    z-index: 1;

    .nav-toggle {
        display: flex;
        width: 40px;
        padding: 5px;
        margin: 5px;
        height: 40px;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        transition: all ease-in-out 0.2s;
        cursor: pointer;

        svg {
            height: 20px;
            width: 20px;
        }

        &:hover {
            background-color: var(--background-tertiary);


            svg {
                transform: scale(1.15);
            }
        }


    }

    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;

        .company-name {
            margin: 0;
            font-family: Figtree;
            font-size: 20px;
            font-weight: 800;
            line-height: 26px;
            letter-spacing: -0.02em;
        }

        img {
            height: 22px;
            width: 22px;
        }
    }

    .nav-right {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .user-info {
        display: flex;
        flex-direction: row;
        gap: 8px;

        .user-details {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-size: 14px;
            font-weight: 600;
            line-height: 17.5px;
        }

        .user-position {
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
        }
    }
}

.avatar {
    border-radius: 300px;
    height: 32px;
    width: 32px;
}

.svg-icon {
    transition: all ease-in-out 0.2s;

    &:hover.has-transition {
        transform: scale(1.15);
    }
}
</style>