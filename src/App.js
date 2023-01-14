import "./App.css";
import Chip from "@mui/material/Chip";
import data from "./data.json";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { fetchSoal3, Get, Post } from "./service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import sha256 from "sha256";
import { Link, redirect } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [value, setValue] = useState(data);
  const [headers, setHeaders] = useState({ ["User-id"]: "", Scope: "" });
  const [apiRes, setApiRes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (index) => {
    const label = value[index]?.product_name;
    if (label?.includes("changed")) {
      value[index].product_name = label?.replace("changed", "");
      return setValue([...value]);
    }
    value[index].product_name = `${label} changed`;
    setValue([...value]);
  };

  const handleChangeHeaders = (event) => {
    return setHeaders({ ...headers, [event.target.name]: event.target.value });
  };

  const handleDelete = (index) => {
    apiRes.splice(index, 1);
    setApiRes([...apiRes]);
  };

  useEffect(() => {
    fetchSoal3().then((e) => {
      console.log("Res from jsonplaceholder: ", e?.data);
      const arr = e?.data.splice(0, 10);
      arr.map((ev) => (ev.action = null));
      setApiRes(arr);
      setLoading(false);
    });
  }, []);

  const renderTable = (dataTable, type) => {
    const datax = JSON.parse(JSON.stringify(dataTable));
    if (type === "secondary") {
      datax?.forEach((e) => delete e.userId);
    }
    return (
      <Paper elevation={3} sx={{ width: "90%", margin: "auto" }}>
        {datax?.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                {Object?.keys(datax[0])?.map((item, idx) => {
                  return <TableCell key={idx}>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {datax?.map((itm, idx) => (
                <TableRow key={itm.title}>
                  {Object?.values(itm)?.map((child, id) => {
                    if (child === null)
                      child = (
                        <Button onClick={() => handleDelete(idx)}>
                          Delete
                        </Button>
                      );
                    return <TableCell key={id}>{child}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    );
  };

  const handlePost = () => {
    Post(headers, { dataReq: "halo" }).then((e) => console.log(e.data));
  };
  const handleGet = () => {
    Get(headers).then((e) => console.log(e.data));
  };

  const hash = () => {
    const date = moment(new Date()).format("DDMMYYYY");
    const messagge = `${date}Akbarpriaifabula`;
    const hashed = sha256(messagge);
    console.log("hashed string", hashed);
    return { hashed, messagge };
  };

  return (
    <div className="App">
      {loading ? (
        <>loading...</>
      ) : (
        <>
          <h3>Soal 1 dan 2</h3>
          <Grid padding={3} container spacing={2}>
            {value.map((itm, idx) => {
              return (
                <Grid
                  sx={{ display: "flex", gap: "12px", flexDirection: "column" }}
                  key={idx}
                  item
                  sm={3}
                  xs={12}
                >
                  <Chip label={itm.product_name} />
                  <Chip label={`Rp ${itm.price}`} variant={"outlined"} />
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    onClick={() => handleChange(idx)}
                  >
                    Change Value
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <h3>Soal 3, 4, dan 5</h3>
          {renderTable(apiRes)}
          <h3>Soal 6</h3>
          {renderTable(apiRes, "secondary")}
          <h3>Soal 7</h3>
          <p>{hash().messagge}</p>
          <p>{hash().hashed}</p>
          <h3>soal 9</h3>
          <Link to={"/soal9"}>Ke halaman Jawaban</Link>
          <h3>soal 11</h3>
          <h5>setting header</h5>
          <Box
            width={"50%"}
            margin="auto"
            display="flex"
            flexDirection="column"
            gap="12px"
          >
            <TextField
              label="User-id"
              onChange={handleChangeHeaders}
              name="User-id"
            />
            <TextField
              label="Scope"
              onChange={handleChangeHeaders}
              name="Scope"
            />
          </Box>
          <Button onClick={handlePost}>POST</Button>
          <Button onClick={handleGet}>GET</Button>
        </>
      )}
    </div>
  );
}

export default App;
