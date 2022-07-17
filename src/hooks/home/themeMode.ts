export function changeThemeMode() {
    let theme = ref("黑暗模式")
    function toggleDark() {
         if(document.documentElement.mode === 'dark') {
            document.documentElement.mode = 'light'
            document.documentElement.className = ''
            theme.value = "黑暗模式"
        } else {
            document.documentElement.mode = 'dark'
            document.documentElement.className = 'dark'
            theme.value = "白天模式"
        }
    }
    return {
        toggleDark,
        theme
    }
}
