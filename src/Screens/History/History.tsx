import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { deleteHistory, getHistory, saveHistory } from "@/Api";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import LoadingAPI from "@/Components/Loading";
import { useFocusEffect } from "@react-navigation/native";

export const History = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([] as any[]);
  const [selectedId, setSelectedId] = useState();
  const [refetch, setRefecth] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getHistory(setData, setLoading);
    }, [])
  );

  const handleSave = async (id: number) => {
    setLoading(true);
    await saveHistory(id);
    await getHistory(setData, setLoading);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteHistory(selectedId);
    setModalVisible(!modalVisible);
    await getHistory(setData, setLoading);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you want to delete this location?
            </Text>
            <View style={styles.contentHeaderV2}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOk]}
                onPress={handleDelete}
              >
                <Text style={styles.textOk}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {loading ? (
        <LoadingAPI />
      ) : (
        <FlatList
          style={styles.root}
          data={data}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(item) => {
            const Item = item.item;
            return (
              <View style={styles.container}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2961/2961948.png",
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.name}>Đại Học Bách Khoa</Text>
                    <Text style={styles.time}>
                      {moment(new Date(Item.timeScan)).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                  <View style={styles.contentHeader}>
                    <Text style={styles.description}>{Item.name}</Text>
                    <TouchableOpacity onPress={() => handleSave(Item.id)}>
                      {Item.isSaving ? (
                        <AntDesign name="heart" size={25} color="red" />
                      ) : (
                        <AntDesign name="hearto" size={25} color="black" />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedId(Item.id);
                      }}
                    >
                      <Image
                        style={styles.imagev2}
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/3405/3405244.png",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  contentHeaderV2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    gap: 10,
  },
  imagev2: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 0,
    marginLeft: 0,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    width: "83%",
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "black",
  },
  buttonOk: {
    backgroundColor: "red",
  },
  textOk: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textCancel: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
