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

export default function HeaderList({list, toggleViewItems, OpenOptions, showItems, controllers, dark, ...rest }){
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
                        <TouchableOpacity
                            onPress={toggleViewItems}
                        >
                            {
                                showItems ?
                                    <TogglerUp />
                                :
                                    <TogglerDown />
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