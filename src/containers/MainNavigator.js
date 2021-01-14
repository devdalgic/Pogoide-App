import React, {PureComponent} from 'react';
import colors from './../res/colors';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UpcomingStackScreen from './main/UpcomingStackScreen'
import CurrentStackScreen from './main/CurrentStackScreen'
import SettingsScreen from './main/SettingsScreen'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {StyleSheet, Text, View} from "react-native";
import palette from "../res/palette";
import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import firebase from 'firebase/app';
import 'firebase/database';
import {StatusBar, TouchableOpacity} from "react-native-web";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerActions} from "@react-navigation/routers";
import { Appbar } from 'react-native-paper';
import {showMessage} from "react-native-flash-message";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const RootDrawer = createDrawerNavigator();
class DrawerStack extends PureComponent {
    render() {
        return (
            <NavigationContainer>
                <RootDrawer.Navigator initialRouteName="Home">
                    <RootDrawer.Screen name="Home" component={HomeScreen}/>
                    <RootDrawer.Screen name="Home2" component={HomeScreen}/>
                </RootDrawer.Navigator>
            </NavigationContainer>
        )}
}


const RootStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
class TabStack extends PureComponent {
    // state = {
    //     db: any,
    //     //currentsList: [],
    //     // upcomingsList: [],
    //     // loading: true
    // }
    constructor(props) {
        super();
        const firebaseConfig = {
            apiKey: "AIzaSyAI3afaLzK3s8JLkIw3rC9oR93O68zd7zg",
            authDomain: "blcd-notify.firebaseapp.com",
            databaseURL: "https://blcd-notify.firebaseio.com",
            projectId: "blcd-notify",
            storageBucket: "blcd-notify.appspot.com",
            messagingSenderId: "325992268887",
            appId: "1:325992268887:web:a49eb1e5795854c1a04f12"
        };
        // Initialize Firebase
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        this.db = firebase.database();
    }

    async componentDidMount() {
    // try{
    //     const firebaseConfig = {
    //         apiKey: "AIzaSyAI3afaLzK3s8JLkIw3rC9oR93O68zd7zg",
    //         authDomain: "blcd-notify.firebaseapp.com",
    //         databaseURL: "https://blcd-notify.firebaseio.com",
    //         projectId: "blcd-notify",
    //         storageBucket: "blcd-notify.appspot.com",
    //         messagingSenderId: "325992268887",
    //         appId: "1:325992268887:web:a49eb1e5795854c1a04f12"
    //     };
    //     // Initialize Firebase
    //     firebase.initializeApp(firebaseConfig);
    //     const db = firebase.database();
    //     this.setState({db: db});
    //     //const current = db.ref('/currentEvents').once('value');
    //     // const upcoming= db.ref('/').once('upcomingEvents');
    //     // console.log(current);
    //     //this.setState({currentsList: current, loading: false});
    // }   catch(err){
    //         console.log("Error fetching data---------", err);
    //     }
        let data = [];
        const current = this.db.ref('/alerts');
        await current.once('value').then((snapshot) => {
            data = snapshot.val();
        })
        const alertsData = Object.keys(data).map(key => ({
            key,
            ...data[key]
        }));
        showMessage({
            message: alertsData[0].title,
            description: alertsData[0].text,
            type: alertsData[0].type,
            position: alertsData[0].position,
            autoHide: alertsData[0].autoHide,
            icon: alertsData[0].icon,
            backgroundColor: alertsData[0].bgColor,
            style: {height: scale(80)},
            duration: 5000,
        });
    }
    render() {
        return (
            // <SortContext.Provider value={this.reverse}>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: 'gray',
                    indicatorStyle: {backgroundColor: "white"},
                    style:{
                        backgroundColor:"#003a70",
                        elevation: 0,
                    },
                    safeAreaInsets: {
                        bottom: 0,
                    },
                }}
            >
                <Tab.Screen name="Current" component={CurrentStackScreen} initialParams={{
                    db: this.db
                }} />
                <Tab.Screen name="Upcoming" component={UpcomingStackScreen} initialParams={{
                    db: this.db
                }} />
            </Tab.Navigator>
            // </SortContext.Provider>
        )
    }
}

// class HomeScreen extends PureComponent {
//     constructor() {
//         super();
//         // this.reverse = true;
//     }
//     render() {
//         return (
//             <RootStack.Navigator>
//                 <RootStack.Screen name="HeaderTitle" component={TabStack}
//                                   options={{
//                                       header: ({ scene, previous, navigation }) => {
//                                           const { options } = scene.descriptor;
//                                           const title =
//                                               options.headerTitle !== undefined
//                                                   ? options.headerTitle
//                                                   : options.title !== undefined
//                                                   ? options.title
//                                                   : scene.route.name;
//
//
//                                           return (
//                                               <Appbar.Header
//                                                   style={{backgroundColor:"#003a70"}}>
//                                                   <Appbar.Content title="Pogoide"/>
//                                                   <Appbar.Action icon="settings" onPress={() => navigation.push('Settings')}/>
//                                                   {/*<Appbar.Action icon="settings" onPress={() => navigation.navigate}/>*/}
//                                               </Appbar.Header>
//                                           );
//                                       },
//                                   }}/>
//                 <RootStack.Screen name="Settings" component={SettingsScreen}/>
//             </RootStack.Navigator>
//         );
//     }
// }

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Home">
                <RootStack.Screen name="HeaderTitle" component={TabStack}
                                  options={{
                                      header: ({ scene, previous, navigation }) => {
                                          const { options } = scene.descriptor;
                                          const title =
                                              options.headerTitle !== undefined
                                                  ? options.headerTitle
                                                  : options.title !== undefined
                                                  ? options.title
                                                  : scene.route.name;


                                          return (
                                              <Appbar.Header
                                                  style={{
                                                      backgroundColor:"#003a70",
                                                      elevation: 0,
                                                  }}>
                                                  <Appbar.Content title="Pogoide"/>
                                                  <Appbar.Action icon="settings" onPress={() => navigation.push('Settings')}/>
                                                  {/*<Appbar.Action icon="settings" onPress={() => navigation.navigate}/>*/}
                                              </Appbar.Header>
                                          );
                                      },
                                  }}/>
                <RootStack.Screen name="Settings" component={SettingsScreen}
                                  options={{
                                      headerStyle: {
                                          backgroundColor: '#003a70',
                                      },
                                      headerTintColor: "#FFFFFF",
                                  }}
                                      />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}


// export default function TabNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//           options={{
//               ...palette.header,
//               headerLeft: () => (
//                   <View style={styles.headerLeftContainer}>
//                       <Text style={styles.headerTitle}>Go Beyond?</Text>
//                   </View>
//               ),
//               headerRight: () => (
//                   <View style={styles.headerRightContainer}>
//                       <Text style={styles.headerRightText}>right</Text>
//                   </View>
//               ),
//           }}
//         screenOptions={({ route }) => ({
//             ...palette.header,
//             headerLeft: () => (
//                 <View style={styles.headerLeftContainer}>
//                     <Text style={styles.headerTitle}>Go Beyond?</Text>
//                 </View>
//             ),
//             headerRight: () => (
//                 <View style={styles.headerRightContainer}>
//                     <Text style={styles.headerRightText}>right</Text>
//                 </View>
//             ),
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//
//             if (route.name === 'Home') {
//               iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             }
//
//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="CurrentT" component={CurrentStackScreen} />
//         <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
    appHeaderContainer: {height: 32},
    headerLeftContainer: {...palette.header.headerLeftContainer},
    headerLogo: { marginLeft: 10, height: 30, width: 80, resizeMode: 'center' },
    headerRightText: { marginRight: 10, height: 30},
});


// const routeConfig = {
//   Current: CurrentNavigator,
//   Upcoming: UpcomingNavigator,
// };

// const navigatorConfig = {
//   initialRouteName: 'Current',
//   defaultNavigationOptions: ({ navigation }) => ({
//     tabBarOptions: {
//       showLabel: false,
//       showIcon: true,
//       style: { backgroundColor: colors.tabBackground },
//     },
//     tabBarIcon: ({ focused }) => {
//       const { routeName } = navigation.state;
//       let icon;
//       switch (routeName) {
//         case 'Current': icon = focused ? images.current_selected : images.current; break;
//         case 'Upcoming': icon = focused ? images.upcoming_selected : images.upcoming; break;
//         default: icon = focused ? images.current_selected : images.current; break;
//       }
//       return <Image style={{ ...palette.header.image }} source={icon} />
//     }
//   })
// }

// export default TabNavigator = createBottomTabNavigator(routeConfig, navigatorConfig);