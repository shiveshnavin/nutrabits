import { Divider, View } from "native-base"

export const Br = function (props) {
    return (
        <View style={{ width: "100%", height: 10, backgroundColor: "transparent" }} {...props} />
    )
}