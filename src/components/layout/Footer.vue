<template>
    <div class="footer">
        <div class="footer-content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    height: 68px;
    padding: 10px;
    box-shadow: 0px -1px 0px 0px #0000001F;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 60px;
    left: 0;
    z-index: 1;

    .footer-content {
        max-width: 1070px;
        flex: 1;
    }
}
</style>