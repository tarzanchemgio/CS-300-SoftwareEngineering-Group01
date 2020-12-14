import { Button, StyleSheet, Text, View, Image, TextInput,
	 Dimensions, TouchableWithoutFeedback, Keyboard,
	 TouchableOpacity } from "react-native";
// import {Button} from "React-bootstrap/Button"
import { styles } from "../Shares/styles";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginViewModel } from "../ViewModels/LoginViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { User } from "../Models/User";
import { color } from "react-native-reanimated";
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap and its default variables
// import '~bootstrap/scss/bootstrap.scss';


export function LoginView({ navigation }: any) {
	const loginViewModel = new LoginViewModel()
	const [user, setUser] = useState(new User())
	const { height, width } = Dimensions.get("window")

	// const navigation = useNavigation();
	return (

		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			accessible={false}
		>
		
			<View style={[styles.container, {justifyContent: "flex-start"}]}>
				<View style={[ {height : '26%',  //logo view
					justifyContent : "flex-end",
					width : "100%",
					// borderColor: "green",
					// borderWidth: 3,
				}]}>
					<View style={[styles.logo, loginStyle.loginLogo]}>
						<Image source={require("../Resources/Images/AR.png")} />
						<Image source={require("../Resources/Images/money-tree.png")} />
					</View>
				</View>

				<View style={[ {  //username and password space
					justifyContent: "flex-start",
					marginTop: "7%",
					// borderColor: "green",
					// borderWidth: 3,
				}]}>
					<TextInput style = {[loginStyle.textBox, {width: width * 0.8}]}
						placeholder = "Username"
						onChangeText={(text) => {
							let user = new User()
							user.username = text
							setUser(user)
						}}
					/>
					<TextInput style = {[loginStyle.textBox, {width: width * 0.8}]}
						placeholder = "Password"
						onChangeText={(text) => {
							let user = new User()
							user.username = text
							setUser(user)
						}}
					/>

					<TouchableOpacity onPress = {() => {"navigate here"}}> 
						<View style = {{alignSelf:"flex-end"}}> 
							<Text style = {{color: 'white', textDecorationLine: "underline"}}>Forgot your password ?</Text>
						</View>
					</TouchableOpacity>
					
				</View>

				<TouchableOpacity onPress = {() => {navigation.navigate("InnerView")}}> 
					<View style = {{backgroundColor: 'orange', alignItems: 'center',  // Sign in button space
									justifyContent: 'center', borderRadius: 15,
									width: width * 0.8, padding: "1%", marginTop: "5%"}}
						>
						<Text style = {{color: 'white', fontSize: 25}}>SIGN IN</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress = {() => {"navigate here"}}> 
					<View style = {{alignSelf:"flex-start", width: width * 0.8, marginTop: 5}}> 
						<Text style = {{color: 'white', textDecorationLine: "underline"}}>Dont't have an account ?</Text>
					</View>
				</TouchableOpacity>

			</View>
		</TouchableWithoutFeedback>
	);
}

const loginStyle = StyleSheet.create({
	loginLogo: {

	},

	textBox:{
		alignSelf: "stretch",
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		margin: 5
	},

});



/* MONEY TREE */

/* MONEY TREE */
