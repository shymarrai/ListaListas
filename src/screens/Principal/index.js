import React, { useEffect, useState, useRef } from "react";
import { Switch, Modal, View, Alert, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, Platform, Text } from "react-native";
import theme from '../../global/styles/theme'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { format, isBefore } from 'date-fns';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ptBR } from 'date-fns/locale';

import {
    Background,
    Title,
    Header,
    Content,
    Footer,
    Input,
    Button,
    ButtonRect,
    LegendLight,
    Icon,
    Plus,
    LegendDestaque,
    LegendDark,
    WrapperFooter,
    ContainerSwitcher,
    Close,
    Lister,
    styles
} from './styles.js'

import HeaderList from '../../components/HeaderList'
import Item from '../../components/Item'
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker  from '@react-native-community/datetimepicker'

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';


const collectionKey = '@listlists:allLists';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

export default function Principal({ toggleTheme }){

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => toggleTheme(previousState => !previousState);  
    
    
    const [ openOptions, setOpenOptions ] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ showItems, setShowItems ] = useState(false)

    const [ listSelected, setListSelected ] = useState(false)
    const [ destiny, setDestiny ] = useState("")
    const [ toggleViewListKey, setToggleViewListKey ] = useState('')

    const [ listEdit , setListEdit ] = useState()
    const [ qunatityItems, setQuantityItem ] = useState(0)
    const [ qunatityItemsCheck, setQuantityItemCheck ] = useState(0)
    const [ qunatityItemsNoCheck, setQuantityItemNoCheck ] = useState(0)
    const [ newName, setNewname ] = useState('')

    const [ text, setText ] = useState('')
    const [ data, setData ] = useState([])

    const [ bodyNotification, setBodyNotification ] = useState('')
    
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);

    const [notificationAdded, setNotificationAdded] = useState(false);

    const notificationListener = useRef();
    const responseListener = useRef();

    function handleChangeTime(event, dateTime){
        if(Platform.OS === 'android'){
          setShowDatePicker(oldState => !oldState)
        }
        if(dateTime && isBefore(dateTime, new Date())){
          setSelectedDateTime(new Date())
          return Alert.alert("Escolha uma hora no futuro! 🙄")
        }
      
        if(dateTime){
          setSelectedDateTime(dateTime)
        }
      
      }
      
      const showMode = (currentMode) => {
        setShowDatePicker(oldState => !oldState)
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

    
    useEffect(() => {
        loadData()
        // removeAll()

    },[])
    
    async function loadData(){
        const response = await AsyncStorage.getItem(collectionKey)
        const lists = response ? JSON.parse(response) : []
        setData(lists)
    }
    
    function toggleViewItems(key){

        if(key == toggleViewListKey){
            setToggleViewListKey('')
            setShowItems(false)
        }else{
            setToggleViewListKey(key)
            setShowItems(true)
        }

    }

    async function handleOpenOptions(list){
        if(openOptions){
            setOpenOptions(false)
            setListEdit({})
            setQuantityItem(0)
            setQuantityItemCheck(0)
            setQuantityItemNoCheck(0)
            setNotificationAdded(false)
            setBodyNotification('')
        }else{
            setOpenOptions(true)
            setListEdit(list)
            setNewname(list.name)

            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
            
            const viewInfoList = currentData.filter((item) => String(item.key) == String(list.key))

            viewInfoList[0].list.map(item => {
                setQuantityItem(state => state + 1)
                if(item.hasCheck == true){

                    setQuantityItemCheck(state => state + 1)
                }else{
                    setQuantityItemNoCheck(state => state + 1)
                }
            })

        }
    }

    function handleOpen(){
        setModalOpen(!modalOpen)
    }

    async function deleteList(list){
        try{
            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
            
            const currentList = currentData.filter((item) => String(item.key) !== String(list.key))

            setData([...currentList ])

            const dataFormated = [
              ...currentList
            ]
            
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
            
            setText('')
            setOpenOptions(false)
            setListEdit({})
            setQuantityItem(0)
            setQuantityItemCheck(0)
            setQuantityItemNoCheck(0)
            setNotificationAdded(false)
            setBodyNotification('')
        }catch(err){
            console.log(err)
        }

    }
    async function saveList(list){
        try{
            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
            
            const alterList = currentData.filter((item) => String(item.key) == String(list.key))
            const currentList = currentData.filter((item) => String(item.key) !== String(list.key))


            const listEdited = {
                ...alterList[0],
                name: newName,
            }
            
            setData([...currentList, {...listEdited}])

            const dataFormated = [
                alterList[0],
              ...currentList
            ]
            
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
            
            setText('')
            setOpenOptions(false)
            setListEdit({})
            setQuantityItem(0)
            setQuantityItemCheck(0)
            setQuantityItemNoCheck(0)
            setNotificationAdded(false)
            setBodyNotification('')
        }catch(err){
            console.log(err)
        }

    }
    
    async function removeAll(){
        await AsyncStorage.removeItem(collectionKey)
        loadData()
    }
  


    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
    



    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
          });
        }
      
        return token;
      }

    
    async function handleAddNotificationInList(dateNotification){
        
        const now = new Date()

        const formateDate = String(format(dateNotification, 'MM/dd/yyyy HH:mm (z)', { locale: ptBR}))
        const date = new Date(formateDate)
        
        const seconds = Math.abs( 
            Math.ceil((now.getTime() - date.getTime()) / 1000 )
          );
      

          try{
              await Notifications.scheduleNotificationAsync({
                  content: {
                    title: `💡 Alerta da sua lista: ${newName}`,
                    body: bodyNotification,
                    sound:  'default',
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    data: { data: 'goes here' },
      
                  },
                  trigger:{
                    seconds: seconds,
                  }
                })

                setNotificationAdded(true)
                setBodyNotification('')
          }catch(err){
              console.log(err)
          }

    }


    async function handleAddNewList(){
        if(!text)
        return

        try{      
              const newList = {
                key: String(uuid.v4()),
                name: text,
                list: [],
            }
    
            setData([...data, newList])

            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
      
            const dataFormated = [
                ...currentData,
                newList,
            ]
      
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
            
            setText('')
            // loadData()
      
          }catch(error){
            console.log(error)
            Alert.alert('Não foi possível salvar')
          }

          Keyboard.dismiss()
    }

    async function handleAddNewItemInList(destiny){
        if(!listSelected){
            handleAddNewList()
            return
        }

        if(text === ''){
            return 
        }

        try{
            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
            
            const alterList = currentData.filter((item) => String(item.key) == String(destiny.key))
            const currentList = currentData.filter((item) => String(item.key) !== String(destiny.key))

            const newItem = {
                key: alterList[0].key,
                name: alterList[0].name,
                list: [
                    ...alterList[0].list,
                    {
                        key: String(uuid.v4()),
                        name: text,
                        hasCheck: false            
                    }
                ]
            }

            setData([newItem, ...currentList])

            const dataFormated = [
                newItem,
                ...currentList
            ]
            
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
            
            setText('')
        }catch(err){
            console.log(err)
        }

        Keyboard.dismiss()
    }

    async function toggleCheck(key, list){
        try{
            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
            
            const alterList = currentData.filter((item) => String(item.key) == String(list.key))
            const currentList = currentData.filter((item) => String(item.key) !== String(list.key))

            const alterItem = alterList[0].list.filter((item) => String(item.key) == String(key))
            const currentItems = alterList[0].list.filter((item) => String(item.key) !== String(key))

            const newItem = {
                key: alterItem[0].key,
                name: alterItem[0].name,
                hasCheck: !alterItem[0].hasCheck            
            }

            alterList[0].list = [
                newItem,
                ...currentItems
            ]

            setData([...currentList, {...alterList[0]}])

            const dataFormated = [
                alterList[0],
              ...currentList
            ]
            
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
            
            setText('')
        }catch(err){
            console.log(err)
        }
    }

    async function removeItem(key, list){
        try{
            const allLists = await AsyncStorage.getItem(collectionKey)
            const currentData = allLists ? JSON.parse(allLists) : []
            
            const alterList = currentData.filter((item) => String(item.key) == String(list.key))
            const currentList = currentData.filter((item) => String(item.key) !== String(list.key))

            const currentItems = alterList[0].list.filter((item) => String(item.key) !== String(key))

            alterList[0].list = [
                ...currentItems
            ]

            setData([{...alterList[0]}, ...currentList])

            const dataFormated = [
                alterList[0],
              ...currentList
            ]
            
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
            
            setText('')
        }catch(err){
            console.log(err)
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Background>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-1630449266026590/6119053772" // teste ca-app-pub-3940256099942544/6300978111
                servePersonalizedAds // true or false
                setTestDeviceIDAsync
                onDidFailToReceiveAdWithError={(err) => console.log(err)}
            />
            <Header>
                <Title
                    onPress={() => {
                        setDestiny('')
                        setListSelected(false)
                    }}
                >
                    Lista Listas
                </Title>

                <Switch
                    trackColor={{ false: "#767577", true: theme.colors.shape }}
                    thumbColor={isEnabled ? theme.colors.light : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                        toggleTheme()
                        setIsEnabled(!isEnabled)
                    }}
                    value={isEnabled}
                />
            </Header>
            <Content>
                <Lister
                    style={{flex: 1}}
                    contentContainerStyle={showItems === false ? { flexGrow: 1} : {height: '100%'}}
                    data={data}
                    nestedScrollEnabled
                    scrollEnabled={showItems === false}
                    disableScrollViewPanResponder={false}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => (
                        <>
                            <HeaderList 
                                list={item} 
                                toggleViewItems={toggleViewItems} 
                                OpenOptions={handleOpenOptions}
                                controllers={true} 
                                dark={false} 
                                showItems={showItems}
                                toggleViewListKey={toggleViewListKey}
                                setDestiny={setDestiny}
                                setListSelected={setListSelected}
                                // onPress={() => handleOpen()}
                                onPress={() => {
                                    setDestiny(item)
                                    setListSelected(true)
                                }}

                            />
                                    
                            <ScrollView
                                disableScrollViewPanResponder={false}
                                contentContainerStyle={showItems && item.key === toggleViewListKey && { paddingBottom: 60}}
                            > 
                                {
                                    item.list.map(itemList => (
                                        
                                        showItems && item.key === toggleViewListKey &&
                                            <Item item={itemList} list={item} key={itemList.key} toggleCheck={toggleCheck} removeItem={removeItem} />

                                    ))
                                }
                            </ScrollView>
                        </>
                    )}
                />
                    {/* <HeaderList name={listLists.name} controllers={true} dark={false} />
                    <Item />
                <Item /> */}
            </Content>
            
            <Footer>
           

                    <ContainerSwitcher>
                        {/* <ButtonSwitch
                            onPress={() => handleOpen()}
                        >
                            <SwipeModal />
                        </ButtonSwitch> */}
                         {
                             listSelected &&
                             <>
                                <Ionicons 
                                    name="return-up-back" 
                                    size={26} 
                                    color={theme.colors.secondary} 
                                    style={{paddingHorizontal: 20}}
                                    onPress={() => {
                                        setDestiny('')
                                        setListSelected(false)
                                    }}
                                />
                                <LegendDestaque>
                                    Adicionando { listSelected && "à lista:" } { listSelected && destiny.name }
                                </LegendDestaque>
                             </>
                        }
                    </ContainerSwitcher> 
                
               

                {
                    listSelected || destiny ?
                    <>
                    {
                        !listSelected && destiny &&
                            <Ionicons 
                                name="return-up-back" 
                                size={26} 
                                color={theme.colors.secondary} 
                                style={{paddingHorizontal: 20}}
                                onPress={() => {
                                    setDestiny('')
                                    setListSelected(false)
                                }}
                            />
                    }
                        <WrapperFooter>
                            <Input
                                placeholder={!listSelected ? 'Escreva o nome da sua lista...': 'Escreva seu item aqui...'}
                                value={text}
                                onChangeText={setText}
                            />
                            <Button 
                                onPress={() =>  {
                                    destiny ? handleAddNewItemInList(destiny) : handleAddNewList()
                                }}
                            >
                                <Icon />
                            </Button>
                        </WrapperFooter>
                    </>

                    :

                        <Button 
                            style={{borderRadius: 100, alignSelf: 'center'}}
                            onPress={() => {
                                setDestiny("uma nova lista")
                                setListSelected(false)
                            }}
                        >
                            <Plus />
                        </Button>


                }

            </Footer>


            {/* MODAL DAS OPÇÕES */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={openOptions}
                onRequestClose={() => {
                    handleOpenOptions()
                }}
            >
                <>

                        <View 
                            style={{
                                width: '100%',
                                height: 400,
                                backgroundColor: theme.colors.light,
                                top: '50%',
                                borderTopLeftRadius: 50,
                                borderTopRightRadius: 50,
                                paddingTop: 20
                            }}
                        >   
                            <ScrollView
                                nestedScrollEnabled={true}
                                style={{flex: 1}}
                                contentContainerStyle={{flexGrow: 1}}
                            >
                            <Button
                                style={{
                                    alignSelf: "flex-end",
                                    top: -10
                                }}
                                onPress={() => handleOpenOptions()}
                            >
                                <Close />
                            </Button>
                            <View style={{
                                paddingHorizontal: 20,
                                top: -36, 
                            }}>

                                <LegendDark
                                    style={{marginBottom: 12, marginLeft: '28%'}}
                                >
                                    Editando lista: { newName }
                                </LegendDark>
                                <LegendDark
                                style={{
                                    paddingHorizontal: 10
                                }}
                                >
                                    Nome:
                                </LegendDark>
                                <Input
                                    placeholder='Nome da lista'
                                    value={newName}
                                    onChangeText={setNewname}
                                    style={{left: -12}}
                                />

                                <View
                                style={{
                                    paddingHorizontal: 10,
                                    marginTop: 12
                                }}
                                >
                                <View
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <LegendDark>
                                        Itens:
                                    </LegendDark>
                                    <LegendDark>
                                        { qunatityItems }
                                    </LegendDark>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <LegendDark>
                                        Itens com Check:
                                    </LegendDark>
                                    <LegendDark>
                                        { qunatityItemsCheck }
                                    </LegendDark>
                                </View>

                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <LegendDark>
                                            Itens sem Check:
                                        </LegendDark>
                                        <LegendDark>
                                            { qunatityItemsNoCheck }
                                        </LegendDark>
                                    </View>

                                    

                                </View>

                                <View
                                    style={{
                                        marginTop: 24
                                    }}
                                >
                                    <LegendDark style={{marginLeft: '15%'}}>
                                        Adicionar Notificação para a lista
                                    </LegendDark>

                                    <LegendDark style={{marginHorizontal: 10, marginTop: 20}}>
                                        Mensagem:
                                    </LegendDark>

                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Input
                                            placeholder='Corpo da notificação'
                                            value={bodyNotification}
                                            onChangeText={setBodyNotification}
                                            style={{left: -12}}
                                        />

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.DateTimePickerButton, { marginLeft: 4}]}
                                            onPress={showDatepicker}
                                        >
                                            <Feather name="calendar" size={24} color="black"/>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.DateTimePickerButton, { marginLeft: 4}]}
                                            onPress={showTimepicker}
                                        >
                                            <Feather name="clock" size={24} color="black"/>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                    {
                                        showDatePicker && (

                                        <DateTimePicker
                                            value={selectedDateTime}
                                            mode={mode}
                                            display="default"
                                            onChange={handleChangeTime}
                                            is24Hour={true}
                                        />
                                    
                                        )
                                    }

                                    {
                                        Platform.OS === 'android' && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <TouchableOpacity 
                                                    style={styles.DateTimePickerButton}
                                                    onPress={() => handleAddNotificationInList(selectedDateTime)}
                                                    activeOpacity={0.8}
                                                >
                                                    <Ionicons name="notifications-outline" size={24} color="black"/>
                                                    <LegendDark>
                                                        Adicionar
                                                    </LegendDark>
                                                </TouchableOpacity>

                                                <Text style={styles.dateTimePickerText} >
                                                {`${ format(selectedDateTime, 'dd.MM HH:mm ', { locale: ptBR }) }`}
                                                </Text>

                                            </View>
                                        )



                                    }

                                    {
                                        notificationAdded &&

                                        <LegendDark style={{marginLeft: 14}}>
                                            Notificação Adicionada!!
                                        </LegendDark>
                                    }
                             
                                {/* CONTAINER DE BOTÕES */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: '85%',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        alignSelf: 'center',
                                        top: 80,
                                        marginBottom: 80

                                        
                                    }}
                                >
                                    <ButtonRect
                                        style={{
                                            backgroundColor: theme.colors.attention
                                        }}
                                        onPress={() => deleteList(listEdit)}
                                    >
                                        <LegendLight>
                                            Excluir
                                        </LegendLight>
                                    </ButtonRect>

                                    <ButtonRect
                                        style={{
                                            backgroundColor: theme.colors.success
                                        }}
                                        onPress={() => saveList(listEdit)}
                                    >
                                        <LegendLight>
                                            Salvar
                                        </LegendLight>
                                    </ButtonRect>
                                </View>
                            
                            </View>
                    </ScrollView>
                        </View>
                </>
            </Modal>
        
        </Background>
        </TouchableWithoutFeedback>
    )
}