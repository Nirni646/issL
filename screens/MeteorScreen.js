import axios from 'axios';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MeteorScreen extends Component{
  constructor(){
    super();
    this.state = {
      meteors : {}
    }
  }
  componentDidMount(){
    this.getMeteors();
  }
  getMeteors=()=>{
    axios
    .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=git3FHqXdrX42ayBPZSOwkmiAc0bxRnKJKUAOuc9')
    .then(response=>{
      this.setState({
        meteors : response.data.near_earth_objects
      })

    })
    .catch(error=>{
      Alert.alert(error.message);
    })

  }
  
    render(){
      if (Object.keys(this.state.meteors).length===0){
         return(
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <Text>Loading...</Text>
           </View>
         )
      }else{
        let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
          return this.state.meteors[meteor_date]
        })
        let meteors=[].concat.apply([],meteor_arr)
        meteors.forEach(function(element){
          let diameter=(element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
          let threatScore=(diameter/element.close_approach_data[0].miss_distance.kilometers)*(10**10)
          element.threat_score=threatScore
        });
        return (
            <View style={styles.container}>
              <Text>MeteorScreen</Text>
            </View>
          );
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
