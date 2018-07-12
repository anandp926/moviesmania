/**
 * Created by rozer on 7/12/2018.
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image,ScrollView,ActivityIndicator} from 'react-native'
import { search } from '../utils/Api'
const sWidth = Dimensions.get('window').width;

class SearchResults extends Component {
    render() {
        const { filterResult, navigation, loading, flag,msg } = this.props
        if(flag === 1) {
            return(
                <View style={styles.loader}>
                    <Text style={{color:'red'}}>{msg}!</Text>
                </View>
            )
        }else if(loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size={50} color="#0000ff"/>
                </View>
            )
        }else{
            return (
                <ScrollView>
                    <View style={styles.moviesGrid}>
                        {filterResult !=undefined &&(
                            filterResult.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        key={data['imdbID']}
                                        style={styles.movieCard}
                                        onPress={() => navigation.navigate('MovieDetail', {id:data['imdbID']})}
                                    >
                                        <Image style={[styles.poster,{height:200 }]} source={{uri:data['Poster']}}/>
                                        <View style={styles.searchMovieDetail}>
                                            <Text style={{fontWeight:'bold'}}>{data['Title']}</Text>
                                            <Text>{data['Year']}</Text>
                                        </View>
                                    </TouchableOpacity>

                                )
                            })
                        )}
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    moviesGrid:{
        flexDirection:'row',
        flexWrap:'wrap',
        padding:10,
        marginBottom:80
    },
    movieCard:{
        width:(sWidth-60)/2,
        marginLeft:10,
        marginRight:10,
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'#fff',
        borderRadius: 8,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0,0.4)',
        shadowOffset: {
            width: 4,
            height: 8
        },
        marginBottom:10
    },
    poster:{
        width:(sWidth-60)/2,
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },
    searchMovieDetail:{
        backgroundColor:'#fff',
        padding:5,
    },
    loader:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:150
    }
});

export default SearchResults
