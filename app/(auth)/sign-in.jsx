import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButtom from '../../components/CustomButtom'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields.")
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }


    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full h-min-84vh justify-center  px-4 my-6">
            <Link href={() => router.push('/index')}>
              <Image className="w-[115px] h-[35px]"
                source={images.logo} resizeMode='contain' />
            </Link>

            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keybordType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"

            />

            <CustomButtom
              title="Sign-in"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg text-secondary font-psemibold"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }


export default SignIn