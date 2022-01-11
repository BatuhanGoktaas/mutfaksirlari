import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";

import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then((userCredential) => {
        setIsSignedIn(false);
        alert("Çıkış Yapıldı");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const GetData = async () => {
    const usersCol = collection(db, "users/");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    console.log(userList);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => GetData()}>
        <View style={{ marginTop: 30 }}>
          <Text>Verileri getir</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSignOut()}>
        <View style={{ marginTop: 30 }}>
          <Text>Çıkış yap</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
