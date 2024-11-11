import {createDrawerNavigator} from "@react-navigation/drawer";
import MapHomeScreen from "../../screens/map/MapHomeScreen";
import FeedHomeScreen from "../../screens/feed/FeedHomeScreen";
import ProfileHomeScreen from "../../screens/profile/ProfileHomeScreen";

const Drawer = createDrawerNavigator();


function MainDrawerNavigator() {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="MapHome" component={MapHomeScreen}/>
            <Drawer.Screen name="Profile" component={ProfileHomeScreen}/>
            <Drawer.Screen name="FeedHome" component={FeedHomeScreen}/>

        </Drawer.Navigator>
    );
}

export default MainDrawerNavigator;
