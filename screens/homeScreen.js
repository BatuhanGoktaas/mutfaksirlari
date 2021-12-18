import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";

import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={{ marginTop: 30 }}>
          <Text>Çıkış yap</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
