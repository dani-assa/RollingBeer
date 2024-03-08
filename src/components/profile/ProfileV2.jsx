import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import { alertCustom } from "../../utils/alertCustom/alertCustom";
import axios from "../../api/axios";

const ProfileV2 = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`user/getAll`);
      setUsers(data);
      console.log(data);
      console.log(users);
    } catch (error) {
      console.log(error);
      alertCustom(
        "Upps",
        "Ha ocurrido un error al traer los usuarios",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getById = async(_id) => {
    try {
      setIsLoading(true)
      const {data} = await axios.get(`user/getById/${users._id}`)
      setUser(data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllUsers();
    getById()
  }, [changeFlag]);

  return <div>ProfileV2</div>;
};

export default ProfileV2;
