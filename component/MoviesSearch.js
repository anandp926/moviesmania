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
                    <Text style={{color:'blue'}}>Search by movie title</Text>
                </View>
                <View style={styles.searchView}>
                    <TextInput style={styles.searchInput}
                               underlineColorAndroid="#757575"
                               value={this.state.movieName}
                               onChangeText={(name) => this.setState({movieName:name, buttonEnable:false})}
                    />
                    <TouchableOpacity style={styles.searchButton} disabled={buttonEnable} onPress={this.searchMovie}>
                        <Text style={{fontWeight:'bold', fontSize:16}}>SEARCH</Text>
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
        width:sWidth-120,
        height:50
    },
    searchButton:{
        height:50,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#757575',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.8
    }
});

export default MoviesSearch
