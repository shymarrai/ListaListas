import React, { useEffect, useState } from "react";
import { Switch, Modal, View, Alert, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import theme from '../../global/styles/theme'

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
    SwipeModal,
    Legend,
    LegendDestaque,
    LegendDark,
    WrapperFooter,
    ButtonSwitch,
    ContainerSwitcher,
    Close,
    Lister
} from './styles.js'

import HeaderList from '../../components/HeaderList'
import Item from '../../components/Item'
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';


const collectionKey = '@listlists:allLists';

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
        }catch(err){
            console.log(err)
        }

    }
    
    async function removeAll(){
        await AsyncStorage.removeItem(collectionKey)
        loadData()
    }
    
    async function handleAddNewList(){
        if(!text)
        return
        

        const newList = {
            key: String(uuid.v4()),
            name: text,
            list: []            
        }

        setData([...data, newList])
        try{
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
                adUnitID="ca-app-pub-3940256099942544/6300978111" //"ca-app-pub-1630449266026590/6119053772"
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
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleOpenOptions()}
                    style={{flex: 1}}
                >
                    <View 
                        style={{
                            width: '100%',
                            height: '50%',
                            backgroundColor: theme.colors.light,
                            top: '50%',
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            paddingTop: 20
                        }}
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
                                style={{marginBottom: 12}}
                            >
                                Editando lista: { newName }
                            </LegendDark>
                            <Input
                                placeholder='Nome da lista'
                                value={newName}
                                onChangeText={setNewname}
                            />

                            <View
                            style={{
                                paddingHorizontal: 20,
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




                            {/* CONTAINER DE BOTÕES */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '85%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                    top: 20,
                                    marginBottom: 20

                                    
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
                    </View>
                </TouchableOpacity>
            </Modal>


            {/* MODAL DAS LISTAS */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => {
                    handleOpen()
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleOpen()}
                    style={{flex: 1}}
                >
                    <View 
                        style={{
                            width: '100%',
                            height: '50%',
                            backgroundColor: theme.colors.light,
                            top: '50%',
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            paddingTop: 20
                        }}
                    >   
                        <Button
                            style={{
                                alignSelf: "flex-end",
                                top: -10
                            }}
                            onPress={() => handleOpen()}
                        >
                            <Close />
                        </Button>
                        <>
                            <Lister
                                data={data}
                                contentContainerStyle={{height: '100%'}}
                                style={{width: "80%", alignSelf: 'center', top: -26}}
                                ListHeaderComponent={
                                    <>
                                        <LegendDark
                                            style={{marginBottom: 12}}
                                        >
                                            Escolha onde adicionar
                                        </LegendDark>
                                        <HeaderList 
                                            controllers={false}
                                            dark={false}
                                            style={{backgroundColor: theme.colors.shape}}
                                            onPress={() => {
                                                handleOpen()
                                                setDestiny("uma nova lista")
                                                setListSelected(false)
                                            }}
                                        />
                                    </>
                                }
                                keyExtractor={(item) => item.key}
                                renderItem={({item}) => (
                                    <HeaderList 
                                        list={item} 
                                        controllers={false}
                                        dark={true}
                                        onPress={() => {
                                            handleOpen()
                                            setDestiny(item)
                                            setListSelected(true)
                                        }}
                                    />
                                )}
                            />
                        </>
                    </View>
                </TouchableOpacity>
            </Modal>
        </Background>
        </TouchableWithoutFeedback>
    )
}