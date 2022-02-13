import React from "react";
import { TouchableOpacity } from "react-native";
import theme from "../../global/styles/theme.js";
import {
    Container,
    Title,
    Wrapper,
    TogglerUp,
    TogglerDown,
    Share,
    Button,
    More
} from './styles.js'

export default function HeaderList({list, toggleViewItems, OpenOptions, showItems, controllers, toggleViewListKey, dark, ...rest }){
    return(
        <Container
            style={dark &&  {backgroundColor: theme.colors.primary}}
            { ...rest }
        >
            <Title
                style={dark &&  {color: theme.colors.shape}}
            >
                { list ? list.name : "Adicionar uma lista nova" }
            </Title>
            {
                controllers &&
                    <Wrapper>
                        <TouchableOpacity>
                            {
                                showItems && toggleViewListKey.indexOf(list.key) !== -1 ?
                                    <TogglerDown onPress={() => toggleViewItems(list.key)} />
                                :
                                    <TogglerUp onPress={() => toggleViewItems(list.key)} />
                            }
                        </TouchableOpacity>
                        
                        <Button
                            onPress={() => OpenOptions(list)}
                        >
                            <More />
                        </Button>
                        {/* 

                            <Button>
                                <Share />
                            </Button>
                         */}
                    </Wrapper>
            }
        </Container>
    )
}