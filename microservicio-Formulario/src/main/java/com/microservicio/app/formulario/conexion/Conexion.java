package com.microservicio.app.formulario.conexion;

import java.sql.*;

public class Conexion {
	static String url = "jdbc:mysql://localhost:3306/db_microservicios_proyecto";
    static String user = "root";
    static String password = "";
    Connection conn;

    public Connection Conectar() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            System.out.println("Conexión exitosa");
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println("Error al conectar!!!");
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return conn;
    }
    
    public void CerrarConexion() {
        try {
            if (conn != null && !conn.isClosed()) {
                conn.close();
                System.out.println("Conexión cerrada");
            }
        } catch (SQLException ex) {
            System.out.println("Error al cerrar la conexión!!!");
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
    }
}
