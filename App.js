/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

function App() {
  let [page, setPage] = useState(1);
  let [items, setItems] = useState([]);
  const [data, setApiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  fetchData = async page => {
    console.log(page);
    const apiData = await fetch(`https://reqres.in/api/users?page=${page}`);
    apiData.json().then(value => {
      console.log(page, value.data);
      setItems(items.concat(value.data));
      console.log(items);
      setApiData(value);
    });
  };

  useEffect(() => {
    if (!isLoading) {
      fetchData(1);
      setIsLoading(false);
    }
  }, [isLoading]);

  handleLoadMore = () => {
    console.log('inside handle load more');
    console.log(page);
    console.log(data);
    if (page < data.total_pages) {
      setPage(page + 1);
      fetchData(page + 1);
    } else {
      console.log('all end');
    }
  };
  console.log(items);
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: 200,
              margin: 8,
              backgroundColor: 'white',
              borderRadius: 8,
            }}>
            <Text style={styles.item}>{item.id}</Text>
            <Text style={styles.item}>{item.first_name}</Text>
            <Text style={styles.item}>{item.last_name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        onEndReached={() => handleLoadMore()}
        // onRefresh={handleLoadMore()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  item: {
    padding: 35,
  },
});

export default App;
