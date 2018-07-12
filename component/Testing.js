/**
 * Created by rozer on 7/13/2018.
 */
import React, { Component } from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { movieDetails } from '../utils/Api'
const sWidth = Dimensions.get('window').width;
const kWidth = sWidth - 275;

class Testing extends Component{
    state = {
        details:null
    };

    componentDidMount(){
        const id = this.props.navigation.state.params['id'];
        if(id){
            movieDetails(id).then((data) => {
                this.setState({details:data})
            })
        }
    }
    
    render() {
        const { details } = this.state;
        const mKey = ["Title", "Released", "Runtime", "Language", "Director", "Genre", "Writer", "Actors", "Plot","Year","Country", "imdbRating", "imdbVotes"];
        if(details !== null &&  details !== undefined){
            return (
                <HeaderImageScrollView
                    maxHeight={300}
                    minHeight={60}
                    headerImage={{uri:details['Poster']}}
                >
                    <View style={{ height: 800 }}>
                        <TriggeringView onHide={() => console.log('text hidden')} >
                            <View style={styles.allDetails}>
                                <View style={{padding:15}}>
                                    <Text style={{fontSize:20, fontWeight:'bold'}}>{details['Title']}</Text>
                                </View>
                                {
                                    mKey.map((dKey) => {
                                        if(dKey !== ''){
                                            return(
                                                <View style={styles.detailsView} key={dKey}>
                                                    <View style={styles.movieKey}>
                                                        <Text style={{fontWeight:'bold'}}>{dKey}</Text>
                                                    </View>
                                                    <View style={styles.movieValue}>
                                                        <Text>{details[dKey]}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    })
                                }
                            </View>
                        </TriggeringView>
                    </View>
                </HeaderImageScrollView>
            );   
        }else{
            return(
                <View></View>
            )
        }
    }
}

const styles = StyleSheet.create({
    dPoster:{
        width: sWidth,
        height:300
    },
    allDetails:{
        marginTop:10
    },
    detailsView:{
        flexDirection:'row',
        flexWrap:'wrap',
        padding:10,
    },
    movieKey:{
        width:kWidth,
        alignItems:'flex-end',
        paddingRight:6
    },
    movieValue:{
        width:sWidth-kWidth-20,
        paddingLeft:6
    }

})

export default Testing
