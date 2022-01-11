import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app, db } from "../firebase-config";
import { collection, getDoc, setDoc, firestore, doc } from "firebase/firestore/lite";
import firebase from "firebase/app";

import { useNavigation } from "@react-navigation/native";

const uri = "https://live.staticflickr.com/65535/50813570567_f69b84c427_b.jpg";

export default function RegisterScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid;
        console.log("Kayıt oluşturuldu!");
        //
        const userData = { email: email, picUrl: "", username: username };

        const docRef = doc(db, "collection/users/");
        const docSnap = await getDoc(docRef);
        setDoc(docRef, userData, { merge: true });
        console.log(docSnap.data);

        setIsSignedIn(true);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const controlPassword = () => {
    if (password == confirmPassword) handleCreateAccount();
    else alert("Parolalar eşleşmiyor");
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
            <Image source={require("../assets/mutfaksirlari.png")} style={styles.profilePic} />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Kullanıcı Adı</Text>
              <TextInput onChangeText={(text) => setUsername(text)} style={styles.input} placeholder="kullaniciadi" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>E-posta</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="ornekmail@gmail.com"
              />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Şifre</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="********"
                secureTextEntry={true}
              />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Şifreni Onayla</Text>
              <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                placeholder="********"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={controlPassword} style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>Kayıt ol</Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 15, fontWeight: "300", color: "white" }}
              onPress={() => navigation.navigate("Login")}
            >
              Girişe dön
            </Text>
          </View>
        </BlurView>
      </ScrollView>
    </View>
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
    height: 650,
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
