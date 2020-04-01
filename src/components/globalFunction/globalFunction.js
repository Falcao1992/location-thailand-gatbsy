export function formatPathName(path){
    const regex = new RegExp("/", "g");
    if (path === "/") {
        return "home"
    } else {
        return path.replace(regex, "")
    }
}
