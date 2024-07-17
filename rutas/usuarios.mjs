import express from "express";
import connection from "../mongo/coneccion.mjs";

const router = express.Router();

// Listar todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [resultados, fields] = await connection.query("SELECT * FROM USUARIOS");
    res.status(200).send(resultados);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Error al obtener los usuarios" });
  }
});

// Obtener un usuario por ID
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await connection.query("SELECT * FROM USUARIOS WHERE ID_USU = ?", [id]);
    if (result.length === 0) {
      res.status(404).send({ result: "Usuario no encontrado" });
    } else {
      res.status(200).send(result[0]);
    }
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el usuario" });
  }
});

// Crear un nuevo usuario
router.post("/create", async (req, res) => {
  const { Nombre, Apellido, Correo, Contrasena, Telefono, Direccion, TipoUsuario } = req.body;
 console.log(req.body);
  try {
    const [resultado] = await connection.query(
      "INSERT INTO USUARIOS (Nombre, Apellido, Correo, Contrasena, Telefono, Direccion, TipoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [Nombre, Apellido, Correo, Contrasena, Telefono, Direccion, TipoUsuario]
    );
    res.status(201).send({ id: resultado.insertId });
  } catch (error) {
    res.status(500).send({ error: "Error al crear el usuario" });
  }
});

// Actualizar un usuario por ID
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { Nombre, Apellido, Correo, Contrasena, Telefono, Direccion, TipoUsuario } = req.body;
  try {
    const [resultado] = await connection.query(
      "UPDATE USUARIOS SET Nombre = ?, Apellido = ?, Correo = ?, Contrasena = ?, Telefono = ?, Direccion = ?, TipoUsuario = ? WHERE ID_USU = ?",
      [Nombre, Apellido, Correo, Contrasena, Telefono, Direccion, TipoUsuario, id]
    );
    if (resultado.affectedRows === 0) {
      res.status(404).send({ result: "Usuario no encontrado" });
    } else {
      res.status(200).send({ message: "Usuario actualizado correctamente" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar el usuario" });
  }
});

// Eliminar un usuario por ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [resultado] = await connection.query("DELETE FROM USUARIOS WHERE ID_USU = ?", [id]);
    if (resultado.affectedRows === 0) {
      res.status(404).send({ result: "Usuario no encontrado" });
    } else {
      res.status(200).send({ message: "Usuario eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar el usuario" });
  }
});


// Obtener un usuario por email y password
router.post("/login/", async (req, res) => {

 
  const { email, password } = req.body;
  try {
    const [result] = await connection.query(
      "SELECT * FROM USUARIOS WHERE Correo = ? AND Contrasena = ?", 
      [email, password]
    );
    if (result.length === 0) {
      res.status(404).send({ result: "Usuario no encontrado" });
    } else {
      //console.log(result);
      res.status(200).send(result[0]);
    }
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el usuario" });
  }
});


export default router;
