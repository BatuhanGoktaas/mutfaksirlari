import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "expo-blur";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const uri = "https://live.staticflickr.com/65535/50813570567_f69b84c427_b.jpg";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Kayıt oluşturuldu!");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Giriş yapıldı!");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={(styles.image, StyleSheet.absoluteFill)} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={require("./assets/mutfaksirlari.png")} style={styles.profilePic} />
            {/* <Image source={{ uri: profilePic }} style={styles.profilePic} /> */}
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>E-posta</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="ornekmail@gmail.com"
              />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Parola</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="********"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Giriş</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: "transparent" }]}>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Kayıt ol</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 350,
    height: 500,
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderColor: "#fff",
    borderWidth: 1,
    marginVertical: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#813531",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
