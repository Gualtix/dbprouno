import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { Form, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "date-fns";
import "@rmwc/typography/styles";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import serversAddr from "../serversAddr";
var AWS = require('aws-sdk');

const s3Bucket = 'proyecto-vacas';
const reg = 'us-east-2';

AWS.config.update({
  accessKeyId: 'AKIATDA2FT6HWFMCLFID',
  secretAccessKey: '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'
})

const myBucket = new AWS.S3({
  params: {Bucket: s3Bucket},
  region: reg
})

const Cancion = ({ history }) => {

  const [valuesSong, setValues] = useState({
    cancion: "",
    link: "",
  });

  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...valuesSong, [prop]: event.target.value });
  };

  const uploadFile = (file) => {
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: s3Bucket,
        ContentType: "mp3",
        Key: valuesSong.cancion+".mp3"
    };

    myBucket.putObject(params).on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
    }).send((err) => {
        if (err) console.log(err)
    })

    

  }

  useEffect(() => {
    
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    uploadFile(selectedFile);
    let valido = true;

    if (valuesSong.cancion === "") {
      toast.warn("El Campo Cancion es Obligatorio", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      valido = false;
    }
    if(valido){
      axios.post("http://" + serversAddr.backend.host + ":" + serversAddr.backend.port + "/middleware",
        {
          peticion: "/subircancion",
          server: 5,
          data: {
            cancion: valuesSong.cancion,
            link: "https://proyecto-vacas.s3.us-east-2.amazonaws.com/" + valuesSong.cancion + ".mp3"
          }
        }
      ).then((response) => {
        toast.error("Archivo Subido", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
    }
  }

  return (
    <div>
      <Box display="flex" justifyContent="left" m={1} p={1} bgcolor="#FFFFFF">
        <Card variant="outlined">
          <div align = "center">
            <p style={{ textAlign: "centered", width: "300px" }}>
               <strong>Subir Cancion</strong>
            </p>
          </div>
          <Form onSubmit={handleClick}></Form>
            <Box display="flex" justifyContent="center" p={1} flexGrow={1} bgcolor="#F7F7EF">
              <TextField label="Cancion" required id="outlined-required" variant="outlined" onChange={handleChange("cancion")}/>
            </Box>
            <Box display="flex" justifyContent="center" p={1} flexGrow={1} bgcolor="#F7F7EF">
              <input class="form-group" type="file" name="UploadAudio" accept="audio/mp3" onChange={handleFileInput} />
            </Box>
            <Box display="flex" justifyContent="center" p={1} flexGrow={1} bgcolor="#F7F7EF">
              {/* <button type="submit" onClick={() => uploadFile(selectedFile)}> Cargar </button> */}
              <input type="submit" value="SUBIR" class="form-group" onClick={handleClick}/>
            </Box>
        </Card>
      </Box>
    </div>
  );
};

export default withRouter(Cancion);