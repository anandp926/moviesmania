/**
 * Created by rozer on 7/12/2018.
 */
import React, { Component } from 'react'
import { StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    Keyboard
} from 'react-native'
import { search } from '../utils/Api'
import SearchResults from './SearchResults'
import {Ionicons } from '@expo/vector-icons'
const sWidth = Dimensions.get('window').width;

class MoviesSearch extends Component {

    state = {
        movieName:'',
        searchResult:null,
        loading:false,
        buttonEnable:true,
        error:''
    };

    searchMovie = () =>{
        this.setState({loading:true});
        const { movieName } = this.state;
        if(movieName && movieName!==" "){
            search(movieName).then((data) => {
                this.setState({searchResult:data,loading:false})
            })
        }else{
            this.setState({buttonEnable:true, loading:false})
        }
        Keyboard.dismiss()
    };

    render() {
        
        const { searchResult, loading, buttonEnable } = this.state
        let filterResult, msg, flag;
        if(searchResult){
            if(searchResult.Response === "False"){
                msg = searchResult.Error;
                flag = 1
            }else{
                filterResult=searchResult['Search']
            }
        }
        
        return (
            <View>
                <View style={{padding:10}}>
                    <Text style={{color:'#757575',fontWeight:'bold',}}>Search by movie title</Text>
                </View>
                <View style={styles.searchView}>
                    <TextInput style={styles.searchInput}
                               placeholder="Search here..."
                               underlineColorAndroid="transparent"
                               value={this.state.movieName}
                               onChangeText={(name) => this.setState({movieName:name, buttonEnable:false})}
                    />
                    <TouchableOpacity style={styles.searchButton} disabled={buttonEnable} onPress={this.searchMovie}>
                        <Ionicons
                            name="ios-search-outline"
                            size={23} color='#4BA5F9'
                        />
                    </TouchableOpacity>
                </View>
                <SearchResults
                    filterResult={filterResult}
                    navigation={this.props.navigation}
                    loading={loading}
                    flag={flag}
                    msg={msg}
                />
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    searchView:{
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        flexDirection:'row'
    },
    searchInput:{
        width:sWidth-90,
        height:50,
        backgroundColor:"#fff",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft:10,
        paddingRight:10
    },
    searchButton:{
        height:50,
        width:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#fff",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
});

export default MoviesSearch
